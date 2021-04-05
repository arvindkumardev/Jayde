/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */

import NavigationRouteNames from './ScreenNames';
import { Colors } from '../theme';

const USER_ROLE = {
    SELLER: "seller",
    ADMIN: "admin",
    AGGRATOR: "aggrator",
    RECYCLER: "recycler",
    EPR: "EPR"
}

const USERS_ROLE_MENU = {
    SELLER: [
      {
        menuname: 'Create Order',
        menu1image: require('../assets/Images/Dashboard/Group_9551.png'),
        menu2image: require('../assets/Images/Dashboard/Icon_ionic-md-create.png'),
        color: Colors.mango,
        screenName: NavigationRouteNames.NEW_ORDER,
      },
      {
        menuname: 'Existing Order',
        menu1image: require('../assets/Images/Dashboard/Group_9551.png'),
        menu2image: require('../assets/Images/Dashboard/Project.png'),
        color: Colors.mango,
        screenName: '',
      },
      {
        menuname: 'Profile',
        menu1image: require('../assets/Images/Dashboard/Group_9551.png'),
        menu2image: require('../assets/Images/Dashboard/Project.png'),
        color: Colors.mango,
        screenName: '',
      },
      {
        menuname: 'Logout',
        menu1image: require('../assets/Images/Dashboard/Group_9551.png'),
        menu2image: require('../assets/Images/Dashboard/Project.png'),
        color: Colors.mango,
        screenName: 'Logout',
      },
    ],
    ADMIN: [],
    AGGRATOR: [
      {
        menuname: 'View New Order',
        menu1image: require('../assets/Images/Dashboard/Group_9551.png'),
        menu2image: require('../assets/Images/Dashboard/Icon_ionic-md-create.png'),
        color: Colors.mango,
        screenName: '',
      },
      {
        menuname: 'Open Scheduled Order',
        menu1image: require('../assets/Images/Dashboard/Group_9551.png'),
        menu2image: require('../assets/Images/Dashboard/Icon_ionic-md-create.png'),
        color: Colors.mango,
        screenName: '',
      },
      {
        menuname: 'View Completed Order',
        menu1image: require('../assets/Images/Dashboard/Group_9551.png'),
        menu2image: require('../assets/Images/Dashboard/Icon_ionic-md-create.png'),
        color: Colors.green,
        screenName: '',
      },
    ],
    RECYCLER: [],
    EPR: [],
  };
  
export { USER_ROLE, USERS_ROLE_MENU };