import IconWrapper from '../components/IconWrapper';
import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '../theme';
import Images from '../theme/Images';
import {RfH, RfW} from '../utils/helpers';
import NavigationRouteNames from './ScreenNames';
import {View} from 'react-native';
import styles from './styles';
import CommingSoon from '../containers/ComingSoon';

const BottomTab = createBottomTabNavigator();
const BottomTabStack = () => {
  return (
    <BottomTab.Navigator
      initialRouteName={NavigationRouteNames.HOME}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === NavigationRouteNames.HOME) {
            iconName = focused
              ? Images.homeActiveIcon
              : Images.homeInActiveIcon;
          } else if (route.name === NavigationRouteNames.APPROVAL) {
            iconName = focused
              ? Images.approvalActiveIcon
              : Images.approvalInactiveIcon;
          } else if (route.name === NavigationRouteNames.Offers) {
            iconName = focused
              ? Images.offerActiveIcon
              : Images.offerInActiveIcon;
          } else if (route.name === NavigationRouteNames.PROFILE) {
            iconName = focused
              ? Images.profileActiveIcon
              : Images.profileInactiveIcon;
          }
          return (
            <View style={focused ? styles.tabIconActiveShadow : {}}>
              <IconWrapper
                iconImage={iconName}
                iconWidth={RfW(21.2)}
                iconHeight={RfH(19.7)}
              />
            </View>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.blue,
        inactiveTintColor: Colors.grey,
        labelStyle: {
          fontWeight: '600',
          fontStyle: 'normal',
          marginTop: RfH(12),
          alignSelf: 'center',
        },
        labelPosition: 'below-icon',
        style: {
          paddingTop: RfH(24),
          paddingBottom: RfH(20),
          height: RfH(84),
          backgroundColor: Colors.white,
        },
      }}>
      <BottomTab.Screen
        name={NavigationRouteNames.HOME}
        options={{tabBarLabel: 'Home'}}
        component={CommingSoon}
      />

      <BottomTab.Screen
        name={NavigationRouteNames.Offers}
        options={{tabBarLabel: 'Offers'}}
        component={CommingSoon}
      />
        <BottomTab.Screen
          name={NavigationRouteNames.APPROVAL}
          options={{tabBarLabel: 'Approvals'}}
          component={CommingSoon}
        />

      <BottomTab.Screen
        name={NavigationRouteNames.PROFILE}
        options={{tabBarLabel: 'Profile'}}
        component={CommingSoon}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabStack;
