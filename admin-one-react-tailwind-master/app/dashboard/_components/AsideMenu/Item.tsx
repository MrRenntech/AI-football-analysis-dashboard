// app/dashboard/_components/AsideMenu/Item.tsx
"use client";

import React from "react";
import Link from "next/link";
import { MenuAsideItem } from "./menu";

export default function AsideMenuItem({ item }: { item: MenuAsideItem }) {
  if (!item.href && !item.isLogout) return null;

  const Icon = item.icon;

  return (
    <li>
      {item.isLogout ? (
        <button
          onClick={() => alert("Logging out...")}
          className="flex items-center w-full px-3 py-2 text-left hover:bg-slate-700 rounded"
        >
          <Icon className="mr-2" />
          {item.label}
        </button>
      ) : (
        <Link
          href={item.href!}
          className="flex items-center px-3 py-2 hover:bg-slate-700 rounded"
        >
          <Icon className="mr-2" />
          {item.label}
        </Link>
      )}
    </li>
  );
}
