import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../../utils/helpers';
import {Colors} from '../../../theme';

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  border: {
     borderColor: '#f75006',
     marginTop: RfH(20),
     borderWidth: 1,
     width: '90%',
     marginLeft: RfW(17),
     marginRight: RfW(17),
   },
  boxContent: {
    // width: 320, 
    // flex: 1,
    backgroundColor: '#ffffff',  
    borderRadius: 10, 
    marginLeft: RfW(24), 
    marginRight: RfW(24),
    marginTop: 35,
    // marginBottom: 30,
    marginBottom: RfH(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backbtn: {
    backgroundColor: '#f5f5f5',
    width: RfW(160),
    height: RfH(44),
    borderRadius: 10,
    marginTop: RfH(40),
  },
  confirmbtn: {
    backgroundColor: '#f75006',
    width: RfW(160),
    height: RfH(44),
    borderRadius: 10,
    marginTop: RfH(12),
  },
  rejectImg: {
    marginTop: RfH(30),
    resizeMode: 'contain',
  },
  canceltextinput: {
    backgroundColor: '#f5f5f5', 
    borderRadius: 10, 
    paddingLeft: RfW(10), 
    marginLeft: RfW(20), 
    marginRight: RfW(20), 
    minHeight: 100,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  }
});
export default styles;
