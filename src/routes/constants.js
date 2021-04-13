/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */

import NavigationRouteNames from "./ScreenNames";
import { Colors } from "../theme";

const USER_ROLE = {
  SELLER: "seller",
  ADMIN: "admin",
  AGGRATOR: "aggregate",
  RECYCLER: "recycler",
  EPR: "EPR",
};

const DRAWER_MENU = {
  seller: [
      {
          name: 'My Home',
          color: Colors.mango,
          iconName: 'home',
          screenName: NavigationRouteNames.NEW_ORDER_REQUEST
      },
      {
          name: 'New Order',
          color: Colors.mango,
          iconName: 'folder-open',
          screenName: ''
      },
      {
          name: 'My Orders',
          color: Colors.mango,
          iconName: 'folder',
          screenName: ''
      },
      {
          name: 'Payments',
          color: Colors.mango,
          iconName: 'credit-card-alt',
          screenName: ''
      },
      {
          name: 'Profile',
          color: Colors.mango,
          iconName: 'users',
          screenName: ''
      },
      {
          name: 'Users',
          color: Colors.mango,
          iconName: 'user',
          screenName: ''
      },
      {
          name: 'Contact Jayde',
          color: Colors.mango,
          iconName: 'phone-square',
          screenName: ''
      },
      {
        name: 'Smart Contracts',
        color: Colors.mango,
        iconName: 'sticky-note',
        screenName: ''
      },
      {
          name: 'Logout',
          color: Colors.mango,
          iconName: 'power-off',
          screenName: 'logout'
      },
  ],
  admin: [
    {
        name: 'My Home',
        color: Colors.mango,
        iconName: 'home',
        screenName: NavigationRouteNames.NEW_ORDER_REQUEST
    },
    {
        name: 'Download Report',
        color: Colors.mango,
        iconName: 'download',
        screenName: ''
    },
    {
        name: 'Manage Orders',
        color: Colors.mango,
        iconName: 'edit',
        screenName: ''
    },
    {
        name: 'Manage EPR',
        color: Colors.mango,
        iconName: 'th-large',
        screenName: ''
    },
    {
        name: 'Manage Sub Category',
        color: Colors.mango,
        iconName: 'tasks',
        screenName: ''
    },
    // {
    //     name: 'Manage Provisional Pricing',
    //     color: Colors.mango,
    //     iconName: 'tasks',
    //     screenName: ''
    // },
    {
        name: 'Profile',
        color: Colors.mango,
        iconName: 'tasks',
        screenName: ''
    },
    {
        name: 'Manage Jayde Users',
        color: Colors.mango,
        iconName: 'snowflake-o',
        screenName: ''
    },
    {
        name: 'Users',
        color: Colors.mango,
        iconName: 'users',
        screenName: ''
    },
    {
        name: 'Logout',
        color: Colors.mango,
        iconName: 'power-off',
        screenName: 'logout'
    },
  ],
  aggregate: [
    {
        name: 'My Home',
        color: Colors.mango,
        iconName: 'home',
        screenName: NavigationRouteNames.NEW_ORDER_REQUEST
    },
    {
        name: 'Order Summary',
        color: Colors.mango,
        iconName: 'download',
        screenName: ''
    },
    {
        name: 'Profile',
        color: Colors.mango,
        iconName: 'edit',
        screenName: ''
    },
    {
        name: 'Inventory',
        color: Colors.mango,
        iconName: 'th-large',
        screenName: ''
    },
    {
        name: 'Users',
        color: Colors.mango,
        iconName: 'tasks',
        screenName: ''
    },
    {
        name: 'Work Orders',
        color: Colors.mango,
        iconName: 'snowflake-o',
        screenName: ''
    },
    {
        name: 'Smart Contracts',
        color: Colors.mango,
        iconName: 'users',
        screenName: ''
    },
    {
        name: 'Logout',
        color: Colors.mango,
        iconName: 'power-off',
        screenName: 'logout'
    },
  ],
  recycler: [
    {
        name: 'My Home',
        color: Colors.mango,
        iconName: 'home',
        screenName: NavigationRouteNames.NEW_ORDER_REQUEST
    },
    {
        name: 'Work Orders',
        color: Colors.mango,
        iconName: 'download',
        screenName: ''
    },
    {
        name: 'Profile',
        color: Colors.mango,
        iconName: 'edit',
        screenName: ''
    },
    {
        name: 'Inventory',
        color: Colors.mango,
        iconName: 'th-large',
        screenName: ''
    },
    {
        name: 'Users',
        color: Colors.mango,
        iconName: 'tasks',
        screenName: ''
    },
    {
        name: 'Smart Contracts',
        color: Colors.mango,
        iconName: 'snowflake-o',
        screenName: ''
    },
    {
        name: 'Logout',
        color: Colors.mango,
        iconName: 'power-off',
        screenName: 'logout'
    },
  ],
  EPR: [
    {
        name: 'My Home',
        color: Colors.mango,
        iconName: 'home',
        screenName: NavigationRouteNames.NEW_ORDER_REQUEST
    },
    {
        name: 'Order Summary',
        color: Colors.mango,
        iconName: 'download',
        screenName: ''
    },
    // {
    //     name: 'Manage Orders',
    //     color: Colors.mango,
    //     iconName: 'edit',
    //     screenName: ''
    // },
    // {
    //     name: 'Manage EPR',
    //     color: Colors.mango,
    //     iconName: 'th-large',
    //     screenName: ''
    // },
    // {
    //     name: 'Manage Sub Category',
    //     color: Colors.mango,
    //     iconName: 'tasks',
    //     screenName: ''
    // },
    // {
    //     name: 'Manage Jayde Users',
    //     color: Colors.mango,
    //     iconName: 'snowflake-o',
    //     screenName: ''
    // },
    {
        name: 'Profile',
        color: Colors.mango,
        iconName: 'users',
        screenName: ''
    },
    {
        name: 'Logout',
        color: Colors.mango,
        iconName: 'power-off',
        screenName: 'logout'
    },
  ],

};

const USERS_ROLE_MENU = {
  seller: [
    {
      menuName: "Create Order",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      iconName: 'pencil',
      color: Colors.mango,
      screenName: NavigationRouteNames.NEW_ORDER,
    },
    {
      menuName: "Existing Order",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      iconName: 'pencil',
      color: Colors.mango,
      screenName: "",
    }
  ],
  admin: [
    {
      menuName: "Logout",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      menu2image: require("../assets/Images/Dashboard/Project.png"),
      color: Colors.mango,
      screenName: "Logout",
    },
  ],
  aggregate: [
    {
      menuName: "View New Order",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      iconName: 'pencil',
      color: Colors.mango,
      screenName: "",
    },
    {
      menuName: "Open Scheduled Order",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      iconName: 'folder-open',
      color: Colors.mango,
      screenName: "",
    },
    {
      menuName: "View Completed Order",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      iconName: 'check-circle',
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
  recycler: [{
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

const STATUS_ICON = {
  Pending: { iconName: 'clock-o', color: Colors.grayThree },
  'In Transit': { iconName: 'truck', color: Colors.grayThree },
  Completed: { iconName: 'check-circle', color: Colors.green },
};

export { USER_ROLE, USERS_ROLE_MENU, STATUS_ICON, DRAWER_MENU };
