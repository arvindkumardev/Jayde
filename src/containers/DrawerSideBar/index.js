/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import FAIcon from "react-native-vector-icons/FontAwesome";
import { Colors, AppStyles } from '../../theme';
import NavigationRouteNames from "../../routes/ScreenNames";
import Styles from "./styles";
import { removeData, getSaveData } from '../../utils/helpers';
import { LOCAL_STORAGE_DATA_KEY } from '../../utils/constants';
import UserContext from '../../appContainer/context/user.context';
import { DRAWER_MENU } from "../../routes/constants";

import newLocal from '../../assets/Images/Login/Mask_Group_28.png';

const DrawerSideBar = (props) => {
    const [name, setName] = useState("");
    const { navigation } = props;
    const { userRole, setLogin, setUserObj } = useContext(UserContext);

    useEffect(() => {
        async function getUserName() {
            const username = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_NAME);
            setName(username)
        }
        getUserName();
    }, [userRole]);

    const viewProfile = () => {
        navigation.navigate(NavigationRouteNames.UPDATE_PROFILE);
    }

    const handleUserLogout = async () => {
        await removeData(LOCAL_STORAGE_DATA_KEY.JWT_TOKEN);
        await removeData(LOCAL_STORAGE_DATA_KEY.USER_ROLE);
        // await removeData(LOCAL_STORAGE_DATA_KEY.USER_NAME);
        setLogin(false);
    };
    const onNavigation = (screenName) => {
        if (screenName === 'logout') {
            handleUserLogout();
        } else {
            navigation.navigate(screenName)
        }
    }
    const onRenderMenu = (index, item) => {
        return (
            <View key={index} style={Styles.menuItemContainer}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => onNavigation(item.screenName)}>
                    <View style={{ flexDirection: 'row' }}>
                        <FAIcon name={item.iconName} size={20} style={AppStyles.mr20} color={item.color} />
                        <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f16]}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <View style={Styles.userSectionContainer}>
                    <View style={[AppStyles.ml10, AppStyles.mr10]}>
                        <Image source={newLocal} width={50} height={50} />
                    </View>
                    <View style={[AppStyles.flex1, AppStyles.mr10]}>
                        <Text style={[AppStyles.txtBlackBold, AppStyles.f18,]}>{name}</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => { viewProfile() }}>
                            <Text style={AppStyles.txtSecandaryRegular}>View Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={DRAWER_MENU[userRole]}
                    renderItem={({ index, item }) => onRenderMenu(index, item)}
                />
            </View>
        </ScrollView>
    )
}

export default DrawerSideBar;