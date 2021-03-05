import React, {useContext} from 'react';
import {View} from 'react-native';
import {GradientButton} from '../../components';
import {logout, RfW} from '../../utils/helpers';
import UserContext from '../Login/user.context';
import {useNavigation} from '@react-navigation/native';

function Profile() {
  const { user, setLogin } = useContext(UserContext);
  const navigation = useNavigation();

  const handleLogout = () => {
    logout();
    setLogin(false);
  };


  return (
    <View style={{flex:1, justifyContent:'center', paddingHorizontal:RfW(20)}}>
      <GradientButton title={'Logout'} onPress={handleLogout}/>
    </View>
  );
}

export default Profile;
