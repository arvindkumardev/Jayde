import {StyleSheet} from 'react-native';
import Fonts from '../../theme/Fonts';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';
import {RFValue} from 'react-native-responsive-fontsize';
import {STANDARD_SCREEN_SIZE} from '../../utils/constants';

const styles = StyleSheet.create({
  container:{
    margin:RfW(7.5),
    backgroundColor:Colors.searchBar,
    borderRadius:RfH(15),
    paddingVertical:RfH(7),
    paddingHorizontal:RfW(8),
    flexDirection:'row',
    alignItems:'center'
  },
  textStyle:{
    marginHorizontal:RfW(3),
    
    fontFamily: Fonts.regular,
    fontSize: RFValue(17, STANDARD_SCREEN_SIZE),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: -0.41,
    textAlign: 'left',
    color: Colors.blackSecondary,
    flex:1,
    padding:0,
  },
  placeholderTextStyle:{
    marginLeft:RfW(3),
    fontFamily: Fonts.regular,
    fontSize: RFValue(17, STANDARD_SCREEN_SIZE),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: -0.41,
    textAlign: 'left',
    color: 'rgba(60, 60, 67, 0.6)',
    flex:1,
    padding:0
  }
});

export default styles;
