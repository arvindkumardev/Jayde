import React from 'react';
import { View ,Image} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import { Images, Colors } from '../../theme';
import { CustomText, IconWrapper, CustomImage } from '../';
import {RfH, RfW} from '../../utils/helpers';

const ApprovalDetailCard = (props) => {
    const { item} = props;
    return (
            <View style={styles.shadowView}>
              <LinearGradient
                style={[[styles.headerTwoContainer]]}
                locations={[0, 1]}
                colors={['#64B6E9', '#6932CE']}>
                <View
                  style={[
                    styles.topTitle,
                    {
                      paddingBottom: RfH(12),
                      borderBottomWidth: 1,
                    },
                  ]}>
                  <CustomText fontSize={12} color={Colors.white}>
                    R12345
                  </CustomText>
                  <View style={styles.statusButton}>
                    <Image
                      resizeMode={'contain'}
                      source={Images.clock}
                      style={{alignSelf: 'center'}}
                    />
                    <CustomText
                      fontSize={12}
                      fontWeight={'bold'}
                      color={Colors.white}
                      styling={{paddingLeft: RfW(8.5)}}>
                      Pending
                    </CustomText>
                  </View>
                </View>
                <View style={[styles.topTitle]}>
                  <CustomText fontSize={16} fontWeight={'bold'} color={Colors.white}>
                    Mohammad Khan
                  </CustomText>
                </View>

                <View
                  style={[
                    styles.topTitle,
                  ]}>
                  <View>
                    <CustomText
                      fontSize={12}
                      fontWeight={'bold'}
                      color={Colors.white}>
                      SUBMITTED ON
                    </CustomText>
                    <CustomText
                      fontSize={14}
                      styling={styles.spaceHeight}
                      color={Colors.white}>
                      28-Feb-21
                    </CustomText>
                  </View>
                </View>

                <View style={[styles.topTitle]}>
                  <View>
                    <CustomText
                      fontSize={12}
                      fontWeight={'bold'}
                      color={Colors.white}>
                      APPROVAL TYPE
                    </CustomText>
                    <CustomText
                      fontSize={14}
                      styling={styles.spaceHeight}
                      color={Colors.white}>
                      Deposit Exception
                    </CustomText>
                  </View>
                </View>

                <View style={[styles.topTitle]}>
                  <View>
                    <CustomText
                      fontSize={12}
                      fontWeight={'bold'}
                      color={Colors.white}>
                     TYPE
                    </CustomText>
                    <CustomText
                      fontSize={14}
                      styling={styles.spaceHeight}
                      color={Colors.white}>
                     Emaar Development P.J.S.C Digital Wire TT 6040230 For AED 517,928.00 requires your approval
                    </CustomText>
                  </View>
                </View>

                <View style={[styles.topTitle]}>
                  <View>
                    <CustomText
                      fontSize={12}
                      fontWeight={'bold'}
                      color={Colors.white}>
                      CUSTOMER UNITS
                    </CustomText>
                    <CustomText
                      fontSize={14}
                      styling={styles.spaceHeight}
                      color={Colors.white}>
                      2
                    </CustomText>
                  </View>
                </View>

                <View style={[styles.topTitle]}>
                  <View>
                    <CustomText
                      fontSize={12}
                      fontWeight={'bold'}
                      color={Colors.white}>
                     CATEGORY
                    </CustomText>
                    <CustomText
                      fontSize={14}
                      styling={styles.spaceHeight}
                      color={Colors.white}>
                   {`Apparel & Accessories`}
                    </CustomText>
                  </View>
                </View>
              </LinearGradient>
            </View>
          );
};

ApprovalDetailCard.propTypes = {
    item: PropTypes.any,
};
ApprovalDetailCard.defaultProps = {
    item: {},
};
export default ApprovalDetailCard;
