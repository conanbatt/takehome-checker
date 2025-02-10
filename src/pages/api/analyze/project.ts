import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { analyzeGitHistory, analyzeProjectStructure, analyzeReadme } from "@/lib/analyze";

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
