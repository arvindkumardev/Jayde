import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';
import Font from '../../theme/Fonts';

const styles = StyleSheet.create({
 
  requestCellView: {
    borderRadius: RfH(20),
    backgroundColor: Colors.white,
    marginHorizontal: RfW(16),
    marginTop: RfH(23),
    shadowColor: 'rgba(0,0,0,0.07)',
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation:5
  },
  topHeader:{
    flex: 1,
    paddingTop: RfH(11),
    paddingBottom: RfH(10.5),
    borderBottomWidth: 1,
    borderColor: Colors.grayLine,
    alignItems: 'center',
    paddingHorizontal: RfW(21),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cellContainerView: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: RfH(16),
    paddingHorizontal: RfW(21),
    paddingBottom: RfH(16),
  },
  imageStyle: {
    borderRadius: 16,
    overflow: 'visible',
    width: 'auto',
  },
  cell2ContainerView: {
    flex: 1,
    paddingTop: RfH(11),
    paddingBottom: RfH(20),
  },
  lisView: {
    backgroundColor: Colors.appBackground,
    flex: 1,
  },
  desBold: {
    textTransform: 'uppercase',
  },

  desReg: {
    lineHeight: RfH(16),
  },
  dotView: {
    width: RfH(4),
    height: RfH(4),
    backgroundColor: Colors.black,
    borderRadius: RfH(2),
    marginRight: RfW(4),
    marginTop: RfH(7),
  },
  dateText: {
    fontFamily: Font.bold,
    lineHeight: RfH(16),
  },
  leftCellView: {},
  rightCellView: {
    paddingLeft: RfH(21),
    paddingRight: RfH(21),
    alignItems: 'flex-start',
    flex: 1,
  },
  topTitle: {
    flex: 1,
    paddingTop: RfH(2),
  },
  imageView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  statusButton: {
    flexDirection: 'row',
    backgroundColor: Colors.skyColor,
    paddingHorizontal: RfW(8),
    paddingVertical: RfH(4.5),
    borderRadius: RfH(8),
  },
});
export default styles;
