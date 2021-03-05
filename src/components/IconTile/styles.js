import {StyleSheet, Platform} from 'react-native';

import {RfW, RfH} from '../../utils/helpers';

const styles = StyleSheet.create({
   badge: {
        height:RfH(24),
        width:RfH(24),
        borderRadius:RfH(24)/2,
        top:0,
        right:-8,
        position:'absolute',
        backgroundColor:'#EB5F2C',
        justifyContent:'center',
        alignItems:'center',        
        
        shadowOffset: {width: 2, height: 3},
        shadowOpacity: 8,
        shadowColor: 'rgba(0,0,0,0.07)',
        shadowRadius: 8,
        elevation:5,
      }
});

export default styles;
