import React, { ReactNode } from "react";
import JustboilLogo from "./JustboilLogo";

type Props = {
  children?: ReactNode;
};

export default function FooterBar({ children }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-4 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <div className="mb-2 md:mb-0">
          &copy; {year} JustBoil.me. {children}
        </div>
        <a href="https://justboil.me" target="_blank" rel="noreferrer">
          <JustboilLogo className="h-6 w-auto" />
        </a>
      </div>
    </footer>
  );
}
