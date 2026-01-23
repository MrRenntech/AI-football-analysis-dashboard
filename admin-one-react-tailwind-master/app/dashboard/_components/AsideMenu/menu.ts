// app/dashboard/_components/AsideMenu/menu.ts
import {
  HiOutlineChartBar,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineDocumentAdd,
  HiOutlineViewGrid,
  HiOutlineQuestionMarkCircle,
  HiOutlineInformationCircle,
} from "react-icons/hi";

import { IconType } from "react-icons";

export interface MenuAsideItem {
  label: string;
  icon: IconType;
  href?: string;
  isLogout?: boolean;
}

export const menuAside: MenuAsideItem[] = [
  { label: "Dashboard", icon: HiOutlineViewGrid, href: "/dashboard" },
  { label: "Charts", icon: HiOutlineChartBar, href: "/charts" },
  { label: "Comparison", icon: HiOutlineDocumentAdd, href: "/comparison" },
  { label: "Profile", icon: HiOutlineUser, href: "/profile" },
  { label: "Upload", icon: HiOutlineDocumentAdd, href: "/upload" },
  { label: "Help", icon: HiOutlineQuestionMarkCircle, href: "/help" },
  { label: "About", icon: HiOutlineInformationCircle, href: "/about" },
  { label: "Logout", icon: HiOutlineLogout, isLogout: true },
];
