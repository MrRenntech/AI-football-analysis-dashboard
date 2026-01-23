// app/_components/PageLayout.tsx
'use client';

import { ReactNode, useState } from 'react';
import AsideMenu from '../dashboard/_components/AsideMenu';
import FooterBar from './FooterBar';
import menuAside from '../dashboard/_lib/menuAside';

export default function PageLayout({ children }: { children: ReactNode }) {
  const [isAsideMobileExpanded, setIsAsideMobileExpanded] = useState(false);
  const [isAsideLgActive, setIsAsideLgActive] = useState(false);

  const handleRouteChange = () => {
    setIsAsideMobileExpanded(false);
    setIsAsideLgActive(false);
  };

  return (
    <div className="overflow-hidden lg:overflow-visible">
      <AsideMenu
        isAsideMobileExpanded={isAsideMobileExpanded}
        isAsideLgActive={isAsideLgActive}
        menu={menuAside}
        onAsideLgClose={() => setIsAsideLgActive(false)}
        onRouteChange={handleRouteChange}
      />
      <main className="pt-14 min-h-screen bg-gray-50 dark:bg-slate-800 dark:text-white">
        {children}
        <FooterBar />
      </main>
    </div>
  );
}
