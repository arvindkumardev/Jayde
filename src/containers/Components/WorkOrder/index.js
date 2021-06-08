
import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

import { AppStyles, Colors } from '../../../theme';
import { displayShortDate } from './../../../utils/helpers';

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
    if (item.paid_amount != null && item.is_seller_confirmed == 0) {
        return 'Waiting for Confirmation'
    }

    if (item.paid_amount != null && item.is_seller_confirmed == 1) {
        return 'Confirmed'
    }

    if (item.paid_amount == null && item.is_seller_confirmed == 0) {
        return 'View'
    }
}

function ItemRow(props) {
    let { item, index, screenNavigate, userRole } = props
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={[AppStyles.cardStyle, AppStyles.shadow, AppStyles.whitebackgrnd, AppStyles.pv15]}
            onPress={() => screenNavigate(item)}>
            <View style={[AppStyles.flexDir]}>
                <View style={[AppStyles.flexpointtwo, AppStyles.ml5]}>
                    <Image source={ORDER_IMAGE[item.category_name]} style={AppStyles.imgOrders} />
                </View>
                <View style={[AppStyles.flexpointfive, AppStyles.ml16]}>
                    <Text style={[AppStyles.txtBlackRegular, AppStyles.f17, AppStyles.mt5]}>{item.work_order_no}</Text>
                    <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt2]}>{item.work_qty} {item.unit_name} {item.category_name}</Text>
                    <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11, AppStyles.mt2]}>{displayShortDate(item.pickup_date)}</Text>
                    {/* <View style={[AppStyles.flexRowAlignCenter, AppStyles.mr20]}>
                        <FAIcon size={11} name='rupee' color={Colors.warmGrey}></FAIcon>
                        <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f12, AppStyles.ml5]}>{item.work_price} / {item.price_unit}</Text>
                    </View> */}
                </View>
                <View style={[AppStyles.flexpointthree, AppStyles.inCenter]}>
                    <View style={[AppStyles.flexRowAlignCenter]}>
                        <FAIcon size={14} name='rupee'></FAIcon>
                        <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.ml5]}>{item.work_sub_total}</Text>
                    </View>
                    <Image style={[AppStyles.mt5]} source={item.is_seller_confirmed == 0 ? PendingImg : CompletedImg} />
                    {item.paid_amount == null && item.is_seller_confirmed == 0 ?
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => screenNavigate(item)}
                            style={[AppStyles.confirmBtnSmall, AppStyles.mt5]}>
                            <Text style={[AppStyles.txtWhiteRegular, AppStyles.f11,
                            AppStyles.textalig,]}> View </Text>
                        </TouchableOpacity>
                        :
                        <View style={AppStyles.emptyHeight}>
                            <Text style={[AppStyles.txtPrimaryRegular, AppStyles.f11, AppStyles.mt5, AppStyles.textalig, AppStyles.ph10]}>{getStatusText(item)}</Text>
                        </View>
                    }
                </View>
            </View>

        </TouchableOpacity>
    )
}

export default ItemRow;