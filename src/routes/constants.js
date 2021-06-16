/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */

import NavigationRouteNames from "./ScreenNames";
import { Colors } from "../theme";
import pencilIcon from "../assets/Images/Dashboard/Group_9551.png"

const USER_ROLE = {
  SELLER: "seller",
  ADMIN: "admin",
  AGGRATOR: "aggregate",
  RECYCLER: "recycler",
  DRCC: "drcc",
  SCHOOL: 'school',
  EPR: "epr",
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
    // {
    //   name: 'Smart Contracts',
    //   color: Colors.mango,
    //   iconName: 'sticky-note',
    //   screenName: NavigationRouteNames.SMART_CONTRACT
    // },
    {
      name: 'Logout',
      color: Colors.mango,
      iconName: 'power-off',
      screenName: 'logout'
    },
  ],
  school: [
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
    // {
    //   name: 'Smart Contracts',
    //   color: Colors.mango,
    //   iconName: 'sticky-note',
    //   screenName: NavigationRouteNames.SMART_CONTRACT
    // },
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
      screenName: NavigationRouteNames.PROFILE_UPDATE
    },
    {
      name: 'Download Report',
      color: Colors.mango,
      iconName: 'download',
      screenName: NavigationRouteNames.DOWNLOAD_REPORT,
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

    // {
    //   name: 'Smart Contracts',
    //   color: Colors.mango,
    //   iconName: 'sticky-note',
    //   screenName: NavigationRouteNames.SMART_CONTRACT
    // },
    {
      name: 'Logout',
      color: Colors.mango,
      iconName: 'power-off',
      screenName: 'logout'
    },
  ],
  drcc: [
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

    // {
    //   name: 'Smart Contracts',
    //   color: Colors.mango,
    //   iconName: 'sticky-note',
    //   screenName: NavigationRouteNames.SMART_CONTRACT
    // },
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
    //   screenName: NavigationRouteNames.INVENTORY
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
    // {
    //   name: 'Smart Contracts',
    //   color: Colors.mango,
    //   iconName: 'sticky-note',
    //   screenName: NavigationRouteNames.SMART_CONTRACT
    // },
    {
      name: 'Logout',
      color: Colors.mango,
      iconName: 'power-off',
      screenName: 'logout'
    },
  ],
  epr: [
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
      screenName: NavigationRouteNames.UPDATE_PROFILE
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
      menuName: "NEW ORDER",
      subMenuName: "View New Orders",
      menu1image: pencilIcon,
      iconName: 'pencil',
      color: Colors.mango,
      screenName: NavigationRouteNames.NEW_ORDER,
    },
    {
      menuName: "EXISTING",
      subMenuName: "View Existing Orders",
      menu1image: pencilIcon,
      iconName: 'folder-open',
      color: Colors.mango,
      screenName: NavigationRouteNames.SELLER_MY_ORDER,
    }
  ],
  school: [
    {
      menuName: "NEW ORDER",
      subMenuName: "View New Orders",
      menu1image: pencilIcon,
      iconName: 'pencil',
      color: Colors.mango,
      screenName: NavigationRouteNames.NEW_ORDER,
    },
    {
      menuName: "EXISTING",
      subMenuName: "View Existing Orders",
      menu1image: pencilIcon,
      iconName: 'folder-open',
      color: Colors.mango,
      screenName: NavigationRouteNames.SELLER_MY_ORDER,
    }
  ],
  admin: [
    {
      menuName: "NEW ORDER",
      subMenuName: "View New Orders",
      menu1image: pencilIcon,
      iconName: 'pencil',
      color: Colors.mango,
      screenName: NavigationRouteNames.ADMIN_NEW_ORDER_LIST,
    },
  ],
  aggregate: [
    {
      menuName: "NEW ORDER",
      subMenuName: "View New Orders",
      menu1image: pencilIcon,
      iconName: 'pencil',
      color: Colors.mango,
      screenName: NavigationRouteNames.AGGREGATOR_NEW_ORDERS,
    },
    {
      menuName: "SCHEDULED",
      subMenuName: "View Scheduled Orders",
      menu1image: pencilIcon,
      iconName: 'folder-open',
      color: Colors.mango,
      screenName: NavigationRouteNames.AGGREGATOR_SCHEDULE_ORDER_LIST,
    },
    {
      menuName: "COMPLETED",
      subMenuName: "View Completed Work Orders",
      menu1image: pencilIcon,
      iconName: 'check-circle',
      color: Colors.green,
      screenName: NavigationRouteNames.COMPLETED_ORDER,
    }
  ],
  drcc: [
    {
      menuName: "NEW ORDER",
      subMenuName: "View New Orders",
      menu1image: pencilIcon,
      iconName: 'pencil',
      color: Colors.mango,
      screenName: NavigationRouteNames.AGGREGATOR_NEW_ORDERS,
    },
    {
      menuName: "SCHEDULED",
      subMenuName: "View Scheduled Orders",
      menu1image: pencilIcon,
      iconName: 'folder-open',
      color: Colors.mango,
      screenName: NavigationRouteNames.AGGREGATOR_SCHEDULE_ORDER_LIST,
    },
    {
      menuName: "COMPLETED",
      subMenuName: "View Completed Work Orders",
      menu1image: pencilIcon,
      iconName: 'check-circle',
      color: Colors.green,
      screenName: NavigationRouteNames.COMPLETED_ORDER,
    }
  ],
  recycler: [{
    menuName: "WORK ORDER",
    subMenuName: "View Work Orders",
    menu1image: pencilIcon,
    iconName: 'pencil',
    color: Colors.mango,
    screenName: NavigationRouteNames.RECYCLER_WORK_ORDER_LIST,
  }],
  epr: [{
    menuName: "NEW ORDER",
    subMenuName: "View New Orders",
    menu1image: pencilIcon,
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
