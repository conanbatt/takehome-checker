# Interview Ready Gems 💎

A powerhouse suite of companion apps built to enhance **Interview Ready** experience. Each feature is crafted to help developers train smarter, assess better, and optimize their workflow—ensuring they stand out and get hired faster.

## 🚀 About This Repository

This is a **Next.js** project designed with a **modular architecture** to support multiple features, such as **Resume Checker** and **Take Home Checker**. Each feature is encapsulated within its own directory, ensuring better maintainability and scalability.



## 🚀 Features

- **Resume Checker**: A tool for analyzing and reviewing resumes.
- **Take Home Checker**: A tool to assess take-home assignments.


## 📁 Project Structure

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

## 🚀 Getting Started

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

## 🏗️ Architectural Decisions

### 1️⃣ **Encapsulation per Feature**
Each feature has its own `/pages/` directory inside `/src/features/`. This structure keeps feature-specific code self-contained while still allowing for shared utilities.

### 2️⃣ **Page Router Approach**
We opted for **Next.js Pages Router** instead of App Router for simplicity and compatibility with traditional routing patterns.

### 3️⃣ **Shared Components & Services**
Common UI elements and business logic reside in `/src/components/` and `/src/services/`, preventing code duplication.

### 4️⃣ **Flexible Styling**
- **Tailwind CSS** is the primary styling approach.
- **CSS-in-JS (Styled Components, Emotion, etc.)** can be used per feature, ensuring flexibility without enforcing a single styling method.

## 🚀 Deploying on Vercel

This project is optimized for deployment on **Vercel**. To deploy:

1. Push your code to a GitHub repository.
2. Connect the repository to [Vercel](https://vercel.com/).
3. Vercel will automatically build and deploy the app.

For manual deployment:

```bash
vercel
```

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Guide](https://nextjs.org/docs/pages/building-your-application/deploying)

---

This project is designed to be **scalable, maintainable, and easy to extend**. Contributions and improvements are always welcome! 🚀

