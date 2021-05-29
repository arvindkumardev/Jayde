import { StyleSheet } from 'react-native';
import Fonts from "../../../theme/Fonts";
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
  confirmButtonnabcd:{
    borderRadius: 10,
    backgroundColor:Colors.grayBackground,
    height: 44,
    width: 315,
    alignItems:'center',
    marginTop: 10,
  },
  confirmButtonabc:{
    marginTop: 20,
    borderRadius: 10,
    backgroundColor:Colors.mango,
    // backgroundColor: shouldShow3 == true ? Colors.mango : Colors.grayBackground,
    alignItems:'center',
    height: 44,
    width: 154,
  },
  confirmButtonnabc:{
    marginTop:20,
    borderRadius: 10,
    backgroundColor:Colors.grayBackground,
    // backgroundColor: selected2 == true ? Colors.mango : Colors.grayBackground,
    height: 44,
    width: 154,
    alignItems:'center',
    marginLeft: 9,
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
  confirmButton:{
    marginTop: 20,
    borderRadius: 10,
    backgroundColor:Colors.mango,
    alignItems:'center',
    height: 44,
    width: 156,
    marginLeft: 4,
  },
  confirmButtonn:{
    marginTop:20,
    borderRadius: 10,
    backgroundColor:Colors.white,
    height: 44,
    width: 156,
    alignItems:'center',
    borderColor: Colors.mango,
    borderWidth: 1,
  },
  confirmBtnText:{
    fontSize: 15,
    fontFamily:
    Fonts.regular,
    color: Colors.white,
    marginTop: 10,
  },
  confirmBtnTextt:{
    fontSize: 15,
    fontFamily:
    Fonts.regular,
    color: Colors.mango,
    marginTop: 10,
  },

  inputTextf:{
    backgroundColor:'#e4e4e4',
    borderRadius: 10,
    paddingLeft: 15,
    fontFamily: Fonts.regular,
    flex:1,
  },
  boxView: {
    width: 310, 
    height: 200, 
    backgroundColor: '#f5f5f5', 
    borderRadius: 10, 
    marginTop: 25, 
  },
  rupee: {
    position: 'absolute', 
    alignItems: 'flex-end', 
    marginLeft: 290, 
    marginTop: 15, 
    fontSize: 15,
  },

  // is the material weighted css
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
  viewVolumeInputContainerDate:{
    width: 169,
    height: 44,
  },
  viewVolumeInputContainerK: {
    width: 157,
    height: 44,
  },
  inputLabelText: {
    marginBottom: 5,
    fontFamily:
    Fonts.regular,
    fontSize: 16
  },
  locationTxt:{
    flex: 3,
    height: 45,
    width: 159,
    marginRight: 15
  },
  locationTxtStyle:{
    flex: 3,
    height: 44,
    marginRight: 15
  },
  inputText:{
    backgroundColor: Colors.grayBackground,
    borderRadius: 10,
    paddingLeft: 15,
    fontFamily: Fonts.regular
  },
  dropDownText: {
    fontFamily: Fonts.regular,
    fontSize: 16
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
  iconButton:{
    borderRadius: 10,
    paddingHorizontal: 45,
    paddingVertical: 25,
    backgroundColor:'#ccc',
    flexDirection:'row',
    alignItems:'center'
  },
  confirmButtonaa:{
    marginTop:20,
    borderRadius: 10,
    backgroundColor:Colors.mango,
    paddingVertical: 15,
    alignItems:'center'
  },
  confirmBtnTextaa:{
    fontSize: 18,
    fontFamily:
    Fonts.regular,
    color: Colors.white
  },
  headerContainer:{
    alignItems:'center',
    marginBottom: 20,
    paddingTop: 30
  },
  headerText:{
    fontFamily: Fonts.bold,
    fontSize: 20
  },
  inputIcon:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  Requiredprice:{
    color: "#000",
  },
});

export default styles;