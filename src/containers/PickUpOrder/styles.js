import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../utils/helpers';
import Fonts from "../../theme/Fonts";
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_SIZE } from '../../../utils/constants';
import { Colors } from '../../theme';

const styles = StyleSheet.create({
  locationTxt:{
    flex: 3,
    height: RfH(45),
    marginRight: RfW(15)
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
  removeBtn:{
    paddingVertical: RfH(8),
    paddingHorizontal: RfW(10),
    backgroundColor:'red',
    borderRadius: 10
  },
  cameraPreview:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerContainer:{
    alignItems:'center',
    marginBottom: RfH(20),
    paddingTop: RfH(30)
  },
  confirmButton:{
    marginTop:RfH(20),
    borderRadius: 10,
    backgroundColor:Colors.mango,
    paddingVertical: RfH(15),
    alignItems:'center'
  },
  confirmBtnText:{
    fontSize: RFValue(18, STANDARD_SCREEN_SIZE),
    fontFamily:
    Fonts.regular,
    color: Colors.white
  },
  iconButton:{
    borderRadius: 10,
    paddingHorizontal: RfW(45),
    paddingVertical: RfH(25),
    backgroundColor:'#ccc',
    flexDirection:'row',
    alignItems:'center'
  },
  headerText:{
    fontFamily: Fonts.bold,
    fontSize: RFValue(20, STANDARD_SCREEN_SIZE),
  },
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
  listHeaderContainer: {
    paddingHorizontal: RfW(22),
    paddingVertical: RfH(20)
  },
  dropDownText: {
    fontFamily: Fonts.regular,
    fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
  },
  inputText:{
    backgroundColor:'#e4e4e4',
    borderRadius: 10,
    paddingLeft: RfW(15),
    fontFamily: Fonts.regular
  },
  inputLabelText: {
    marginBottom: RfH(5),
    fontFamily:
    Fonts.regular,
    fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
  },
  boxView: {
    width: RfW(310), 
    height: RfH(235), 
    backgroundColor: '#f5f5f5', 
    borderRadius: 10, 
    // marginLeft: 24, 
    marginTop: RfH(25), 
    // marginRight: 24,
  },
  lib: {
    borderRadius: 10,
  },
});

export default styles;