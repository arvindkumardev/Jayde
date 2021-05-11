/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import FAIcon from "react-native-vector-icons/FontAwesome";
import { Colors, AppStyles } from '../../theme';
import NavigationRouteNames from "../../routes/ScreenNames";
import Styles from "./styles";
import { removeData, getSaveData } from '../../utils/helpers';
import { LOCAL_STORAGE_DATA_KEY } from '../../utils/constants';
import UserContext from '../../appContainer/context/user.context';
import { DRAWER_MENU } from "../../routes/constants";
// import React, { useContext, useEffect } from "react";

const newLocal = '../../assets/Images/Login/Mask_Group_28.png';


const DrawerSideBar = (props) => {
    const [name,setName] = useState("");
    const { navigation } = props;
    const { userRole, setLogin, setUserObj } = useContext(UserContext);
    //console.log("userdata",JSON.stringyfy(setUserObj))
   
    useEffect(() => {
        async function getUserName () {
            const username = await getSaveData (LOCAL_STORAGE_DATA_KEY.USER_NAME);          
            setName(username)
        }     
        getUserName();
    }, []);
     

    const handleUserLogout = async () => {
        await removeData(LOCAL_STORAGE_DATA_KEY.JWT_TOKEN);
        await removeData(LOCAL_STORAGE_DATA_KEY.USER_ROLE);
        // await removeData(LOCAL_STORAGE_DATA_KEY.USER_NAME);
        setLogin(false); // Error Here
      };
    const onNavigation = (screenName) => {
        if(screenName === 'logout'){
            handleUserLogout();
        }
        else{
            navigation.navigate(screenName)
        }
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
        <ScrollView>
        <View>
            <View style={Styles.userSectionContainer}>
                <View style={[AppStyles.ml10, AppStyles.mr10]}>
                    <Image source={require(newLocal)} width={50} height={50} />
                </View>
                <View>
                    <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>{name}</Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={AppStyles.txtSecandaryRegular}>View Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={DRAWER_MENU[userRole]}
                renderItem={onRenderMenu}
            />
        </View>
        </ScrollView>
    )
}

export default DrawerSideBar;