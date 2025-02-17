import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>Choose a tool:</p>
      <ul>
        <li><Link href="/resume-checker">Resume Checker</Link></li>
        <li><Link href="/take-home-checker">Take Home Checker</Link></li>
      </ul>
    </div>
  );
}
