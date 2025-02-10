import { useState } from "react";
import { Repo } from "@/types/repo";
import ProjectAnalysis from "./ProjectAnalysis";
import { RepositoryList } from "@/features/take-home-checker/components/RepositoryList";
import { FolderCode, GitBranchIcon, TextIcon } from "lucide-react";
import { useProjectAnalysis } from "@/hooks/useProjectAnalysis";
import LoadingSpinner from "./LoadingSpinner";

interface RepoAnalysisProps {
  repos: Repo[];
  token: string;
}

export default function RepoAnalysis({ repos, token }: RepoAnalysisProps) {
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  const { data: analysis, isLoading, isError, error, isSuccess, refetch } = useProjectAnalysis(selectedRepo, token);

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

      {analysis?.readme && <ProjectAnalysis icon={<TextIcon />} title="Readme analysis" analysis={analysis?.readme} />}
      {analysis?.structure && <ProjectAnalysis icon={<FolderCode />} title="Project structure analysis" analysis={analysis?.structure} />}
      {analysis?.gitHistory && <ProjectAnalysis icon={<GitBranchIcon />} title="Git history analysis" analysis={analysis?.gitHistory} />}
    </div>
  );
}
