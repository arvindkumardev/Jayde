import React, { useContext } from 'react';
import { Colors, Fonts, AppStyles } from "./../theme";
import { Platform, TouchableOpacity, View, Text, Image } from 'react-native';


const EmptyView = (props) => {
    return (
        <View style={[AppStyles.topView, AppStyles.alignCenter, AppStyles.justifyCon]}>
            <Text style={AppStyles.txtBlackRegular, AppStyles.f16}>No Record Found</Text>

            <TouchableOpacity
                onPress = {() => props.onBack()}
                style={[AppStyles.mt30, AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv5, AppStyles.ph10, AppStyles.alignCenter]}>
                <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17]}>Go TO HOME</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EmptyView