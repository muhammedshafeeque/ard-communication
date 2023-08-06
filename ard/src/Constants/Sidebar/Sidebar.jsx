import { nav } from "../routes";
import { AiOutlineHome, AiFillShop } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { BiAddToQueue } from "react-icons/bi";
import { TbCirclesRelation, TbReportSearch } from "react-icons/tb";
import { RiArchiveDrawerLine } from "react-icons/ri";

export const HomeSidebar = [
  { name: "Home", nav: nav.HOME, icon: AiOutlineHome },
  { name: "Shops", nav: nav.SHOPS, icon: AiFillShop },
  { name: "Report", nav: nav.REPORT_LIST, icon: TbReportSearch },
];
export const AdminSideBar = [
  { name: "Home", nav: nav.HOME, icon: AiOutlineHome },
  { name: "Users", nav: nav.USERS, icon: FiUsers },
  { name: "DSE", nav: nav.DSE, icon: BiSolidPurchaseTag },
  { name: "Line", nav: nav.LINES, icon: BiAddToQueue },
  { name: "Stock", nav: nav.STOCK, icon: RiArchiveDrawerLine },
  { name: "Shops", nav: nav.SHOPS, icon: AiFillShop },
  { name: "Mapping", nav: nav.MAPPINGS, icon: TbCirclesRelation },
];
