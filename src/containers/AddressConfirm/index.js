import React, {useContext, useEffect, useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    } from 'react-native';
import UserContext from '../Login/user.context';
import {useNavigation, useRoute} from '@react-navigation/native';
import FAIcon from "react-native-vector-icons/FontAwesome";
import Checkbox from "@react-native-community/checkbox";
import Styles from "./styles";
import { Fonts, Colors } from '../../theme';
import NavigationRouteNames from '../../routes/ScreenNames';

const PriceConfirm = () => {
  const { user, setLogin } = useContext(UserContext);
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text style={Styles.headerTxt}>Pickup Address</Text>
    })
  }, [navigation]);

  const handleConfirm = () => {
      navigation.navigate(NavigationRouteNames.PICKUP_DETAILS);
  }
  return (
      <View style={{justifyContent:'space-between', flex: 1, paddingBottom: 20}}>
        <View style={Styles.quoteContainer}>
            <View style={Styles.priceContainer}>
                <Text style={{ fontFamily: Fonts.bold, marginBottom: 10, fontSize: 16}}>Paper</Text>
                <View style={Styles.itemContainer}>
                    <View style={{width:'45%'}}>
                        <Text style={Styles.itemTxt}>Subcategory</Text>
                    </View>
                    <View style={{width:'45%'}}>
                        <Text style={Styles.itemTxt}>Type 2</Text>
                    </View>
                </View>
                <View style={Styles.itemContainer}>
                    <View style={{width:'45%'}}>
                        <Text style={Styles.itemTxt}>Valume</Text>
                    </View>
                    <View style={{width:'45%'}}>
                        <Text style={Styles.itemTxt}>5 Tons</Text>
                    </View>
                </View>

                <View style={Styles.totalPriceContainer}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{ fontFamily: Fonts.bold, marginBottom: 10, fontSize: 16}}>Delivery Address</Text>
                        <Checkbox
                            disabled={false}
                            value={true}
                            tintColors={{ true: Colors.mango, false:'#777' }}
                            onValueChange={(newValue) => console.log(newValue)}
                        />
                    </View>
                    <View>
                        <Text style={Styles.itemTxt}>1812, Building no. 2</Text>
                        <Text style={Styles.itemTxt}>Bajranga Hills</Text>
                        <Text style={Styles.itemTxt}>Hyderabad (AP)</Text>
                    </View>
                </View>
                <TouchableOpacity style={{marginTop: 20, flexDirection: 'row', alignItems:'center' }}>
                    <FAIcon name={"plus"} size={20} color={Colors.mango} />
                    <Text style={{ marginLeft: 10, fontFamily: Fonts.bold, fontSize: 16}}>Add New Address</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%', alignItems:'center', paddingHorizontal: 20 }}>
            <View style={{paddingHorizontal: 10}}>
                <Text style={{fontSize: 12, color: Colors.mango, fontFamily: Fonts.bold}}>ESTIMATED PRICE</Text>
                <Text style={{fontFamily: Fonts.regular}}><FAIcon size={14} name="rupee"/> 6000</Text>
            </View>
            <View>
                <TouchableOpacity style={Styles.btnPrimary} onPress={handleConfirm}>
                    <Text style={Styles.btnTextWhite}>CONFIRM</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
  );
}

export default PriceConfirm;
