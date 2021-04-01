import { StyleSheet } from 'react-native';
import Colors from '../Colors';
import Fonts from '../Fonts';

const container = StyleSheet.create({
  btnPrimary: {
    backgroundColor: Colors.mango,
  },
  btnSecandary: {
    backgroundColor: Colors.grayBackground,
  },
  br10: {
    borderRadius: 10,
  },
  br13:{
    borderRadius: 13
},
  w100: {
    width: '100%',
  },
  w45: {
    width: '45%',
  },
  w85:{
    width: '85%'
},
  primaryColor: {
    color: Colors.mango,
  },
  whitecolor:{
    color: Colors.white
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
    flexDirection:'row',
},
flex1: {
    flex: 1,
},
borderwidth1: {
    borderWidth: 1,
},
flexpointone: {
    flex: .1,
},
flexpointthree: {
    flex: .3,
},
flexpointfour: {
  flex: .4,
},
flexpointsix: {
  flex: .6,
},
flexpointseven: {
  flex: .7,
},
flexpointnine: {
    flex: .9,
},
});

export default container;
