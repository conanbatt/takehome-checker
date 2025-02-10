import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";
import { analyzeText } from "@/lib/openai";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

async function analyzeReadme(owner: string, repo: string, octokit: Octokit) {
  const { data } = await octokit.request(`GET /repos/${owner}/${repo}/contents/README.md`, {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
  });

  if (data && data.content) {
    const readmeContent = Buffer.from(data.content, "base64").toString("utf-8");
    return await analyzeText(`Analyze this README:\n${readmeContent}`);
  } else {
    return { message: "README.md not found in the repository." };
  }
}
async function analyzeProjectStructure(owner: string, repo: string, octokit: Octokit) {
  const allFiles = await fetchRepoFilesGraphQL(owner, repo, octokit);

  const structureAnalysis = await analyzeText(`Analyze this project structure:\n${allFiles.join("\n")}`);
  return structureAnalysis;
}


async function fetchRepoFilesGraphQL(owner: string, repo: string, octokit: Octokit) {
  const query = `
    query ($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        object(expression: "HEAD:") {
          ... on Tree {
            entries {
              name
              path
              type
            }
          }
        }
      }
    }
  `;

  const response = await octokit.graphql(query, { owner, repo });

  if (response.repository?.object?.entries) {
    return response.repository.object.entries
      .filter((entry: { type: string }) => entry.type === "blob") // Only get files
      .map((entry: { path: string }) => entry.path);
  }

  return [];
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
    const [readmeAnalysis, structureAnalysis] = await Promise.all([
      analyzeReadme(owner.login, repo, octokit),
      analyzeProjectStructure(owner.login, repo, octokit)
    ]);

    const analysisResults = {
      readme: readmeAnalysis,
      structure: structureAnalysis
    };
    console.log("🚀 ~ handler ~ analysisResults:", analysisResults)

    res.status(200).json(analysisResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch repository contents or analyze the project." });
  }
}
