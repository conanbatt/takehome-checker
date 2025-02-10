import { signIn, signOut, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export default function AuthGitHub() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Sign in to GitHub to test your take-home
        </h2>
        <button
          onClick={() => signIn("github")}
          className="flex items-center bg-black text-white py-3 px-8 rounded-full hover:bg-gray-800 transition duration-200 shadow-lg"
        >
          <FaGithub className="mr-3 text-xl" />
          Sign in with GitHub
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full px-6">
      <div></div>
      <button
        onClick={() => signOut()}
        className="p-3 text-red-500 hover:text-gray-800 transition duration-200 flex"
      >
        <h3>{session.user?.name}</h3>
        <FiLogOut size={28} />
      </button>
    </div>
  );
}
