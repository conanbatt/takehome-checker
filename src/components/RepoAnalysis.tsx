// components/RepoAnalysis.tsx

import { useState } from "react";
import { Repo } from "@/types/repo";
import ProjectAnalysis from "./ProjectAnalysis";
import { RepositoryList } from "@/features/take-home-checker/components/RepositoryList";

interface RepoAnalysisProps {
  repos: Repo[];
  token: string;
}

export default function RepoAnalysis({ repos, token }: RepoAnalysisProps) {
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [analysis, setAnalysis] = useState<{readme: string, structure: string} | null>(null);

  const handleAnalyzeClick = async () => {
    try {
      const response = await fetch("/api/analyze/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repo: selectedRepo.name,
          owner: selectedRepo.owner,
          token: token,
        }),
      });

      const data = await response.json();
      console.log("🚀 ~ handleAnalyzeClick ~ data:", data)

      if (response.ok) {
        setAnalysis(data);
      } else {
        console.error("Error analyzing Project:", data.message);
        setAnalysis(null);
      }
    } catch (error) {
      console.error("Failed to fetch Project analysis:", error);
      setAnalysis(null);
    }
  };

  return (
    <div>
      <RepositoryList repos={repos} onSelect={setSelectedRepo} />
      {selectedRepo && (
        <div className="w-full flex justify-center">
          <button
            onClick={handleAnalyzeClick}
            className="mt-4 p-2 bg-blue-500 text-white rounded-md"
          >
            Analyze Project
          </button>
        </div>
      )}

      {analysis?.readme && <ProjectAnalysis icon="📄" title="Readme analysis" analysis={analysis?.readme} />}
      {analysis?.structure && <ProjectAnalysis icon="🗂️" title="Project structure analysis" analysis={analysis?.structure} />}
    </div>
  );
}
