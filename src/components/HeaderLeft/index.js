import React, { useContext } from 'react';
import { Colors, Fonts, AppStyles } from "./../../theme";
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NavClose = (props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {props.onClose()}}
            style={[AppStyles.ml12]}><Ionicons name="close" size={28} />
        </TouchableOpacity>
    )
}
export default NavClose