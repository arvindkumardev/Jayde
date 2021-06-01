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
     marginTop: 20,
     borderWidth: 1,
     width: '90%',
     marginLeft: 17,
     marginRight: 17,
   },
  boxContent: {
    // width: 320, 
    // flex: 1,
    backgroundColor: '#ffffff',  
    borderRadius: 10, 
    marginLeft: 24, 
    marginRight: 24,
    marginTop: 35,
    // marginBottom: 30,
    marginBottom: 10,
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
    width: 160,
    height: 44,
    borderRadius: 10,
    marginTop: 40,
  },
  confirmbtn: {
    backgroundColor: '#f75006',
    width: 160,
    height: 44,
    borderRadius: 10,
    marginTop: 12,
  },
  rejectImg: {
    marginTop: 30,
    resizeMode: 'contain',
  },
  canceltextinput: {
    backgroundColor: '#f5f5f5', 
    borderRadius: 10, 
    paddingLeft: 10, 
    marginLeft: 20, 
    marginRight: 20, 
    minHeight: 100,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  }
});
export default styles;
