import React, { useContext } from 'react';
import { Colors, Fonts, AppStyles } from "./../theme";
import { Platform, TouchableOpacity, View, Text, Image } from 'react-native';

//Image
import NoRecordImg from '../assets/Images/NoRecord/NoRecordFound.png'

const EmptyView = (props) => {
    return (
        <View style={[AppStyles.topView, AppStyles.alignCenter, AppStyles.justifyCon]}>
            <Image style={{width: 247, height: 212,}} source={NoRecordImg}  />
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt25]}>No Record Found</Text>

            <TouchableOpacity
                onPress = {() => props.onBack()}
                style={[AppStyles.mt40, AppStyles.br10, AppStyles.btnPrimary, AppStyles.pv5, AppStyles.ph10, AppStyles.alignCenter, AppStyles.NoRecordButton]}>
                <Text style={[AppStyles.txtWhiteRegular, AppStyles.f17, AppStyles.mt5]}>GO TO HOME</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EmptyView