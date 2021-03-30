import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import Fonts from "../../../theme/Fonts";
// import { RFValue } from 'react-native-responsive-fontsize';
// import { STANDARD_SCREEN_SIZE } from '../../../utils/constants';
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
  locationTxt:{
    flex: 3,
    height: 45,
    marginRight: 15
  },
  imagePickerContainer:{
    marginTop: 15,
    height: 50
  },
  imageContainer:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop: 40
  },
  uploadImage:{
    width: 200,
    height: 100
  },
  removeBtn:{
    paddingVertical: 8,
    paddingHorizontal: 10,
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
    marginBottom: 20,
    paddingTop: 30
  },
  confirmButton:{
    marginTop:20,
    borderRadius: 10,
    backgroundColor:Colors.mango,
    paddingVertical: 15,
    alignItems:'center'
  },
  confirmBtnText:{
    fontSize: 18,
    fontFamily:
    Fonts.regular,
    color: Colors.white
  },
  iconButton:{
    borderRadius: 10,
    paddingHorizontal: 45,
    paddingVertical: 25,
    backgroundColor:'#ccc',
    flexDirection:'row',
    alignItems:'center'
  },
  headerText:{
    fontFamily: Fonts.bold,
    fontSize: 20
  },
  viewVolume:{
    marginTop: 15,
    height: 60,
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
    fontSize: 16
  },
  inputText:{
    backgroundColor:'#e4e4e4',
    borderRadius: 10,
    paddingLeft: 15,
    fontFamily: Fonts.regular
  },
  inputLabelText: {
    marginBottom: 5,
    fontFamily:
    Fonts.regular,
    fontSize: 16
  },
});

export default styles;