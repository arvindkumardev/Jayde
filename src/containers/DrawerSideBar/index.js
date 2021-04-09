/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { FlatList, View, Text, TouchableOpacity, Image,  } from 'react-native';
import FAIcon from "react-native-vector-icons/FontAwesome";
import { Colors, AppStyles } from '../../theme';
import NavigationRouteNames from "../../routes/ScreenNames";
import Styles from "./styles";
import { removeData } from '../../utils/helpers';
import { LOCAL_STORAGE_DATA_KEY } from '../../utils/constants';
import UserContext from '../../appContainer/context/user.context';
import { DRAWER_MENU } from "../../routes/constants";

const newLocal = '../../assets/Images/Login/Mask_Group_28.png';
const DrawerSideBar = (props) => {
    const { navigation } = props;
    const { userRole, setLogin } = useContext(UserContext);

    const handleUserLogout = async () => {
        await removeData(LOCAL_STORAGE_DATA_KEY.JWT_TOKEN);
        await removeData(LOCAL_STORAGE_DATA_KEY.USER_ROLE);
        setLogin(false);
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
                data={DRAWER_MENU[userRole]}
                renderItem={onRenderMenu}
            />
        </View>
    )
}

export default DrawerSideBar;