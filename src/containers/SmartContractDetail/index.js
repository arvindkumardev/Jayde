import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import * as Alert from 'react-native';
import { TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView } from 'react-native';
import Styles from "./styles";
import NavigationRouteNames from '../../routes/ScreenNames';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { AppStyles } from '../../theme';


function SmartContractDetail() {

  const navigation = useNavigation();
  const route = useRoute();
  const [waste, setWaste] = useState('Plastic');
  const [invoice, setInvoice] = useState('XYZ/09/1234');
  const [vehicle, setVehicle] = useState('HR51AS8787');
  const [kanta, setKanta] = useState('65907543251');
  const [logistics, setLogistics] = useState('HTGT89797');
  const [waybill, setWaybill] = useState('JUHY976454');
  const [recycle, setRecycle] = useState('22/06/2020');
  const [recvehicle, setRecvehicle] = useState('DL 3 CAD7876');
  const [reckanta, setReckanta] = useState('XYZ/09/1234');
  const [recwaybill, setRecwaybill] = useState('65907543251');
  const [reclogistics, setReclogistics] = useState('JUHY976454');
  const [recpayment, setRecpayment] = useState('Cash');
  const [waybillno, setWaybillno] = useState('JUHY976454');

  const screenNavigate = (value, label) => {
    navigation.navigate(NavigationRouteNames.SMARTCONTRACT_VIEWITEM, { btnValue: value, btnLabel: label });
  }

  useLayoutEffect(() => {
    const title = 'Smart Contracts';
    navigation.setOptions({
      title,
    });
  }, []);

  return (
    <View style={AppStyles.topView}>
      <ScrollView>
        <View style={AppStyles.aligncen}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mt30,]}>Ref No- JYD/SC/2020/0067</Text>
        </View>
        <View style={Styles.boxView}>

          <View style={[AppStyles.flexDir, AppStyles.mt20,]}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.ml20]}>Waste type</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mr20]}>Plastic</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Waste sub category</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>Type 1</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Volume</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>3 Tons</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flexpointsix}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Purchase Date</Text>
            </View>
            <View style={[AppStyles.flexpointfour, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>26/07/2020</Text>
            </View>
          </View>

          <View style={AppStyles.flexDir}>
            <View style={AppStyles.flex1}>
              <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f15, AppStyles.mt10, AppStyles.ml20]}>Purchase amount</Text>
            </View>
            <View style={[AppStyles.flex1, AppStyles.alignfend]}>
              <Text style={[AppStyles.txtBlackRegular, AppStyles.f15, AppStyles.mt10, AppStyles.mr20]}>₹ 25,864</Text>
            </View>
          </View>
        </View>

        <View style={AppStyles.aligncen}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f17, AppStyles.mt35,]}>Waste Details</Text>
        </View>

        <View style={Styles.wasteboxView}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f15, AppStyles.mt15, AppStyles.ml20]}>Collection Details</Text>
          <View style={[Styles.bdrclr]}></View>
          <View style={AppStyles.ml20}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mt15]}>Generator name</Text>
            <Text style={[AppStyles.txtBlackRegular, Styles.text]}>M/S Coca Cola India Limited</Text>
          </View>

          <View style={AppStyles.ml20}>
            <View style={AppStyles.flexDir}>
              <View style={AppStyles.flexpointseven}>
                <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mt15]}>Waste details</Text>
                <Text style={[AppStyles.txtBlackRegular, Styles.text]}>{waste}</Text>
              </View>
              <View style={[Styles.btnContainer, AppStyles.flexpointthree]}>
                <TouchableOpacity activeOpacity = {0.8}
                  style={[Styles.confirmbtn, AppStyles.mb20, AppStyles.ml20]} onPress={() => screenNavigate(waste, "Waste Details")}>
                  <Text style={[AppStyles.txtWhiteRegular, AppStyles.f9, AppStyles.textalig, AppStyles.mt5]}>VIEW</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={AppStyles.ml20}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mt15]}>Date of pickup</Text>
            <Text style={[AppStyles.txtBlackRegular, Styles.text]}>20/06/2020</Text>
          </View>

          <View style={AppStyles.ml20}>
            <View style={AppStyles.flexDir}>
              <View style={AppStyles.flexpointseven}>
                <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mt15]}>Invoice number</Text>
                <Text style={[AppStyles.txtBlackRegular, Styles.text]}>{invoice}</Text>
              </View>
              <View style={[Styles.btnContainer, AppStyles.flexpointthree]}>
                <TouchableOpacity activeOpacity = {0.8}
                  style={[Styles.confirmbtn, AppStyles.mb20, AppStyles.ml20]} onPress={() => screenNavigate(invoice, "Invoice Number")}>
                  <Text style={[AppStyles.txtWhiteRegular, AppStyles.f9, AppStyles.textalig, AppStyles.mt5]}>VIEW</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={AppStyles.ml20}>
            <View style={AppStyles.flexDir}>
              <View style={AppStyles.flexpointseven}>
                <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mt15]}>Vehicle number</Text>
                <Text style={[AppStyles.txtBlackRegular, Styles.text]}>{vehicle}</Text>
              </View>
              <View style={[Styles.btnContainer, AppStyles.flexpointthree]}>
                <TouchableOpacity activeOpacity = {0.8}
                  style={[Styles.confirmbtn, AppStyles.mb20, AppStyles.ml20]} onPress={() => screenNavigate(vehicle, "Vehicle Number")}>
                  <Text style={[AppStyles.txtWhiteRegular, AppStyles.f9, AppStyles.textalig, AppStyles.mt5]}>VIEW</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={AppStyles.ml20}>
            <View style={AppStyles.flexDir}>
              <View style={AppStyles.flexpointseven}>
                <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mt15]}>Kanta slip number</Text>
                <Text style={[AppStyles.txtBlackRegular, Styles.text]}>{kanta}</Text>
              </View>
              <View style={[Styles.btnContainer, AppStyles.flexpointthree]}>
                <TouchableOpacity activeOpacity = {0.8}
                  style={[Styles.confirmbtn, AppStyles.mb20, AppStyles.ml20]} onPress={() => screenNavigate(kanta, "Kanta Slip Number")}>
                  <Text style={[AppStyles.txtWhiteRegular, AppStyles.f9, AppStyles.textalig, AppStyles.mt5]}>VIEW</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={AppStyles.ml20}>
            <View style={AppStyles.flexDir}>
              <View style={AppStyles.flexpointseven}>
                <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mt15]}>Logistics bill number</Text>
                <Text style={[AppStyles.txtBlackRegular, Styles.text]}>{logistics}</Text>
              </View>
              <View style={[Styles.btnContainer, AppStyles.flexpointthree]}>
                <TouchableOpacity activeOpacity = {0.8}
                  style={[Styles.confirmbtn, AppStyles.mb20, AppStyles.ml20]} onPress={() => screenNavigate(logistics, "Logistics Bill Number")}>
                  <Text style={[AppStyles.txtWhiteRegular, AppStyles.f9, AppStyles.textalig, AppStyles.mt5]}>VIEW</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={AppStyles.ml20}>
            <View style={AppStyles.flexDir}>
              <View style={AppStyles.flexpointseven}>
                <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mt15]}>Waybill number</Text>
                <Text style={[AppStyles.txtBlackRegular, Styles.text]}>{waybill}</Text>
              </View>
              <View style={[Styles.btnContainer, AppStyles.flexpointthree]}>
                <TouchableOpacity activeOpacity = {0.8}
                  style={[Styles.confirmbtn, AppStyles.mb20, AppStyles.ml20]} onPress={() => screenNavigate(waybill, "Waybill Number")}>
                  <Text style={[AppStyles.txtWhiteRegular, AppStyles.f9, AppStyles.textalig, AppStyles.mt5]}>VIEW</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={Styles.recycleboxView}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f15, AppStyles.mt15, AppStyles.ml20]}>Recycling Details</Text>
          <View style={[Styles.bdrclr]}></View>
          <View style={AppStyles.ml20}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mt15]}>Recycler Name</Text>
            <Text style={[AppStyles.txtBlackRegular, Styles.text]}>N/W New recycler ltd</Text>
          </View>

          <View style={AppStyles.ml20}>
            <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mt15]}>Invoice number</Text>
            <Text style={[AppStyles.txtBlackRegular, Styles.text]}>TRED4346667</Text>
          </View>

          <View style={AppStyles.ml20}>
            <View style={AppStyles.flexDir}>
              <View style={AppStyles.flexpointseven}>
                <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mt15]}>Date of Recycling</Text>
                <Text style={[AppStyles.txtBlackRegular, Styles.text]}>{recycle}</Text>
              </View>
              <View style={[Styles.btnContainer, AppStyles.flexpointthree]}>
                <TouchableOpacity activeOpacity = {0.8}
                  style={[Styles.confirmbtn, AppStyles.mb20, AppStyles.ml20]} onPress={() => screenNavigate(recycle, "Date of Recycling")}>
                  <Text style={[AppStyles.txtWhiteRegular, AppStyles.f9, AppStyles.textalig, AppStyles.mt5]}>VIEW</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={AppStyles.ml20}>
            <View style={AppStyles.flexDir}>
              <View style={AppStyles.flexpointseven}>
                <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mt15]}>Recycler Vehicle number</Text>
                <Text style={[AppStyles.txtBlackRegular, Styles.text]}>{recvehicle}</Text>
              </View>
              <View style={[Styles.btnContainer, AppStyles.flexpointthree]}>
                <TouchableOpacity activeOpacity = {0.8}
                  style={[Styles.confirmbtn, AppStyles.mb20, AppStyles.ml20]} onPress={() => screenNavigate(recvehicle, "Recycler Vehicle Number")}>
                  <Text style={[AppStyles.txtWhiteRegular, AppStyles.f9, AppStyles.textalig, AppStyles.mt5]}>VIEW</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={AppStyles.ml20}>
            <View style={AppStyles.flexDir}>
              <View style={AppStyles.flexpointseven}>
                <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mt15]}>Recycler Kanta slip number</Text>
                <Text style={[AppStyles.txtBlackRegular, Styles.text]}>{reckanta}</Text>
              </View>
              <View style={[Styles.btnContainer, AppStyles.flexpointthree]}>
                <TouchableOpacity activeOpacity = {0.8}
                  style={[Styles.confirmbtn, AppStyles.mb20, AppStyles.ml20]} onPress={() => screenNavigate(reckanta, "Recycler Kanta Slip Number")}>
                  <Text style={[AppStyles.txtWhiteRegular, AppStyles.f9, AppStyles.textalig, AppStyles.mt5]}>VIEW</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={AppStyles.ml20}>
            <View style={AppStyles.flexDir}>
              <View style={AppStyles.flexpointseven}>
                <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mt15]}>Recycler way bill number</Text>
                <Text style={[AppStyles.txtBlackRegular, Styles.text]}>{recwaybill}</Text>
              </View>
              <View style={[Styles.btnContainer, AppStyles.flexpointthree]}>
                <TouchableOpacity activeOpacity = {0.8}
                  style={[Styles.confirmbtn, AppStyles.mb20, AppStyles.ml20]} onPress={() => screenNavigate(recwaybill, "Recycler Way Bill Number")}>
                  <Text style={[AppStyles.txtWhiteRegular, AppStyles.f9, AppStyles.textalig, AppStyles.mt5]}>VIEW</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={AppStyles.ml20}>
            <View style={AppStyles.flexDir}>
              <View style={AppStyles.flexpointseven}>
                <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mt15]}>Logistics  bill number</Text>
                <Text style={[AppStyles.txtBlackRegular, Styles.text]}>{reclogistics}</Text>
              </View>
              <View style={[Styles.btnContainer, AppStyles.flexpointthree]}>
                <TouchableOpacity activeOpacity = {0.8}
                  style={[Styles.confirmbtn, AppStyles.mb20, AppStyles.ml20]} onPress={() => screenNavigate(reclogistics, "Logistics  Bill Number")}>
                  <Text style={[AppStyles.txtWhiteRegular, AppStyles.f9, AppStyles.textalig, AppStyles.mt5]}>VIEW</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={AppStyles.ml20}>
            <View style={AppStyles.flexDir}>
              <View style={AppStyles.flexpointseven}>
                <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mt15]}>Bank entry for payment</Text>
                <Text style={[AppStyles.txtBlackRegular, Styles.text]}>{recpayment}</Text>
              </View>
              <View style={[Styles.btnContainer, AppStyles.flexpointthree]}>
                <TouchableOpacity activeOpacity = {0.8}
                  style={[Styles.confirmbtn, AppStyles.mb20, AppStyles.ml20]} onPress={() => screenNavigate(recpayment, "Bank Entry For Payment")}>
                  <Text style={[AppStyles.txtWhiteRegular, AppStyles.f9, AppStyles.textalig, AppStyles.mt5]}>VIEW</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={AppStyles.ml20}>
            <View style={AppStyles.flexDir}>
              <View style={AppStyles.flexpointseven}>
                <Text style={[AppStyles.txtSecandaryRegular, AppStyles.f13, AppStyles.mt15]}>Waybill number</Text>
                <Text style={[AppStyles.txtBlackRegular, Styles.text]}>{waybillno}</Text>
              </View>
              <View style={[Styles.btnContainer, AppStyles.flexpointthree]}>
                <TouchableOpacity
                  activeOpacity = {0.8}
                  style={[Styles.confirmbtn, AppStyles.mb20, AppStyles.ml20]} onPress={() => screenNavigate(waybillno, "Waybill number")}>
                  <Text style={[AppStyles.txtWhiteRegular, AppStyles.f9, AppStyles.textalig, AppStyles.mt5]}>VIEW</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
export default SmartContractDetail;
