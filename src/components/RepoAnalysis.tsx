import { useState } from "react";
import { Repo } from "@/types/repo";
import ProjectAnalysis from "./ProjectAnalysis";
import { RepositoryList } from "@/features/take-home-checker/components/RepositoryList";
import { useProjectAnalysis } from "@/hooks/useProjectAnalysis";
import ReadmeViewer from "./ReadmeViewer";
import LoadingBanner from "./LoadingBanner";
import { motion } from "framer-motion";
import useLoadingMessage from "@/hooks/useLoadingMessage";
import AppInfoWithVideo from "./AppInfoWithVideo";

interface RepoAnalysisProps {
  repos: Repo[];
  token: string;
}

export default function RepoAnalysis({ repos, token }: RepoAnalysisProps) {
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  const { data, isSuccess, isLoading, isError, error, refetch } = useProjectAnalysis(selectedRepo, token);
  const loadingMessage = useLoadingMessage(isLoading);

  const {
    content: readme,
    analysis,
  } = data ?? {}

  const handleAnalyzeClick = () => {
    refetch();
  };

  return (
    <div className="max-w-7xl mx-auto pt-6">
      <div className="w-full flex flex-row gap-4">
        <RepositoryList repos={repos} onSelect={setSelectedRepo} />
        <button
          onClick={handleAnalyzeClick}
          className="p-2 px-6 bg-blue-500 text-white rounded-md disabled:bg-gray-300 flex-4"
          disabled={!selectedRepo || isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Project'}
        </button>
      </div>

      {isLoading && (
        <div className="text-center mb-6 text-gray-600 dark:text-gray-300 mt-6">
          {loadingMessage}
        </div>
      )}

      {isLoading && (
        <div className="w-full mt-4">
          <LoadingBanner />
        </div>
      )}

      {isError && (
        <p className="text-red-500 text-center">
          Error: {error instanceof Error ? error.message : "An error occurred"}
        </p>
      )}
      {isSuccess &&
        (<>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-6 mt-6 pb-6"
          >
            <div className="">
              <ReadmeViewer markdown={readme} />
            </div>
            <div className="">
              {analysis && <ProjectAnalysis {...analysis} />}
            </div>
          </motion.div>

          <hr className="w-full my-8 lg:col-span-2" />
          <AppInfoWithVideo appName="Take Home Checker" videoUrl="https://www.youtube.com/embed/aeyAG2DPWz0?si=IeayRmBlEt0Iv2-T" />
        </>
        )}
    </div>
  );
}