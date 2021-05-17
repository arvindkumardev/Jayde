/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Text, Image, FlatList, ScrollView } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppStyles, Colors } from '../../theme/index';
import { removeData, getGreeting, getSaveData, formatDisplayDate } from '../../utils/helpers';
import { LOCAL_STORAGE_DATA_KEY } from '../../utils/constants';
import UserContext from '../../appContainer/context/user.context';
import { USERS_ROLE_MENU, STATUS_ICON } from '../../routes/constants';
import Styles from './styles';
import { getOrderList } from "./middleware";

//Image
import EWasteImg from  './../../assets/Images/NewOrderList/Group_10091.png'
import PaperImg from  './../../assets/Images/NewOrderList/Group_10089.png'
import PlasticImg from './../../assets/Images/NewOrderList/Group_10090.png'
import MixWasterImg from './../../assets/Images/NewOrderList/Group_10088.png'


const ORDER_IMAGE = {
  'E-Waste':EWasteImg,
   Paper: PaperImg,
   Plastic: PlasticImg,
  'Mix Waste':MixWasterImg,
};

const STATIC_DATA = [
  {
    name: '3 Ton Paper',
    date: '21/01/21',
    orderid: 'JYD/N/21/019',
    image: require('../../assets/Images/Dashboard/Group_9993.png'),
    images: require('../../assets/Images/Dashboard/Fill_164.png'),
    status: 'Pending',
  },
  {
    name: '4 Ton Paper',
    date: '21/01/21',
    orderid: 'JYD/N/21/021',
    image: require('../../assets/Images/Dashboard/Group_9993.png'),
    images: require('../../assets/Images/Dashboard/Icon_metro-truck.png'),
    status: 'In Transit',
  },
  {
    name: '3 Ton Plastic',
    date: '21/01/21',
    orderid: 'JYD/N/21/011',
    image: require('../../assets/Images/Dashboard/Group_9992.png'),
    images: require('../../assets/Images/Dashboard/Group_9995.png'),
    status: 'Completed',
  },
];

function HomeScreen() {
  const navigation = useNavigation();
  const { userRole, setLogin, setLoader } = useContext(UserContext);

  const [name,setName] = useState("");
  const [homeOrder, setHomeOrder] = useState([]);
  const [{ data, loading, error }, onOrderList] = getOrderList(userRole);


  useEffect(() => {
    async function getUserName () {
        const username = await getSaveData (LOCAL_STORAGE_DATA_KEY.USER_NAME);       
        setName(username)
    }
    getUserName();
  }, []);
 
  useEffect(()=>{
    setLoader(loading)
    getHomeOrder();
  },[]);

  const getHomeOrder = async () => {
    try {
          const { data } = await onOrderList({ data: {} });         
          if(userRole === 'seller'){
            setHomeOrder(data.data[0].orderDetails) 
          } else{
            setHomeOrder(data.data[0].newOrders) 
          }
          setLoader(loading)            
        }
        catch(e){
            console.log("Response error", e);
        }
  };

  const handleUserLogout = async () => {
    await removeData(LOCAL_STORAGE_DATA_KEY.JWT_TOKEN);
    await removeData(LOCAL_STORAGE_DATA_KEY.USER_ROLE);
    setLogin(false);
  };

  const handleNavigate = (screenName) => {
    if (screenName !== '' && screenName !== 'Logout') {
      navigation.navigate(screenName);
    } else if (screenName === 'Logout') {
      handleUserLogout();
    }
  };
  const _renderData = (index, item) => {
    return (
      <TouchableOpacity key={index} style={Styles.dataItemContainer}>
        <View style={Styles.dataImage}>
        <Image source={ORDER_IMAGE[item.category_name]}  /> 
        </View>
        <View style={[Styles.dataItemContent, AppStyles.ml10]}>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f17]}>{item.order_no}</Text>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f15]}>{item.qty} {item.unit_name} {item.category_name}</Text>
          <Text style={[AppStyles.txtBlackRegular, AppStyles.f12]}>{formatDisplayDate(item.pickup_date)}</Text>
        </View>
        <View style={Styles.statusIcon}>
          <FAIcon name={STATUS_ICON[item.is_confirmed === '3' ? 'Pending' : item.is_confirmed === '4' ? 'Completed' : 'In Transit'].iconName} 
          color={STATUS_ICON[item.is_confirmed === '3' ? 'Pending' : item.is_confirmed === '4' ? 'Completed' : 'In Transit'].color} size={20} />
          <Text style={[AppStyles.txtBlackRegular]}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderMenu = (index, item) => {
    return (
      <View key={index} style={[Styles.menuContainer, { backgroundColor: item.color }]}>
        <View>
          <TouchableOpacity style={Styles.menuEllipseContainer}>
            <FAIcon name="ellipsis-v" color={Colors.white} size={30} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleNavigate(item.screenName)} style={Styles.menuActionItem}>
          <MCIcon name={item.iconName} color={Colors.white} size={20} style={{ alignSelf: 'flex-end' }} />
          <View>
            <Text style={[AppStyles.txtWhiteBold, AppStyles.f16]}>{item.menuName}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.white }}>
      <View style={AppStyles.flexRowSpaceBetween}>
        <View style={[AppStyles.mt30, AppStyles.ml30]}>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f18]}>{getGreeting()}</Text>
          <Text style={[AppStyles.txtBlackBold, AppStyles.f35]}>{name}</Text>
        </View>
        <View>
          <View style={{ alignItems: 'flex-end', marginTop: 10, marginRight: 10 }}>
            <Image
              style={{ width: 125, height: 132 }}
              source={require('../../assets/Images/Dashboard/Mask_Group_28.png')}
            />
          </View>
        </View>
      </View>

      <FlatList
        data={USERS_ROLE_MENU[userRole]}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ index, item }) => _renderMenu(index, item)}
      />
      <View style={[AppStyles.pl30, AppStyles.mt20]}>
        <Text style={[AppStyles.txtBlackBold, AppStyles.f20]}>Current Orders</Text>
      </View>
      
      <FlatList data={homeOrder}
       renderItem={({ index, item }) => _renderData(index, item)}
       extraData = {useState}
       removeClippedSubviews={Platform.OS === 'android' && true}
       numColumns={1}
       keyExtractor={(_, index) => `${index}1`} />
    </ScrollView>
  );
}

export default HomeScreen;
