import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";
import { analyzeText } from "@/lib/openai";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

async function fetchReadme(owner: string, repo: string, octokit: Octokit): Promise<string | null> {
  try {
    const { data } = await octokit.request(`GET /repos/${owner}/${repo}/contents/README.md`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      },
    });

    return data?.content ? Buffer.from(data.content, "base64").toString("utf-8") : null;
  } catch (error) {
    console.error("Error fetching README:", error);
    return null;
  }
}

async function analyzeReadme(owner: string, repo: string, octokit: Octokit) {
  const readmeContent = await fetchReadme(owner, repo, octokit);
  
  if (!readmeContent) {
    return { message: "README.md not found in the repository." };
  }

  const prompt = `
    Analyze the following README file and evaluate if it follows best practices for technical projects. Focus on:
    
    1️⃣ **Technology Stack**: Is the tech stack mentioned clearly? Is it modern and relevant?
    2️⃣ **Installation & Usage**: Are there clear instructions to install, run, and test the project?
    3️⃣ **Deployment & Accessibility**: Does it mention if the project is deployed or how to test it easily?
    4️⃣ **Technical Decisions**: Does it explain key technical choices?
    5️⃣ **Testing**: Does it include details about tests (manual or automated)?
    6️⃣ **Requirements Compliance**: Does it define objectives and expected functionalities?
    7️⃣ **Git Best Practices**: While not in the README, are there hints about structured commits or best practices?

    README Content:
    ${readmeContent}
  `;

  return await analyzeText(prompt);
}

async function fetchRepoFiles(owner: string, repo: string, octokit: Octokit) {
  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/git/trees/HEAD?recursive=1",
    { owner, repo }
  );

  return response.data.tree.map((entry: { path: string }) => entry.path);
}

async function analyzeProjectStructure(owner: string, repo: string, octokit: Octokit) {
  const allFilePaths = await fetchRepoFiles(owner, repo, octokit);

  if (allFilePaths.length === 0) {
    return { message: "Unable to fetch project structure or repository is empty." };
  }
  console.log("🚀 ~ analyzeProjectStructure ~ allFilePaths:", allFilePaths)

  const prompt = `
    Evaluate the following project structure and determine if it follows best practices for a technical take-home challenge.
    Consider the following aspects:

    1️⃣ **Folder & File Organization**: Are files and folders well-structured according to common project conventions? Are there redundant or missing files?
    2️⃣ **Git Best Practices**: Are there necessary files like \`.gitignore\`, proper separation of boilerplate, and structured commits?
    3️⃣ **Code Quality & Readability**: Are there clear separations between different parts of the project (e.g., components, utilities, tests)?
    4️⃣ **Testing & Reliability**: Does the project contain test files (e.g., \`__tests__\`, \`.spec.js\`, or \`.test.js\`)? Are tests properly organized?
    5️⃣ **Configuration & Dependencies**: Does it include essential configuration files like \`package.json\`, \`tsconfig.json\`, \`.eslintrc.js\`, or \`.prettierrc\`?

    **Project Structure:**
    ${allFilePaths.join("\n")}
  `;

  return await analyzeText(prompt);
}


// Fetch git commit history
async function fetchGitHistory(owner: string, repo: string, octokit: Octokit) {
  const { data } = await octokit.request(`GET /repos/${owner}/${repo}/commits`, {
    per_page: 10,  // Fetch the latest 10 commits (adjust as needed)
  });
  
  return data.map((commit: any) => ({
    message: commit.commit.message,
    author: commit.commit.author.name,
    date: commit.commit.author.date,
  }));
}

// Analyze git commit history
async function analyzeGitHistory(owner: string, repo: string, octokit: Octokit) {
  const gitHistory = await fetchGitHistory(owner, repo, octokit);
  
  if (gitHistory.length === 0) {
    return { message: "No commits found in the repository." };
  }

  const prompt = `
    Analyze the following Git commit history for best practices. Consider the following aspects:

    1️⃣ **Commit Messages**: Are the commit messages clear, concise, and meaningful? Do they follow a consistent format?
    2️⃣ **Test & Feature Driven Development**: Do commit messages indicate work on specific features or tests?

    **Git Commit History:**
    ${gitHistory.map(commit => `- ${commit.date}: ${commit.message} by ${commit.author}`).join("\n")}
  `;

  return await analyzeText(prompt);
}

// API Handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const { repo, owner } = req.body;

  if (!session) return res.status(401).json({ error: "Not Authenticated" });

  if (!repo || !owner) {
    return res.status(400).json({ error: "Repository and owner are required." });
  }

  const octokit = new Octokit({ auth: session.accessToken });

  try {
    const [readmeAnalysis, structureAnalysis, gitHistoryAnalysis] = await Promise.all([
      analyzeReadme(owner.login, repo, octokit),
      analyzeProjectStructure(owner.login, repo, octokit),
      analyzeGitHistory(owner.login, repo, octokit),
    ]);

    const analysisResults = {
      readme: readmeAnalysis,
      structure: structureAnalysis,
      gitHistory: gitHistoryAnalysis,
    };

    res.status(200).json(analysisResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch repository contents or analyze the project." });
  }
}