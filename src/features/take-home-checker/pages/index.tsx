import { Repo } from "@/types/repo";
import AuthGitHub from "../components/AuthGtihub";
import RepoAnalysis from "@/components/RepoAnalysis";

export default function Page({ repos, isAuthenticated, token }: { repos: Repo[]; isAuthenticated: boolean; token: string }) {
  return (
    <div>
      <AuthGitHub />
      {isAuthenticated && <RepoAnalysis repos={repos} token={token} />}
    </div>
  );
}
