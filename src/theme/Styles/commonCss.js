import { StyleSheet } from 'react-native';
import Colors from '../Colors';
import Fonts from '../Fonts';
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
  },
  emptyHeight: {
    backgroundColor: 'transparent',
    height: RfH(23),
    justifyContent: 'center',
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

  homeImgEmpty: {
    width: RfW(186),
    height: RfH(159),
    resizeMode: "contain"
  },

  imgOrders: {
    width: RfW(66),
    height: RfH(66),
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

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  cardStyle: {
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginTop:  RfH(20),
    marginLeft:  RfW(15),
    marginRight:  RfW(15),
    borderRadius:  RfH(10),
  },

  userCardStyle: {
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginTop:  RfH(20),
    marginLeft:  RfW(24),
    marginRight:  RfW(24),
    borderRadius:  RfH(10),
  },

  itemBtn: {
    borderRadius: 10,
    backgroundColor: Colors.mangoTwo,
    width: RfW(66),
    height: RfH(23),
    justifyContent: 'center',
    marginLeft: RfW(5),
  }

});

export default commonCss;