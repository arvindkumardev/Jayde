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
    width: 310,
    height: 200,
    backgroundColor: Colors.grayBackground,
    borderRadius: 10,
    marginTop: 25,
  },

  title: {
    textAlign: 'center',
    marginTop: 35,
  },

  bdrclr: {
    borderColor: '#707070',
    borderWidth: 0.4,
    width: '90%',
  },
  inputText: {
    backgroundColor: '#e4e4e4',
    borderRadius: 10,
    paddingLeft: 15,
    fontFamily: Fonts.regular,
  },
  btnContainer: {
    marginTop: 100,
    marginLeft: 24,
    marginRight: 24,
  },
  confirmBtnSmall: {
    borderRadius: 10,
    backgroundColor: Colors.mangoTwo,
    width: 54,
    height: 23,
    justifyContent: 'center',
    marginLeft: 5,
  },
  confirmBtn: {
    backgroundColor: '#F7A435',
    width: 150,
    height: 44,
    borderRadius: 10,
  },
  cancelBtn: {
    backgroundColor: '#fff',
    width: 150,
    height: 44,
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
  },
  boxxView: {
    backgroundColor: Colors.grayBackground,
    borderRadius: 10,
    marginLeft: 24,
    marginRight: 24,
  },

  imgCloud: {
    width: RfW(200),
    height: RfH(200),
    resizeMode: "contain"
  },
  paymentboxView: {
    backgroundColor: Colors.grayBackground, 
    borderRadius: 10, 
  },
});

export default commonCss;