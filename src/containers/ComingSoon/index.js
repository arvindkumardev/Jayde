import React from 'react';
import {View} from 'react-native';
import {Colors} from '../../theme';
import {CustomText} from '../../components';

function CommingSoon() {
  return (
    <View style={{flex: 1, justifyContent: 'center',alignItems:'center'}}>
      <CustomText color={Colors.blue} fontSize={50}> Coming Soon</CustomText>
    </View>
  );
}

export default CommingSoon;
