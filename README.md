# Interview Ready Gems 💎

A powerhouse suite of companion apps built to enhance **Interview Ready** experience. Each feature is built to help developers train smarter, assess better, and optimize their workflow—ensuring they stand out and get hired faster.

## About This Repository

This is a **Next.js** project designed with a **modular architecture** to support multiple features, such as **Resume Checker** and **Take Home Checker**. Each feature is encapsulated within its own directory, ensuring better maintainability and scalability.


## Features

- **Resume Checker**: A tool for analyzing and reviewing resumes.
- **Take Home Checker**: A tool to assess take-home assignments.


## Project Structure

```
/src/
  /features/
    /resume-checker/         # Feature: Resume Checker
      /components/           # Specific UI components
      /hooks/                # Custom hooks for this feature
      /services/             # API calls and business logic
      /pages/                # Next.js pages (entry point for this feature)
        index.tsx            # /resume-checker route
    /take-home-checker/      # Feature: Take Home Checker
      /components/
      /hooks/
      /services/
      /pages/
        index.tsx            # /take-home-checker route
  /components/               # Shared UI components across features
  /hooks/                    # Shared hooks
  /services/                 # Shared business logic
  /pages/                    # Next.js pages
    index.tsx                # Main entry point
  /styles/                   # Global styles
  /public/                   # Static assets
  next.config.js
  tsconfig.json
  package.json
```

## Getting Started

### 1️⃣ Install Dependencies

```bash
npm install  # or yarn install or pnpm install
```

### 2️⃣ Run Development Server

```bash
npm run dev  # or yarn dev or pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### 3️⃣ Run Production Build
```bash
npm run build
npm start
```

## Deployment Setup
This project is deployed on Vercel. The production environment automatically deploys from the main branch.
### 1️⃣ Environment Variables
Before deploying, you need to set up the following environment variables. Create a `.env` file in the root directory with these variables:

```bash
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here

# GitHub OAuth Configuration
GITHUB_ID=your_github_client_id_here
GITHUB_SECRET=your_github_client_secret_here
```

#### How to obtain the credentials:
1. **OPENAI_API_KEY**: 
   - Sign up at [OpenAI Platform](https://platform.openai.com)
   - Go to API keys section
   - Create a new secret key

2. **NEXTAUTH_SECRET**:
   - Generate a random string for production
   - You can use: `openssl rand -base64 32` in your terminal

3. **GITHUB_ID** and **GITHUB_SECRET**:
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Create a new OAuth App
   - Set the callback URL to `http://localhost:3000/api/auth/callback/github` for development
   - For production, use your domain: `https://your-domain.com/api/auth/callback/github`


## Architectural Decisions

### 1️⃣ **Encapsulation per Feature**
Each feature has its own `/pages/` directory inside `/src/features/`. This structure keeps feature-specific code self-contained while still allowing for shared utilities.

### 2️⃣ **Page Router Approach**
We opted for **Next.js Pages Router** instead of App Router for simplicity and compatibility with traditional routing patterns.

### 3️⃣ **Shared Components & Services**
Common UI elements and business logic reside in `/src/components/` and `/src/services/`, preventing code duplication.

### 4️⃣ **Flexible Styling**
- **Tailwind CSS** is the primary styling approach.
- **CSS-in-JS (Styled Components, Emotion, etc.)** can be used per feature, ensuring flexibility without enforcing a single styling method.


This project is designed to be **scalable, maintainable, and easy to extend**. Keep it that way

