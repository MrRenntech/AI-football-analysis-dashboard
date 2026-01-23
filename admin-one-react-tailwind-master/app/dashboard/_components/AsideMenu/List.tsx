// app/dashboard/_components/AsideMenu/List.tsx
"use client";

import React from "react";
import AsideMenuItem from "./Item";
import { MenuAsideItem } from "./menu";

export default function AsideMenuList({ menu }: { menu: MenuAsideItem[] }) {
  return (
    <ul className="space-y-1 px-2">
      {menu.map((item, index) => (
        <AsideMenuItem key={index} item={item} />
      ))}
    </ul>
  );
}
