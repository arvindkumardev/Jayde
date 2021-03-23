import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../utils/helpers';
import Fonts from "../../theme/Fonts";
// import { RFValue } from 'react-native-responsive-fontsize';
// import { STANDARD_SCREEN_SIZE } from '../../../utils/constants';
import { Colors } from '../../theme';

const styles = StyleSheet.create({
  timeslotItem:{
    fontFamily: Fonts.regular
  },
  active:{
    borderLeftColor: Colors.mango,
    borderLeftWidth: 10,
    backgroundColor: Colors.grayLine
  },
  itemTimeslot:{
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection:"row",
    justifyContent:'space-between'
  },
  timeslotHeader:{
    fontFamily:Fonts.regular,
    fontSize: 16
  },
  txtFileUpload:{
    fontFamily: Fonts.regular,
    color: Colors.grayThree
  },
  inputIcon:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  inputLabel:{
    fontFamily: Fonts.regular,
    fontSize: 16,
    marginBottom: 10
  },
  txtHeader:{
    fontFamily: Fonts.bold,
    fontSize: 16
  },
  headingContainer:{
    width:'100%',
    alignItems:'center',
    marginTop: 20
  },
  mainContainer:{
    flex:1,
    paddingHorizontal:RfW(20)
  },
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
    fontSize: 18
  },
});

export default styles;