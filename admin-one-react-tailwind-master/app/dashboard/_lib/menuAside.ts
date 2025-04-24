import {
  mdiViewDashboard,
  mdiUpload,
  mdiCompare,
  mdiChartBar,
  mdiAccount,
  mdiHelpCircle,
  mdiInformation,
  mdiLogout,
} from "@mdi/js";
import { MenuAsideItem } from "../../_interfaces"; // Adjust path if needed

const menuAside: MenuAsideItem[] = [
  {
    href: "/dashboard",
    icon: mdiViewDashboard,
    label: "Dashboard",
  },
  {
    href: "/upload",
    icon: mdiUpload,
    label: "Upload",
  },
  {
    href: "/comparison",
    icon: mdiCompare,
    label: "Comparison",
  },
  {
    href: "/charts",
    icon: mdiChartBar,
    label: "Charts",
  },
  {
    href: "/profile",
    icon: mdiAccount,
    label: "Profile",
  },
  {
    href: "/help",
    icon: mdiHelpCircle,
    label: "Help",
  },
  {
    href: "/about",
    icon: mdiInformation,
    label: "About",
  },
  {
    href: "/logout",
    icon: mdiLogout,
    label: "Logout",
  },
];

export default menuAside;
