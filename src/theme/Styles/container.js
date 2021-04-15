import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import Colors from '../Colors';
import Fonts from '../Fonts';

const container = StyleSheet.create({
  btnPrimary: {
    backgroundColor: Colors.mango,
  },
  btnSecandary: {
    backgroundColor: Colors.grayBackground,
  },
 whitebackgrnd: {
    backgroundColor: Colors.white,
  },
  br10: {
    borderRadius: 10,
  },
  br13: {
    borderRadius: 13,
  },
  w100: {
    width: '100%',
  },
  w45: {
    width: '45%',
  },
  w85: {
    width: '85%',
  },
  primaryColor: {
    color: Colors.mango,
  },
  whitecolor: {
    color: Colors.white,
  },
  flexRowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
  topBorderGray: {
    paddingTop: 20,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  bottomBorderGray: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  flex1SpaceBetween: {
    flex: 1,
    justifyContent: 'space-between',
  },
  flexDir: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  borderwidth1: {
    borderWidth: 1,
  },	
  borderwidth2: {
    borderWidth: 2,
  },
  flexpointone: {
    flex: 0.1,
  },
  flexpointthree: {
    flex: 0.3,
  },
  flexpointfour: {
    flex: 0.4,
  },
  flexpointsix: {
    flex: 0.6,
  },
  flexpointseven: {
    flex: 0.7,
  },
  flexpointnine: {
    flex: 0.9,
  },
  borderColorMango: {
    borderColor: Colors.mango,
  },
});

export default container;
