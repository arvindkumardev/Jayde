import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { RfH, RfW } from '../../utils/helpers';
import { CustomText } from '../';
import { Colors, Images } from '../../theme';
import { useNavigation } from '@react-navigation/native';

const ApprovalsListItems = ({ item, index, onPress, showTopHeader }) => {
  const navigation = useNavigation();

  const Items = () => {
    return (
      <TouchableOpacity
        onPress={() => onPress()}
        style={styles.requestCellView}>

        {showTopHeader && <View
          style={styles.topHeader}>
          <CustomText
            fontWeight={'bold'}
            fontSize={16}
            color={Colors.primaryBlack}
            styling={[styles.desBold]}>
            6040230
          </CustomText>
          <View style={styles.statusButton}>
            <Image
              resizeMode={'contain'}
              source={Images.clock}
              style={{ alignSelf: 'center' }}
            />
            <CustomText
              fontSize={12}
              fontWeight={'bold'}
              color={Colors.white}
              styling={{ paddingLeft: RfW(6) }}>
              Pending
            </CustomText>
          </View>
        </View>}

        <View style={styles.cellContainerView}>
          <View style={styles.imageView}>
            <Image
              resizeMode={'contain'}
              source={Images.circularUserPlaceHolder}
              style={{
                alignSelf: 'center',
                borderRadius: RfH(66) / 2,
                height: RfH(66),
                width: RfH(66),
              }}
            />
          </View>

          <View style={styles.rightCellView}>
            <View style={styles.topTitle}>
              <CustomText
                fontWeight={'bold'}
                fontSize={16}
                color={Colors.primaryBlack}
                styling={[styles.desBold]}>
                Sara Mathews
              </CustomText>
              <View style={{ height: RfH(6) }} />
              <CustomText
                fontSize={12}
                color={Colors.black}
                styling={[styles.desBold]}>
                26-Feb-21
              </CustomText>
              <View style={{ height: RfH(6) }} />
              <CustomText
                fontSize={12}
                color={Colors.black}
                styling={[styles.desBold]}>
                Emaar Development P.J.S.C Digital Wire TT 6040230 For AED
                517,928.00 requires your approval
              </CustomText>
            </View>

          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return Items()
};

ApprovalsListItems.propTypes = {
  item: PropTypes.any,
  onPress: PropTypes.func,
  showTopHeader: PropTypes.bool,
  index: PropTypes.number,
};
ApprovalsListItems.defaultProps = {
  onPress: null,
  item: {},
  showTopHeader: true,
  index: 0,
};
export default ApprovalsListItems;
