import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../utils/helpers';
import Fonts from "../../theme/Fonts";
// import { RFValue } from 'react-native-responsive-fontsize';
// import { STANDARD_SCREEN_SIZE } from '../../../utils/constants';
import { Colors } from '../../theme';

const styles = StyleSheet.create({
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
  headerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: RfH(18),
    paddingBottom: RfH(10),
    paddingHorizontal: RfW(22)
  },

  gradientShadow: {
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 1,
    shadowColor: 'rgba(255,255,255,0.75)',
    shadowRadius: RfH(20),
    backgroundColor: Colors.white,
    elevation: 5,
    borderRadius: RfH(20),
  },

  gradientView: {   
    paddingHorizontal: RfW(22),
    paddingTop: RfH(22),
    paddingBottom: RfH(26),
    borderRadius: RfH(20),
  },

  footerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: RfW(22),
    paddingVertical: RfH(22),
    backgroundColor: Colors.white,
    marginBottom: RfH(100)
  },

  viewLine: {
    flex: 1,
    flexDirection: 'row',
    height: RfH(1),
    backgroundColor: Colors.grayBorder
  },
  listItemInnerView: {
    paddingVertical: RfH(20),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default styles;