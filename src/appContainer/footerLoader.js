import React from 'react';
import {View, ActivityIndicator} from 'react-native'
import style from "../theme/Styles/container";
import Colors from '../theme/Colors';

function renderFooter (props) {
    return (    
        <View style={[style.alignCenter, style.justifyCon]}>
            <ActivityIndicator
                animating={props.Loading}
                size='large'
                color={Colors.mangoTwo} />
        </View>
    );
  };
  export default renderFooter