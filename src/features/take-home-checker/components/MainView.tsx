'use client';
import { Repo } from "@/types/repo";
import RepoAnalysis from "@/components/RepoAnalysis";

import Header from "../components/Header";
import AuthGitHub from "../components/AuthGtihub";
import { ThemeProvider } from "@/components/ThemeContext";

export default function MainView({ repos, isAuthenticated, token }: { repos: Repo[]; isAuthenticated: boolean; token: string }) {
    return (
        <ThemeProvider>
            <div>
                <Header />
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                    <AuthGitHub />
                    {isAuthenticated && <RepoAnalysis repos={repos} token={token} />}
                </div>
            </div>
        </ThemeProvider>
    );
}
