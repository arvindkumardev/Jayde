import React, { useContext, useEffect, useState } from 'react';
import * as Alert from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import NavigationRouteNames from '../../routes/ScreenNames';
import FAIcon from "react-native-vector-icons/FontAwesome";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, AppStyles } from "../../theme/index";
import UserContext from "../../appContainer/context/user.context";


// clearAll()
const USERS_ROLE_MENU = {
  SELLER : [{
    menuname: 'Create Order',
    menu1image: require('../../assets/Images/Dashboard/Group_9551.png'),
    menu2image: require('../../assets/Images/Dashboard/Icon_ionic-md-create.png'),
    color: Colors.mango,
    screenName: NavigationRouteNames.NEW_ORDER
  },
  {
    menuname: 'Existing Order',
    menu1image: require('../../assets/Images/Dashboard/Group_9551.png'),
    menu2image: require('../../assets/Images/Dashboard/Project.png'),
    color: Colors.mango,
    screenName: ''
  },
  {
    menuname: 'Profile',
    menu1image: require('../../assets/Images/Dashboard/Group_9551.png'),
    menu2image: require('../../assets/Images/Dashboard/Project.png'),
    color: Colors.mango,
    screenName: ''
  },
  {
    menuname: 'Logout',
    menu1image: require('../../assets/Images/Dashboard/Group_9551.png'),
    menu2image: require('../../assets/Images/Dashboard/Project.png'),
    color: Colors.mango,
    screenName: ''
  }],
  ADMIN: [],
  AGGRATOR: [{
    menuname: 'View New Order',
    menu1image: require('../../assets/Images/Dashboard/Group_9551.png'),
    menu2image: require('../../assets/Images/Dashboard/Icon_ionic-md-create.png'),
    color: Colors.mango,
    screenName: ''
  },
  {
    menuname: 'Open Scheduled Order',
    menu1image: require('../../assets/Images/Dashboard/Group_9551.png'),
    menu2image: require('../../assets/Images/Dashboard/Icon_ionic-md-create.png'),
    color: Colors.mango,
    screenName: ''
  },
  {
    menuname: 'View Completed Order',
    menu1image: require('../../assets/Images/Dashboard/Group_9551.png'),
    menu2image: require('../../assets/Images/Dashboard/Icon_ionic-md-create.png'),
    color: Colors.green,
    screenName: ''
  }
],
  RECYCLER: [],
  EPR: []
}

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
  }
]


function HomeScreen() {
  const { userRole, isLogin } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() =>{
    console.log("User role in dashboard ", userRole);
    console.log("Is user login ", isLogin);
  }, [])
  const handleNavigate = (screenName) => {
    if(screenName != '')
      navigation.navigate(screenName);
  };


  const _renderData = (index, item) => {
    return (
      <TouchableOpacity key={index} style={{ flexDirection: 'row', marginLeft: 24 }}>
        <View style={{ flex: 0.2 }}>
          <Image style={{ width: 66, height: 66, marginTop: 10 }} source={item.image} />
        </View>
        <View style={{ flex: 0.6 }}>
          <Text style={{ fontSize: 17, marginLeft: 15, marginTop: 12 }}>{item.orderid}</Text>
          <Text style={{ fontSize: 15, marginLeft: 15 }}>{item.name}</Text>
          <Text style={{ fontSize: 11, marginLeft: 15 }}>{item.date}</Text>
        </View>
        <View style={{ flex: 0.2 }}>
          <Image style={{ width: 15, height: 18, marginTop: 30, marginLeft: 15 }} source={item.images} />
          <Text style={{ fontSize: 11, color: '#000' }}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderMenu = (index, item) => {
    return (
      <View key={index} style={{flexDirection: 'row'}}>
          <View style={{flex: 1, width: 175, height: 200, marginLeft: 20, borderRadius: 10, backgroundColor:item.color, justifyContent:'space-between'}}>
            <View>
              <TouchableOpacity style={{marginLeft: 20, marginTop: 10}}>
                <FAIcon name={'ellipsis-v'} color={Colors.white} size={30}/>
              </TouchableOpacity>
            </View>
            <View style={{width:'100%', marginBottom: 20}}>
              <TouchableOpacity onPress={() => handleNavigate(item.screenName)} style={{paddingHorizontal: 20, alignSelf:'flex-end'}}>
                <MCIcon name={"pencil"} color={Colors.white} size={20}/>
              </TouchableOpacity>
              <View style={{alignItems:'center', paddingHorizontal: 10}}>
                <Text style={{fontSize: 18, color: Colors.white}}>{item.menuname}</Text>
              </View>
            </View>
          </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 0.6, marginTop: 50, marginLeft: 24 }}>
            <Text style={{ fontSize: 20 }}>Good Morning</Text>
            <Text style={{ fontSize: 34, marginTop: 5 }}>Prem Kumar</Text>
          </View>

          <View style={{ flex: 0.4 }}>
            <View style={{ alignItems: 'flex-end', marginTop: 10, marginRight: 10 }}>
              <Image
                style={{ width: 125, height: 132 }}
                source={require('../../assets/Images/Dashboard/Mask_Group_28.png')}
              />
            </View>
          </View>
        </View>

        <FlatList
          data={USERS_ROLE_MENU.AGGRATOR}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ index, item }) => _renderMenu(index, item)}
        />
        <View style={{ marginLeft: 24, marginTop: 15 }}>
          <Text
            style={{
              fontSize: 17,
              color: '#000',
              fontFamily: 'Poppins-SemiBold',
            }}>
            Current Orders
          </Text>
        </View>
        <FlatList
          data={STATIC_DATA}
          renderItem={({ index, item }) => _renderData(index, item)}
        />
      </ScrollView>
    </View>
  );
}
export default HomeScreen;
