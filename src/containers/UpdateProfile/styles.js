import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';

const styles = StyleSheet.create({

  boxView: {
    backgroundColor: '#f5f5f5', 
    borderRadius: 10, 
    marginTop: RfH(20), 
    marginLeft: RfW(20),
    marginRight: RfW(20),
  },
  btnContainer:{
    marginLeft: RfW(20),
    marginRight: RfW(20),
  },
  profileButton: {
    backgroundColor: '#F7A435',
    paddingHorizontal: RfW(10),
    paddingVertical: RfH(11),
    borderRadius: 10,
    marginTop: RfH(35),
    marginLeft: RfW(3),
  },
  businessButton: {
    backgroundColor: '#fff',
    paddingHorizontal: RfW(10),
    paddingVertical: RfH(10),
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
    marginTop: RfH(35),
    marginRight: RfW(5),
  },
  completelaterbtn: {
    backgroundColor: '#fff',
    width: RfW(155),
    height: RfH(44),
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
  },
});
export default styles;
