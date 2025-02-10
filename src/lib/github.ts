import { Octokit } from "octokit";

interface GitCommit {
    message: string;
    author: {
        name: string;
        date: string;
    };
}

interface FileEntry {
    path: string;
}

export async function fetchReadme(owner: string, repo: string, octokit: Octokit): Promise<string | null> {
    try {
        const { data } = await octokit.request(`GET /repos/${owner}/${repo}/contents/README.md`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            },
        });

        return data?.content ? Buffer.from(data.content, "base64").toString("utf-8") : null;
    } catch (error) {
        console.error("Error fetching README:", error);
        return null;
    }
}

export async function fetchRepoFiles(owner: string, repo: string, octokit: Octokit): Promise<string[]> {
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/git/trees/HEAD?recursive=1",
      { owner, repo }
    );
  
    return response.data.tree.map((entry: FileEntry) => entry.path);
  }

export async function fetchGitHistory(owner: string, repo: string, octokit: Octokit): Promise<{
    message: string;
    author: string;
    date: string;
  }[]> {
    const { data } = await octokit.request(`GET /repos/${owner}/${repo}/commits`, {
      per_page: 30,
    });
  
    return data.map((item: { commit: GitCommit }) => ({
      message: item.commit.message,
      author: item.commit.author.name,
      date: item.commit.author.date,
    }));
  }
