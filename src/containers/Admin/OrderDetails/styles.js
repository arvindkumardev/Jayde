import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../../utils/helpers';
import {Colors} from '../../../theme';

const styles = StyleSheet.create({

  boxView: {
    width: RfW(320), 
    height: RfH(260), 
    backgroundColor: '#f5f5f5', 
    borderRadius: 10, 
    marginTop: RfH(35), 
    marginLeft: RfW(20),
  },
  btnContainer:{
    marginLeft: RfW(20),
    marginTop: RfH(140),
    marginRight: RfW(10),
  },
  confirmbtn: {
    backgroundColor: '#F7A435',
    paddingHorizontal: RfW(10),
    paddingVertical: RfH(11),
    borderRadius: 10,
  },
  aggregatebtn: {
    backgroundColor: '#fff',
    paddingHorizontal: RfW(10),
    paddingVertical: RfH(10),
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
  },
});
export default styles;
