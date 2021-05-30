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
      screenName: NavigationRouteNames.HOME_SCREEN
    },
    {
      name: 'Profile',
      color: Colors.mango,
      iconName: 'user',
      screenName: NavigationRouteNames.UPDATE_PROFILE
    },
    {
      name: 'New Order',
      color: Colors.mango,
      iconName: 'folder-open',
      screenName: NavigationRouteNames.NEW_ORDER
      // screenName: NavigationRouteNames.CONFIRM_ADDRESS

    },
    {
      name: 'My Orders',
      color: Colors.mango,
      iconName: 'folder',
      screenName: NavigationRouteNames.SELLER_MY_ORDER
    },
    {
      name: 'Users',
      color: Colors.mango,
      iconName: 'users',
      screenName: NavigationRouteNames.ADD_SUBUSER
    },
    {
      name: 'Contact Jayde',
      color: Colors.mango,
      iconName: 'phone-square',
      screenName: NavigationRouteNames.CALL_REQUEST
    },
    {
      name: 'Smart Contracts',
      color: Colors.mango,
      iconName: 'sticky-note',
      screenName: NavigationRouteNames.SMART_CONTRACT
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
      screenName: NavigationRouteNames.HOME_SCREEN
    },
    {
      name: 'Profile',
      color: Colors.mango,
      iconName: 'user',
      screenName: NavigationRouteNames.UPDATE_PROFILE
    },
    {
      name: 'Download Report',
      color: Colors.mango,
      iconName: 'download',
      screenName: '',
    },
    {
      name: 'Manage Orders',
      color: Colors.mango,
      iconName: 'edit',
      screenName: NavigationRouteNames.ADMIN_NEW_ORDER_LIST

    },
    {
      name: 'Manage EPR',
      color: Colors.mango,
      iconName: 'th-large',
      screenName: NavigationRouteNames.MANAGE_EPR
    },
    {
      name: 'Manage Sub Category',
      color: Colors.mango,
      iconName: 'tasks',
      screenName: NavigationRouteNames.SUBCATEGORY_DETAILS
    },
    {
      name: 'Manage Provisional Pricing',
      color: Colors.mango,
      iconName: 'tasks',
      screenName: NavigationRouteNames.PROVISIONAL_PRICING
    },
    {
      name: 'Manage Jayde Users',
      color: Colors.mango,
      iconName: 'snowflake-o',
      screenName: NavigationRouteNames.USERS
    },
    {
      name: 'Users',
      color: Colors.mango,
      iconName: 'users',
      screenName: NavigationRouteNames.ADD_SUBUSER
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
      screenName: NavigationRouteNames.HOME_SCREEN
    },
    {
      name: 'Profile',
      color: Colors.mango,
      iconName: 'user',
      screenName: NavigationRouteNames.UPDATE_PROFILE
    },
    {
      name: 'New Order',
      color: Colors.mango,
      iconName: 'pencil',
      screenName: NavigationRouteNames.AGGREGATOR_NEW_ORDERS,
    },
   
    {
      name: 'Scheduled Order',
      color: Colors.mango,
      iconName: 'wpforms',
      screenName: NavigationRouteNames.AGGREGATOR_SCHEDULE_ORDER_LIST
    },
  
    {
      name: 'Inventory',
      color: Colors.mango,
      iconName: 'archive',
      screenName: NavigationRouteNames.INVENTORY
    },
    {
      name: 'Work Orders',
      color: Colors.mango,
      iconName: 'folder',
      screenName: NavigationRouteNames.AGGREGATOR_WORK_ORDER_LIST
    },

    {
      name: 'Completed Order',
      color: Colors.mango,
      iconName: 'folder',
      screenName: NavigationRouteNames.COMPLETED_ORDER
    },
    
    {
      name: 'Users',
      color: Colors.mango,
      iconName: 'users',
      screenName: NavigationRouteNames.ADD_SUBUSER
    },

    {
      name: 'Smart Contracts',
      color: Colors.mango,
      iconName: 'sticky-note',
      screenName: NavigationRouteNames.SMART_CONTRACT
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
      screenName: NavigationRouteNames.HOME_SCREEN
    },
    {
      name: 'Profile',
      color: Colors.mango,
      iconName: 'user',
      screenName: NavigationRouteNames.UPDATE_PROFILE
    },
    {
      name: 'New Orders',
      color: Colors.mango,
      iconName: 'folder',
      screenName: NavigationRouteNames.RECYCLER_NEW_ORDER_LIST
    },

    {
      name: 'Scheduled Order',
      color: Colors.mango,
      iconName: 'wpforms',
      screenName: NavigationRouteNames.RECYCLER_SCHEDULED_ORDER_LIST
    },

    // {
    //   name: 'Inventory',
    //   color: Colors.mango,
    //   iconName: 'archive',
    //   screenName: NavigationRouteNames.RECYCLER_INVENTORY
    // },

    {
      name: 'Work Orders',
      color: Colors.mango,
      iconName: 'folder',
      screenName: NavigationRouteNames.RECYCLER_WORK_ORDER_LIST
    },
    
    {
      name: 'Completed Order',
      color: Colors.mango,
      iconName: 'folder',
      screenName: NavigationRouteNames.COMPLETED_ORDER
    },

    {
      name: 'Users',
      color: Colors.mango,
      iconName: 'users',
      screenName: NavigationRouteNames.ADD_SUBUSER
    },
    {
      name: 'Smart Contracts',
      color: Colors.mango,
      iconName: 'sticky-note',
      screenName: NavigationRouteNames.SMART_CONTRACT
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
      screenName: NavigationRouteNames.HOME_SCREEN
    },
    {
      name: 'Profile',
      color: Colors.mango,
      iconName: 'users',
      screenName: ''
    },
    {
      name: 'Order Summary',
      color: Colors.mango,
      iconName: 'download',
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
      menuName: "New Order",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      iconName: 'pencil',
      color: Colors.mango,
      screenName: NavigationRouteNames.NEW_ORDER,
    },
    {
      menuName: "Existing Order",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      iconName: 'folder-open',
      color: Colors.mango,
      screenName: NavigationRouteNames.SELLER_MY_ORDER,
    }
  ],
  admin: [
    {
      menuName: "New Order",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      iconName: 'pencil',
      color: Colors.mango,
      screenName:  NavigationRouteNames.ADMIN_NEW_ORDER_LIST,
    },
  ],
  aggregate: [
    {
      menuName: "New Order",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      iconName: 'pencil',
      color: Colors.mango,
      screenName: NavigationRouteNames.AGGREGATOR_NEW_ORDERS,
    },
    {
      menuName: "Scheduled Order",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      iconName: 'folder-open',
      color: Colors.mango,
      screenName: NavigationRouteNames.AGGREGATOR_SCHEDULE_ORDER_LIST,
    },
    {
      menuName: "Completed Work Order",
      menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
      iconName: 'check-circle',
      color: Colors.green,
      screenName: NavigationRouteNames.COMPLETED_ORDER,
    }
  ],
  recycler: [{
    menuName: "Work Order",
    menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
    iconName: 'pencil',
    color: Colors.mango,
    screenName: "",
  }],
  EPR: [{
    menuName: "New Order",
    menu1image: require("../assets/Images/Dashboard/Group_9551.png"),
    iconName: 'pencil',
    color: Colors.mango,
    screenName: "",
  }],
};

const STATUS_ICON = {
  Pending: { iconName: 'clock-o', color: Colors.grayThree },
  'In Transit': { iconName: 'truck', color: Colors.grayThree },
  Completed: { iconName: 'check-circle', color: Colors.green },
};

export { USER_ROLE, USERS_ROLE_MENU, STATUS_ICON, DRAWER_MENU };
