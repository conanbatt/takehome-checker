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
    <div className="w-full mx-auto flex-1">
      {repos?.length > 0 ? (
        <RepoSelector repos={repos} onChange={handleSelect} />
      ) : (
        <p>No repositories available.</p>
      )}
    </div>
  );
}
