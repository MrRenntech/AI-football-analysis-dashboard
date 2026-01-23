"use client";

import React, { ReactNode, useState } from "react";
import menuAside from "./_lib/menuAside";
import AsideMenu from "./_components/AsideMenu";
import FooterBar from "../_components/FooterBar";

type Props = {
  children: ReactNode;
};

export default function LayoutAuthenticated({ children }: Props) {
  const [isAsideMobileExpanded, setIsAsideMobileExpanded] = useState(false);
  const [isAsideLgActive, setIsAsideLgActive] = useState(false);

  const handleRouteChange = () => {
    setIsAsideMobileExpanded(false);
    setIsAsideLgActive(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
      {/* ✅ Sidebar fixed */}
      <AsideMenu
        isAsideMobileExpanded={isAsideMobileExpanded}
        isAsideLgActive={isAsideLgActive}
        menu={menuAside}
        onAsideLgClose={() => setIsAsideLgActive(false)}
        onRouteChange={handleRouteChange}
      />

      {/* ✅ Main content shifts for sidebar */}
      <main className="flex-1 min-h-screen lg:ml-60 p-4">
        {children}
        <FooterBar>
          Get more with{" "}
          <a
            href="https://tailwind-react.justboil.me/dashboard"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600"
          >
            Premium version
          </a>
        </FooterBar>
      </main>
    </div>
  );
}
