/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */

import NavigationRouteNames from "./ScreenNames";
import { Colors } from "../theme";

const USER_ROLE = {
  SELLER: "seller",
  ADMIN: "admin",
  AGGRATOR: "aggrator",
  RECYCLER: "recycler",
  EPR: "EPR",
};

const USERS_ROLE_MENU = {
  SELLER: [
    {
      menuName: "Create Order",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      menu2image: require("../assets/Images/Dashboard/Icon_ionic-md-create.png"),
      color: Colors.mango,
      screenName: NavigationRouteNames.NEW_ORDER,
    },
    {
      menuName: "Existing Order",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      menu2image: require("../assets/Images/Dashboard/Project.png"),
      color: Colors.mango,
      screenName: "",
    },
    {
      menuName: "Profile",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      menu2image: require("../assets/Images/Dashboard/Project.png"),
      color: Colors.mango,
      screenName: "",
    },
    {
      menuName: "Logout",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      menu2image: require("../assets/Images/Dashboard/Project.png"),
      color: Colors.mango,
      screenName: "Logout",
    },
  ],
  ADMIN: [
    {
      menuName: "Logout",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      menu2image: require("../assets/Images/Dashboard/Project.png"),
      color: Colors.mango,
      screenName: "Logout",
    },
  ],
  AGGRATOR: [
    {
      menuName: "View New Order",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      menu2image: require("../assets/Images/Dashboard/Icon_ionic-md-create.png"),
      color: Colors.mango,
      screenName: "",
    },
    {
      menuName: "Open Scheduled Order",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      menu2image: require("../assets/Images/Dashboard/Icon_ionic-md-create.png"),
      color: Colors.mango,
      screenName: "",
    },
    {
      menuName: "View Completed Order",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      menu2image: require("../assets/Images/Dashboard/Icon_ionic-md-create.png"),
      color: Colors.green,
      screenName: "",
    },
    {
      menuName: "Logout",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      menu2image: require("../assets/Images/Dashboard/Project.png"),
      color: Colors.mango,
      screenName: "Logout",
    },
  ],
  RECYCLER: [{
    menuName: "Logout",
    menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
    menu2image: require("../assets/Images/Dashboard/Project.png"),
    color: Colors.mango,
    screenName: "Logout",
  }],
  EPR: [{
    menuName: "Logout",
    menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
    menu2image: require("../assets/Images/Dashboard/Project.png"),
    color: Colors.mango,
    screenName: "Logout",
  }],
};

export { USER_ROLE, USERS_ROLE_MENU };
