import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';

const styles = StyleSheet.create({

  boxView: {
    backgroundColor: '#f5f5f5', 
    borderRadius: 10, 
    marginTop: 20, 
    marginLeft: 20,
    marginRight: 20,
  },
  btnContainer:{
    marginLeft: 20,
    marginRight: 20,
  },
  profileButton: {
    backgroundColor: '#F7A435',
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderRadius: 10,
    marginTop: 35,
    marginLeft: 3,
  },
  businessButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
    marginTop: 35,
    marginRight: 5,
  },
  completelaterbtn: {
    backgroundColor: '#fff',
    width: 155,
    height: 44,
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
  },
});
export default styles;
