import { StyleSheet } from 'react-native';
import Fonts from "../../../theme/Fonts";
import { Colors } from '../../../theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_SIZE } from '../../../utils/constants';
import { RfH, RfW } from '../../../utils/helpers';

const styles = StyleSheet.create({
  btnConfirmPickup:{
    borderRadius: 10,
    backgroundColor:Colors.mangoTwo,
    height: RfH(44),
    width: RfW(315),
    alignItems:'center',
    marginTop: RfH(10),
  },
  confirmButtonabc:{
    marginTop: RfH(20),
    borderRadius: 10,
    backgroundColor:Colors.mango,
    // backgroundColor: shouldShow3 == true ? Colors.mango : Colors.grayBackground,
    alignItems:'center',
    height: RfH(44),
    width: RfW(154),
  },
  confirmButtonnabc:{
    marginTop:RfH(20),
    borderRadius: 10,
    backgroundColor:Colors.grayBackground,
    // backgroundColor: selected2 == true ? Colors.mango : Colors.grayBackground,
    height: RfH(44),
    width: RfW(154),
    alignItems:'center',
    marginLeft: RfW(9),
  },
  imageContainer:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop: RfH(40)
  },
  uploadImage:{
    width: RfW(200),
    height: RfH(100)
  },
  removeBtn:{
    paddingVertical: RfH(8),
    paddingHorizontal: RfW(10),
    backgroundColor:'red',
    borderRadius: 10
  },
  confirmButton:{
    marginTop: RfH(20),
    borderRadius: 10,
    backgroundColor:Colors.mango,
    alignItems:'center',
    paddingHorizontal: RfW(10),
    marginLeft: RfW(4),
  },
  confirmButtonn:{
    marginTop:RfH(20),
    borderRadius: 10,
    backgroundColor:Colors.white,
    paddingHorizontal: RfW(10),
    alignItems:'center',
    borderColor: Colors.mango,
    borderWidth: 1,
  },
  confirmBtnText:{
    fontSize: RFValue(15, STANDARD_SCREEN_SIZE),
    fontFamily:
    Fonts.regular,
    color: Colors.white,
  },
  confirmBtnTextt:{
    fontSize: RFValue(15, STANDARD_SCREEN_SIZE),
    fontFamily:
    Fonts.regular,
    color: Colors.mango,
  },

  inputTextf:{
    backgroundColor:'#e4e4e4',
    borderRadius: 10,
    paddingLeft: RfW(15),
    fontFamily: Fonts.regular,
    flex:1,
  },
  boxView: {
    width: RfW(310), 
    height: RfH(200), 
    backgroundColor: '#f5f5f5', 
    borderRadius: 10, 
    marginTop: RfH(25), 
  },
  rupee: {
    position: 'absolute', 
    alignItems: 'flex-end', 
    marginLeft: RfW(290), 
    marginTop: RfH(15), 
    fontSize: RFValue(15, STANDARD_SCREEN_SIZE),
  },

  // is the material weighted css
  viewVolume:{
    marginTop: RfH(15),
    height: RfH(60),
    width: '100%'
  },
  viewVolumeInputContainer:{
    flex: 1,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  viewVolumeInputContainerDate:{
    width: RfW(169),
    height: RfH(44),
  },
  viewVolumeInputContainerK: {
    width: RfW(157),
    height: RfH(44),
  },
  inputLabelText: {
    marginBottom: RfH(5),
    fontFamily:Fonts.regular,
    fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
  },
  locationTxt:{
    flex: 3,
    height: RfH(45),
    width: RfW(159),
    marginRight: RfW(15)
  },
  locationTxtStyle:{
    flex: 3,
    height: RfH(44),
    marginRight: RfW(15)
  },
  inputText:{
    backgroundColor: Colors.grayBackground,
    borderRadius: 10,
    paddingLeft: RfW(15),
    fontFamily: Fonts.regular
  },
  dropDownText: {
    fontFamily: Fonts.regular,
    fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
  },
  imagePickerContainer:{
    marginTop: RfH(15),
    height: RfH(50)
  },
  imageContainer:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop: RfH(40)
  },
  uploadImage:{
    width: RfW(200),
    height: RfH(100)
  },
  iconButton:{
    borderRadius: 10,
    paddingHorizontal: RfW(45),
    paddingVertical: RfH(25),
    backgroundColor:'#ccc',
    flexDirection:'row',
    alignItems:'center'
  },
  confirmButtonaa:{
    marginTop:RfH(20),
    borderRadius: 10,
    backgroundColor:Colors.mango,
    paddingVertical: RfH(15),
    alignItems:'center'
  },
  confirmBtnTextaa:{
    fontSize: RFValue(18, STANDARD_SCREEN_SIZE),
    fontFamily:
    Fonts.regular,
    color: Colors.white
  },
  headerContainer:{
    alignItems:'center',
    marginBottom: RfH(20),
    paddingTop: RfH(30)
  },
  headerText:{
    fontFamily: Fonts.bold,
    fontSize: 20
  },
  inputIcon:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal: RfW(20),
    paddingVertical: RfH(10),
  },
  Requiredprice:{
    color: "#000",
  },
});

export default styles;