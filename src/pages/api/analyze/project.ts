import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";
import { analyzeText } from "@/lib/openai";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

interface GitCommit {
  message: string;
  author: {
    name: string;
    date: string;
  };
}

interface FileEntry {
  path: string;
}

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
  2️⃣ **Installation & Usage**: Are there clear instructions to install, run, and test the project? Are the dependencies listed with their versions?
  3️⃣ **Deployment & Accessibility**: Does it mention if the project is deployed or how to test it easily? Are there clear steps for deployment if applicable?
  4️⃣ **Technical Decisions**: Does it explain key technical choices made (such as why certain libraries or frameworks were used)?
  5️⃣ **Testing**: Does it include details about tests (manual or automated)? Is there any coverage or tool mentioned for testing?
  6️⃣ **Requirements Compliance**: Does it define objectives and expected functionalities clearly? Are the requirements met and is there a clear plan to verify the solution?

  README Content:
  ${readmeContent}
`;

  return await analyzeText(prompt);
}

async function fetchRepoFiles(owner: string, repo: string, octokit: Octokit): Promise<string[]> {
  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/git/trees/HEAD?recursive=1",
    { owner, repo }
  );

  return response.data.tree.map((entry: FileEntry) => entry.path);
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

    1️⃣ **Folder & File Organization**: Are files and folders well-structured according to common project conventions? Are there redundant or missing files? For example, is there a clear separation between source code, assets, and configuration files?
    2️⃣ **Code Quality & Readability**: Are there clear separations between different parts of the project (e.g., components, utilities, tests)? Is there a consistent naming convention and folder structure for various modules?

    **Project Structure:**
    ${allFilePaths.join("\n")}
  `;

  return await analyzeText(prompt);
}

async function fetchGitHistory(owner: string, repo: string, octokit: Octokit): Promise<{
  message: string;
  author: string;
  date: string;
}[]> {
  const { data } = await octokit.request(`GET /repos/${owner}/${repo}/commits`, {
    per_page: 30,
  });

  return data.map((item: { commit: GitCommit }) => ({
    message: item.commit.message,
    author: item.commit.author.name,
    date: item.commit.author.date,
  }));
}

async function analyzeGitHistory(owner: string, repo: string, octokit: Octokit) {
  const gitHistory = await fetchGitHistory(owner, repo, octokit);

  if (gitHistory.length === 0) {
    return { message: "No commits found in the repository." };
  }

  const prompt = `
    Analyze the following Git commit history for best practices. Consider the following aspects:

    1️⃣ **Commit Messages**: Are the commit messages clear, concise, and meaningful? Do they follow a consistent format?
    2️⃣ **Test & Feature Driven Development**: Do commit messages indicate work on specific features or tests?
    3️⃣ **Atomic Commits**: Are the commits atomic, meaning that each commit addresses a single task or feature, making them easier to understand and review?
    4️⃣ **Code Refactoring & Formatting**: Do the commit messages reflect any code refactoring or formatting changes that improve readability, organization, or maintainability?

    **Git Commit History:**
    ${gitHistory.map(commit => `- ${commit.date}: ${commit.message} by ${commit.author}`).join("\n")}
  `;

  return await analyzeText(prompt);
}

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
