
import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

import { AppStyles, Colors } from '../../../theme';
import { displayShortDate, formatDisplayDate } from './../../../utils/helpers';

//Image
import FAIcon from 'react-native-vector-icons/FontAwesome';

import EWasteImg from '../../../assets/Images/NewOrderList/Group_10091.png'
import PaperImg from '../../../assets/Images/NewOrderList/Group_10089.png'
import PlasticImg from '../../../assets/Images/NewOrderList/Group_10090.png'
import MixWasterImg from '../../../assets/Images/NewOrderList/Group_10088.png'
import PendingImg from '../../../assets/Images/AddSubUser/pending.png'
import CompletedImg from '../../../assets/Images/Dashboard/Group_9995.png'

const ORDER_IMAGE = {
    'E-Waste': EWasteImg,
    Paper: PaperImg,
    Plastic: PlasticImg,
    'Mix Waste': MixWasterImg,
};

const getStatusText = (item) => {
    if (item.is_completed == null) {
        if (item.proposed_weight_confirm == '1' && item.new_weight !== null) {
            return 'Proposed Weight Confirmed'
        }

        if (item.is_seller_confirmed == '3') {
            return 'Payment Confirmed'
        }

        if (item.proposed_weight_confirm == '2') {
            return 'Proposed Weight Sent'
        }
        return 'Pending'
    } else {
        return 'Completed'
    }
}

function ItemRow(props) {
    let { item, index, screenNavigate, userRole } = props
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={[AppStyles.cardStyle, AppStyles.shadow, AppStyles.whitebackgrnd, AppStyles.pv11]}
            onPress={() => screenNavigate(item)}>
            <View style={[AppStyles.flexDir, AppStyles.ph10]}>
                <View style={[AppStyles.flexpointtwo]}>
                    <Image source={ORDER_IMAGE[item.category_name]} />
                </View>

                <View style={[AppStyles.flexpointfive, AppStyles.ml16]}>
                    <Text style={[AppStyles.txtBlackRegular, AppStyles.f17,]}>{item.order_no}</Text>
                    <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15,]}>{item.qty}  {item.unit_name}  {item.category_name}</Text>
                    <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11,]}>{displayShortDate(item.pickup_date)}</Text>
                </View>

                {item.assigned_status == '1' ?
                    <View style={[AppStyles.flexpointthree, AppStyles.mt5, AppStyles.inCenter]}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => screenNavigate(item)}
                            style={AppStyles.confirmBtnSmall}>
                            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f11, AppStyles.textalig]}>VIEW</Text>
                        </TouchableOpacity>
                        <Image style={[AppStyles.mt5]} source={item.is_completed == null ? PendingImg : CompletedImg} />
                        <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11, AppStyles.textalig]}>{getStatusText(item)}</Text>
                    </View>
                    :
                    <View style={[AppStyles.flexpointthree, AppStyles.mt5, AppStyles.inCenter]}>
                        <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11, AppStyles.textalig]}>Seller Confirmation Pending</Text>
                    </View>
                }
            </View>
        </TouchableOpacity>
    )
}
export default ItemRow;