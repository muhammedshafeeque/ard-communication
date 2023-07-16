import { nav } from "../routes";
import { AiOutlineHome ,AiFillShop} from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { BiAddToQueue } from "react-icons/bi";

export const HomeSidebar = [
  { name: "Home", nav: nav.HOME, icon: AiOutlineHome },
];
export const AdminSideBar = [
  { name: "Home", nav: nav.HOME, icon: AiOutlineHome },
  { name: "Users", nav: nav.USERS, icon: FiUsers },
  { name: "DSE", nav: nav.DSE, icon: BiSolidPurchaseTag },
  { name: "Line", nav: nav.LINES, icon: BiAddToQueue },
  {name:'Shops', nav:nav.SHOPS, icon: AiFillShop}
];
