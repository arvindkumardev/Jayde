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
 whitebackgrnd: {
    backgroundColor: Colors.white,
  },
  grayBackground: {
    backgroundColor: Colors.warmGrey,
  },
  lightOlive: {
    backgroundColor: Colors.lightOlive,
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
  warmgreycolor: {
    color: Colors.warmGrey,
  },
  flexRowSpaceBetween: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCon: {
    justifyContent: 'center',
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
  flexpointtwo: {
    flex: 0.2,
  },
  flexpointthree: {
    flex: 0.3,
  },
  flexpointfour: {
    flex: 0.4,
  },
  flexpointfive: {
    flex: 0.5,
  },
  flexpointsix: {
    flex: 0.6,
  },
  flexpointseven: {
    flex: 0.7,
  },
  flexpointeight: {
    flex: 0.8,
  },
  flexpointnine: {
    flex: 0.9,
  },
  borderColorMango: {
    borderColor: Colors.mango,
  },
  borderColorLightOlive: {
    borderColor: Colors.lightOlive,
  },
  inputIcon:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor:Colors.grayBackground,
  },
  NoRecordButton: {
    width: 160,
    height : 44,
  },
  
});

export default container;
