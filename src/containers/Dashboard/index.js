/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Text, Image, FlatList, ScrollView } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../theme/index';
import { removeData } from '../../utils/helpers';
import { LOCAL_STORAGE_DATA_KEY } from '../../utils/constants';
import UserContext from '../../appContainer/context/user.context';
import { USERS_ROLE_MENU } from '../../routes/constants';
import Styles from './styles';

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

const statusIcon = {
  Pending: { iconName: 'clock-o', color: Colors.grayThree },
  'In Transit': { iconName: 'truck', color: Colors.grayThree },
  Completed: { iconName: 'check-circle', color: Colors.green },
};

function HomeScreen() {
  const navigation = useNavigation();
  const { user, isLogin, userRole, setLogin } = useContext(UserContext);

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
        <View style={{ flex: 0.2 }}>
          <Image style={Styles.dataItemImage} source={item.image} />
        </View>
        <View style={{ flex: 0.6 }}>
          <Text style={Styles.textOrderId}>{item.orderid}</Text>
          <Text style={Styles.textName}>{item.name}</Text>
          <Text style={Styles.textDate}>{item.date}</Text>
        </View>
        <View style={{ flex: 0.2, alignItems: 'center', marginRight: 15 }}>
          {/* <Image style={{ width: 15, height: 18, marginTop: 30, marginLeft: 15 }} source={item.images} /> */}
          <FAIcon name={statusIcon[item.status].iconName} color={statusIcon[item.status].color} size={20} />
          <Text style={{ fontSize: 11, color: '#000' }}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderMenu = (index, item) => {
    return (
      <View key={index} style={{ flexDirection: 'row' }}>
        <View
          style={{
            flex: 1,
            width: 175,
            height: 200,
            marginLeft: 20,
            borderRadius: 10,
            backgroundColor: item.color,
            justifyContent: 'space-between',
          }}>
          <View>
            <TouchableOpacity style={{ marginLeft: 20, marginTop: 10 }}>
              <FAIcon name="ellipsis-v" color={Colors.white} size={30} />
            </TouchableOpacity>
          </View>
          <View style={{ width: '100%', marginBottom: 20 }}>
            <TouchableOpacity
              onPress={() => handleNavigate(item.screenName)}
              style={{ paddingHorizontal: 20, alignSelf: 'flex-end' }}>
              <MCIcon name="pencil" color={Colors.white} size={20} />
            </TouchableOpacity>
            <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
              <Text style={{ fontSize: 18, color: Colors.white }}>{item.menuName}</Text>
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
          data={USERS_ROLE_MENU.SELLER}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ index, item }) => _renderMenu(index, item)}
        />
        <TouchableOpacity onPress={() => handleUserLogout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
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
        <FlatList data={STATIC_DATA} renderItem={({ index, item }) => _renderData(index, item)} />
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
