import { useState } from "react";
import { Repo } from "@/types/repo";
import ProjectAnalysis from "./ProjectAnalysis";
import { RepositoryList } from "@/features/take-home-checker/components/RepositoryList";
import { useProjectAnalysis } from "@/hooks/useProjectAnalysis";
import LoadingSpinner from "./LoadingSpinner";
import ReadmeViewer from "./ReadmeViewer";

interface RepoAnalysisProps {
  repos: Repo[];
  token: string;
}

export default function RepoAnalysis({ repos, token }: RepoAnalysisProps) {
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  const { data, isLoading, isError, error, isSuccess, refetch } = useProjectAnalysis(selectedRepo, token);

  const {
    content: readme,
    analysis,
  } = data ?? {}

  const handleAnalyzeClick = () => {
    refetch();
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

      {isLoading && (
        <div className="w-full flex justify-center mt-4">
          <LoadingSpinner />
        </div>
      )}

      {isError && <p className="text-red-500 text-center">Error: {error instanceof Error ? error.message : "An error occurred"}</p>}
      {readme &&
      <div className="flex flex-col md:flex-row gap-4 px-6">
        <div className="md:w-1/2">
          <ReadmeViewer markdown={readme}/>
        </div>
        <div className="md:w-1/2 space-y-4">
          {analysis && <ProjectAnalysis {...analysis} />}
        </div>
      </div>
      }
    </div>
  );
}
