import { nav } from "../routes";
import { AiOutlineHome, AiFillShop } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { BiAddToQueue } from "react-icons/bi";
import {TbCirclesRelation} from 'react-icons/tb'
export const HomeSidebar = [
  { name: "Home", nav: nav.HOME, icon: AiOutlineHome },
  { name: "Shops", nav: nav.SHOPS, icon: AiFillShop },
];
export const AdminSideBar = [
  { name: "Home", nav: nav.HOME, icon: AiOutlineHome },
  { name: "Users", nav: nav.USERS, icon: FiUsers },
  { name: "DSE", nav: nav.DSE, icon: BiSolidPurchaseTag },
  { name: "Line", nav: nav.LINES, icon: BiAddToQueue },
  { name: "Shops", nav: nav.SHOPS, icon: AiFillShop },
  {name:"Mapping",nav: nav.MAPPINGS, icon: TbCirclesRelation}
];
