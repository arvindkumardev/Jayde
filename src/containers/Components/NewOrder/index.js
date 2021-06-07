
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

const getButtonText = (item) => {
    if (item.assigned_status == 2) {
        return 'Rescheduled';
    } else if (item.proposed_weight_confirm == 2) {
        return 'New Weight Proposed';
    } else if (item.is_seller_confirmed == 2) {
        return 'Confirm Payment';
    } else if (item.pickup_confirmed == 1) {
        return 'COMPLETED';
    } else if (item.is_confirmed == 2) {
        return 'SCHEDULED';
    } else if (item.is_confirmed == 3) {
        return 'ACCEPTED';
    } else if (item.is_confirmed == 4) {
        return 'Rejected';
    }
}

const getActionView = (item, userRole, props) => {
    switch (userRole) {
        case 'seller':
            var btnText = getButtonText(item)
            return (
                <View style={[AppStyles.flexpointthree, AppStyles.inCenter]}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => props.screenNavigate(item)}
                        style={AppStyles.itemBtn}>
                        <Text style={[AppStyles.txtWhiteRegular, AppStyles.f11,
                        AppStyles.textalig,]}>{item.assigned_status == 2 ? 'Confirm' : 'View Order'}</Text>
                    </TouchableOpacity>
                    <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11,
                    AppStyles.mt10, AppStyles.textalig,
                    {
                        color: btnText === 'ACCEPTED' ? Colors.warmGrey
                            : btnText === 'COMPLETED' ? Colors.warmGrey
                                : btnText === 'SCHEDULED' ? Colors.warmGrey
                                    : Colors.red
                    }]}>{btnText}</Text>
                </View>
            )
        case 'recycler':
            return (
                <View style={[AppStyles.flexpointthree, AppStyles.inCenter]}>
                    <View style={[AppStyles.flexRowAlignCenter]}>
                        <FAIcon size={14} name='rupee'></FAIcon>
                        <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.ml5]}>{item.price}</Text>
                    </View>
                </View>
            )

        case 'aggregate':
            return (
                <View style={[AppStyles.flexpointthree, AppStyles.inCenter]}>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => props.screenNavigate(item)}
                        style={AppStyles.itemBtn}>
                        <Text style={[AppStyles.txtWhiteRegular, AppStyles.f11, AppStyles.textalig,]}>{item.is_confirmed == 2 ? 'VIEW' : 'ACCEPT'}</Text>
                    </TouchableOpacity>
                    <Image style={AppStyles.mt5} source={PendingImg} />
                    <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11, AppStyles.textalig]}>{item.reschedule_confirmed == '1' ? 'Re-schedule Confirmed' : 'Pending'}</Text>

                </View>
            )

        case 'admin':
            return (
                <View style={[AppStyles.flexpointthree, AppStyles.inCenter]}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => props.screenNavigate(item)}
                        style={AppStyles.confirmBtnSmall}>
                        <Text style={[AppStyles.txtWhiteRegular, AppStyles.f11,
                        AppStyles.textalig]}>{item.is_confirmed == 2 ? 'ASSIGN' : 'VIEW'}</Text>
                    </TouchableOpacity>
                    {item.is_confirmed == 4 ?
                        <View style={AppStyles.inCenter}>
                            <Image style={[AppStyles.mt10]}
                                source={CompletedImg} />
                            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11]}>Completed</Text>
                        </View> : item.is_confirmed == 3 &&
                        <View  style={AppStyles.inCenter}>
                            <Image style={[AppStyles.mt10]}
                                source={PendingImg} />
                            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11]}>Pending</Text>
                        </View>
                    }
                </View>
            )
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

            <View style={[AppStyles.flexDir]}>
                <View style={[AppStyles.flexpointtwo, AppStyles.ml5]}>
                    <View>
                        <Image source={ORDER_IMAGE[item.category_name]} />
                    </View>
                </View>
                <View style={[AppStyles.flexpointfive, AppStyles.ml16]}>
                    <Text style={[AppStyles.txtBlackRegular, AppStyles.f17,]}>{item.order_no}</Text>
                    <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15,]}>{item.qty} {item.unit_name} {item.category_name}</Text>
                    <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f11,]}>{displayShortDate(item.pickup_date)}</Text>
                </View>
                {getActionView(item, userRole, props)}
            </View>
        </TouchableOpacity>
    )
}

export default ItemRow;