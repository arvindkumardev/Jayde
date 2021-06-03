import React, { useContext } from 'react';
import { Colors, Fonts, AppStyles } from "./../theme";
import { Platform, TouchableOpacity, View, Text, Image } from 'react-native';

//Image
import NoRecordImg from './../assets/Images/NoRecord/NoRecordFound.png'

const EmptyView = (props) => {
    return (
        <View style={[AppStyles.topView, AppStyles.alignCenter, AppStyles.justifyCon]}>
            <Image source={NoRecordImg} style = {AppStyles.imgEmpty}/>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt25]}>No Record Found</Text>
            <TouchableOpacity
                activeOpacity = {0.8}
                onPress={() => props.onBack()}
                style={[AppStyles.mt40, AppStyles.br10, AppStyles.btnPrimary, AppStyles.btnHeight44, AppStyles.ph10, AppStyles.NoRecordButton, AppStyles.inCenter]}>
                <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17]}>GO TO HOME</Text>
            </TouchableOpacity>
        </View>
    )
}
export default EmptyView