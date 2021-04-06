import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../utils/helpers';
import Fonts from "../../theme/Fonts";
import { Colors } from '../../theme';

const styles = StyleSheet.create({
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
  // headerContainer:{
  //   alignItems:'center',
  //   marginBottom: 20,
  //   paddingTop: 30
  // },
  confirmButton:{
    marginTop:20,
    borderRadius: 10,
    backgroundColor:Colors.mango,
    paddingVertical: 15,
    alignItems:'center',
    marginRight: 5,
  },
  confirmButtonn:{
    marginTop:20,
    borderRadius: 10,
    backgroundColor:Colors.white,
    paddingVertical: 15,
    alignItems:'center',
    borderColor: Colors.mango,
    borderWidth: 1,
    marginRight: 10,
  },
  confirmBtnText:{
    fontSize: 18,
    fontFamily:
    Fonts.regular,
    color: Colors.white
  },
  confirmBtnTextt:{
    fontSize: 18,
    fontFamily:
    Fonts.regular,
    color: Colors.mango
  },
  inputText:{
    backgroundColor:'#e4e4e4',
    borderRadius: 10,
    paddingLeft: 15,
    fontFamily: Fonts.regular
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
    height: 235, 
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
  }
});

export default styles;