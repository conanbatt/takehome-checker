import { analyzeText } from "@/lib/openai";
import { Octokit } from "octokit";
import { fetchGitHistory, fetchReadme, fetchRepoFiles } from "./github";


export async function analyzeReadme(owner: string, repo: string, octokit: Octokit) {
    const readmeContent = await fetchReadme(owner, repo, octokit);

    if (!readmeContent) {
        return { message: "README.md not found in the repository." };
    }

    const prompt = `
  Analyze the following README file for best practices and provide a **concise summary** considering the following aspects:

  1️⃣ **Technology Stack**: Is the tech stack mentioned clearly? Is it modern and relevant?
  2️⃣ **Installation & Usage**: Are there clear instructions to install, run, and test the project? Are the dependencies listed with their versions?
  3️⃣ **Deployment & Accessibility**: Does it mention if the project is deployed or how to test it easily? Are there clear steps for deployment if applicable?
  4️⃣ **Technical Decisions**: Does it explain key technical choices made (such as why certain libraries or frameworks were used)?
  5️⃣ **Testing**: Does it include details about tests (manual or automated)? Is there any coverage or tool mentioned for testing?
  6️⃣ **Requirements Compliance**: Does it define objectives and expected functionalities clearly? Are the requirements met and is there a clear plan to verify the solution?  **Limit response to 3-5 bullet points, avoiding excessive details.**

  ** ⚠️ Limit response to 3-5 bullet points, avoiding excessive details.**

  README Content:
  ${readmeContent}
`;

    return await analyzeText(prompt);
}

export async function analyzeProjectStructure(owner: string, repo: string, octokit: Octokit) {
    const allFilePaths = await fetchRepoFiles(owner, repo, octokit);

    if (allFilePaths.length === 0) {
        return { message: "Unable to fetch project structure or repository is empty." };
    }

    const prompt = `
    Evaluate the following project structure and determine if it follows best practices for a technical take-home challenge and provide a **concise summary** considering the following aspects:

    1️⃣ **Folder & File Organization**: Are files and folders well-structured according to common project conventions? Are there redundant or missing files? For example, is there a clear separation between source code, assets, and configuration files?
    2️⃣ **Code Quality & Readability**: Are there clear separations between different parts of the project (e.g., components, utilities, tests)? Is there a consistent naming convention and folder structure for various modules?

    ** ⚠️ Limit response avoiding excessive details.**

    **Project Structure:**
    ${allFilePaths.join("\n")}
  `;

    return await analyzeText(prompt);
}

export async function analyzeGitHistory(owner: string, repo: string, octokit: Octokit) {
    const gitHistory = await fetchGitHistory(owner, repo, octokit);

    if (gitHistory.length === 0) {
        return { message: "No commits found in the repository." };
    }

    const prompt = `
  Analyze the Git commit history for best practices. Provide a **brief summary** the following aspects:

    1️⃣ **Commit Messages**: Are the commit messages clear, concise, and meaningful? Do they follow a consistent format?
    2️⃣ **Test & Feature Driven Development**: Do commit messages indicate work on specific features or tests?
    3️⃣ **Atomic Commits**: Are the commits atomic, meaning that each commit addresses a single task or feature, making them easier to understand and review?
    4️⃣ **Code Refactoring & Formatting**: Do the commit messages reflect any code refactoring or formatting changes that improve readability, organization, or maintainability?

    ** ⚠️ Limit response avoiding excessive details.**

    **Git Commit History:**
    ${gitHistory.map(commit => `- ${commit.date}: ${commit.message} by ${commit.author}`).join("\n")}
  `;

    return await analyzeText(prompt);
}