import { Repo } from "@/types/repo";
import MainView from "../components/MainView";


export default function Page({ repos, isAuthenticated, token }: { repos: Repo[]; isAuthenticated: boolean; token: string }) {
  return (
    <MainView {...{ repos, isAuthenticated, token }} />
  );
}
