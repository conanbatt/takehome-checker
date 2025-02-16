import React from 'react';
import { HiCheck, HiSun, HiMoon } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import './Header.css';
import { ThemeContext } from '@/components/ThemeContext';
import LogOutGithub from './LogOutGithub';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const { isDark, setIsDark } = React.useContext(ThemeContext);

  return (
    <header className="border-b dark:border-gray-700 dark:bg-gray-800">
      <nav className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl flex gap-2 items-center text-nowrap col-span-3"
        >
          <Image
            className="invert dark:invert-0"
            src="/images/logo-white.svg"
            alt="Icon."
            width={20}
            height={20}
          />{" "}
          Take Home Checker
        </Link>
        <div className="flex items-center space-x-6">
          <Link
            href="https://jobs.ashbyhq.com/Silver?utm_source=Pedw1mQEZd"
            className="text-sm dark:text-white hover:text-black/80 dark:hover:text-white/80 cursor-pointer hover:text-indigo-300"
          >
            Jobs
          </Link>
          <Link
            href="https://ready.silver.dev/"
            className="text-sm dark:text-white hover:text-black/80 dark:hover:text-white/80 cursor-pointer hover:text-indigo-300"
          >
            Interview Ready
          </Link>
          <Link
            href="privacy"
            className="text-sm dark:text-white hover:text-black/80 dark:hover:text-white/80 cursor-pointer hover:text-indigo-300"
          >
            Privacy Policy
          </Link>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDark ? <HiSun className="w-5 h-5 text-gray-300" /> : <HiMoon className="w-5 h-5 text-gray-600" />}
          </button>
          <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            <FaGithub className="w-5 h-5" />
          </a>
          <LogOutGithub />
        </div>
      </nav>
    </header>
  );
};

export default Header;
