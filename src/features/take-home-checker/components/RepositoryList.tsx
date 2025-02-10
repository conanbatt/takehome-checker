import RepoSelector from "@/components/RepoSelector";
import { Repo } from "@/types/repo";

interface RepositoryListProps {
  repos: Repo[];
  onSelect?: (repo: Repo | null) => void;
}

export function RepositoryList({ repos, onSelect }: RepositoryListProps) {
  const handleSelect = (repo: Repo | null) => {
    if (onSelect) {
      onSelect(repo);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4  flex align-center">Select a repository to check</h2>
      {repos?.length > 0 ? (
        <RepoSelector repos={repos} onChange={handleSelect} />
      ) : (
        <p>No repositories available.</p>
      )}
    </div>
  );
}
