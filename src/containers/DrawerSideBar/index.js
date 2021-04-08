/* eslint-disable prettier/prettier */
import React from 'react';
import { FlatList, View, Text, TouchableOpacity, Image } from 'react-native';
import FAIcon from "react-native-vector-icons/FontAwesome";
import { Colors, AppStyles } from '../../theme';
import NavigationRouteNames from "../../routes/ScreenNames";
import Styles from "./styles";

const STATIC_MENU = [
    {
        name: 'My Home',
        color: Colors.mango,
        iconName: 'home',
        screenName: NavigationRouteNames.NEW_ORDER_REQUEST
    },
    {
        name: 'Download Reports',
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
];

const newLocal = '../../assets/Images/Login/Mask_Group_28.png';
const DrawerSideBar = (props) => {
    const { navigation } = props;

    const onNavigation = (screenName) => {
        navigation.navigate(screenName)
    }
    const onRenderMenu = (item) => {
        return (
            <View style={Styles.menuItemContainer}>
                <TouchableOpacity onPress={() => onNavigation(item.item.screenName)}>
                    <View style={{flexDirection:'row'}}>
                        <FAIcon name={item.item.iconName} size={20} style={AppStyles.mr20} color={item.item.color} />
                        <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>{item.item.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View>
            <View style={Styles.userSectionContainer}>
                <View style={[AppStyles.ml10, AppStyles.mr10]}>
                    <Image source={require(newLocal)} width={50} height={50} />
                </View>
                <View>
                    <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>Raj Kumar</Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={AppStyles.txtSecandaryRegular}>View Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={STATIC_MENU}
                renderItem={onRenderMenu}
            />
        </View>
    )
}

export default DrawerSideBar;