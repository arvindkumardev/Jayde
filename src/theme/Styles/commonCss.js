import { StyleSheet } from 'react-native';
import Colors from '../Colors';
import Fonts from '../Fonts';
import Spaces from "./spaces";
import { RfH, RfW } from '../../utils/helpers'

const commonCss = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  boxView: {
    width: RfW(310),
    height: RfH(200),
    backgroundColor: Colors.grayBackground,
    borderRadius: 10,
    marginTop: RfH(25),
  },

  title: {
    textAlign: 'center',
    marginTop: RfH(35),
  },

  bdrclr: {
    borderColor: '#707070',
    borderWidth: 0.4,
    width: '90%',
  },
  inputText: {
    backgroundColor: '#e4e4e4',
    borderRadius: 10,
    paddingLeft: RfW(15),
    fontFamily: Fonts.regular,
  },
  btnContainer: {
    marginTop: RfH(100),
    marginLeft: RfW(24),
    marginRight: RfW(24),
  },
  confirmBtnSmall: {
    borderRadius: 10,
    backgroundColor: Colors.mangoTwo,
    width: RfW(54),
    height: RfH(23),
    justifyContent: 'center',
    marginLeft: RfW(5),
  },
  confirmBtn: {
    backgroundColor: '#F7A435',
    width: RfW(150),
    height: RfH(44),
    borderRadius: 10,
  },
  cancelBtn: {
    backgroundColor: '#fff',
    width: RfW(150),
    height: RfH(44),
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
  },
  boxxView: {
    backgroundColor: Colors.grayBackground,
    borderRadius: 10,
    marginLeft: RfW(24),
    marginRight: RfW(24),
  },

  imgCloud: {
    width: RfW(200),
    height: RfH(200),
    resizeMode: "contain"
  },

  imgEmpty: {
    width: RfW(247),
    height: RfH(212),
    resizeMode: "contain"
  },

  paymentboxView: {
    backgroundColor: Colors.grayBackground, 
    borderRadius: 10, 
  },
  btnHeight44: {
    height: RfH(44),
  },
  btnHeightwidth: {
    height: RfH(44),
    paddingHorizontal: RfW(10),
  },
  timeSlotActive: {
    borderLeftColor: Colors.mango,
    borderLeftWidth: RfW(10),
    backgroundColor: Colors.grayLine
  },
  timeSlotInActive: {
    borderLeftColor: 'transparent',
    borderLeftWidth: RfW(10),
    backgroundColor: Colors.white
  },
});

export default commonCss;