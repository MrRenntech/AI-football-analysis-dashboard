// app/dashboard/_components/asidemenu/layer.tsx
'use client';

import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

const AsideMenuLayer = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div
      className={`bg-gray-800 text-white flex flex-col p-4 h-full ${
        collapsed ? 'w-16' : 'w-64'
      } transition-all duration-300 ease-in-out`}
    >
      {/* Toggle Button */}
      <button
        className="text-xl mb-6"
        onClick={toggleSidebar}
      >
        {collapsed ? <FaBars /> : <FaTimes />}
      </button>

      {/* Sidebar Links */}
      <div className="flex flex-col space-y-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/charts">Charts</Link>
        <Link href="/comparison">Comparison</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/upload">Upload</Link>
        <Link href="/help">Help</Link>
        <Link href="/about">About</Link>
        <Link href="/logout">Logout</Link>
      </div>
    </div>
  );
};

export default AsideMenuLayer;
