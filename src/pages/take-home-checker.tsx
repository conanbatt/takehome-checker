import { Repo } from "@/types/repo";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Octokit } from "octokit";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    
    if (!session || !session.accessToken) {
        return { props: { repos: [], isAuthenticated: false } };
    }

    try {
        const octokit = new Octokit({ auth: session.accessToken });
        const { data: repos } = await octokit.request("GET /user/repos", { visibility: "all" });

        return { props: { repos: repos as Repo[], isAuthenticated: true } };
    } catch (error) {
        console.error("Error fetching repos:", error);
        return { props: { repos: [], isAuthenticated: true } };
    }
};

export { default } from "../features/take-home-checker/pages";
