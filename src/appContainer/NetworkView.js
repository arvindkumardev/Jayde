import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import NetworkCloud from '../assets/Images/error_internet.png';
import { Colors, Fonts, AppStyles } from "../theme";

const NetworkView = (props) => {
    return (
        <View style={[AppStyles.flex1, AppStyles.inCenter, AppStyles.whitebackgrnd, AppStyles.pv20, AppStyles.ph20]}>
            <Image source={NetworkCloud} style={AppStyles.imgCloud} />
            <Text style={[AppStyles.txtBlackBold, AppStyles.f16, AppStyles.pv20]}>No Connection</Text>
            <Text style={[AppStyles.txtBlackRegular, AppStyles.ph40, AppStyles.textalig, { color: Colors.grey2 }]}>Please check your internet connectivity and try again</Text>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => props.Retry && props.Retry()}
                style={[AppStyles.mt40, AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv5, AppStyles.ph20, AppStyles.inCenter]}>
                <Text style={[AppStyles.txtWhiteBold, AppStyles.f16]}> Retry </Text>
            </TouchableOpacity>
        </View>
    );
}
export default NetworkView;