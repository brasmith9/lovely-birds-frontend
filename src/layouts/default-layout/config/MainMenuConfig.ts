import type { MenuItem } from "@/layouts/default-layout/config/types";

const MainMenuConfig: Array<MenuItem> = [
  {
    heading: "Home",
    route: "/search",
    keenthemesIcon: "home-2",
    bootstrapIcon: "bi-bar-chart-line",
  },
  {
    heading: "History",
    route: "/history",
    keenthemesIcon: "switch",
    bootstrapIcon: "bi-toggles",
  }
];

export default MainMenuConfig;
