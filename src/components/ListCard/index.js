import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {map} from 'lodash';

import styles from './styles';
import {Images, Colors} from '../../theme';
import {CustomText, IconWrapper, CustomImage} from '../';
import {RfH, RfW} from '../../utils/helpers';
import { getBgColor } from '../../utils/helpers';

const ListCard = (props) => {
  const {item, index, onPress} = props;

  return (
    <TouchableOpacity
      key={index.toString()}
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.7}>
      <CustomText fontSize={13} color={Colors.blue} fontWeight={'500'}>
        {item.ticketNumber}
      </CustomText>
      <View style={styles.rowView}>
        <CustomText
          fontSize={17}
          color={Colors.blackOne}
          fontWeight={'500'}
          styling={{marginTop: RfH(12)}}>
          {item.title}
        </CustomText>
        {item.amount && (
          <CustomText
            fontSize={17}
            color={Colors.blackOne}
            fontWeight={'500'}
            styling={{marginTop: RfH(12)}}>
            {item.amount}
          </CustomText>
        )}
      </View>
      {item.description &&
      <CustomText
        fontSize={15}
        color={Colors.grey}
        fontWeight={'500'}
        styling={{marginTop: RfH(2)}}>
        {item.description}
      </CustomText>}

      <View style={styles.cardHeader}>
        <View style={{flex: 1.4}}>
          <View style={{flexDirection: 'row'}}>
            <IconWrapper
              iconImage={Images.document}
              iconWidth={RfW(14.3)}
              iconHeight={RfH(17.6)}
            />
            <CustomText
              fontSize={13}
              color={Colors.grey}
              fontWeight={'500'}
              styling={{marginLeft: RfW(6.7)}}>
              {`Created by : ${item.createdBy}`}
            </CustomText>
          </View>
        </View>

        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <IconWrapper
              iconImage={Images.clock}
              iconWidth={RfH(15.3)}
              iconHeight={RfH(15.3)}
            />
            <CustomText
              fontSize={13}
              color={Colors.grey}
              fontWeight={'500'}
              styling={{marginLeft: RfW(6.7)}}>
              {`Dated : ${item.dated}`}
            </CustomText>
          </View>
        </View>
      </View>

      <View style={styles.cardHeaderOne}>
        <View style={{height: RfH(35)}}>
          {map(item.statusLog, (item, index) => (
            <View
              key={index}
              style={[styles.userIcon, {marginLeft: index * RfW(24)}]}>
              <CustomImage
                image={Images.circularUserPlaceHolder}
                imageWidth={RfH(35)}
                imageHeight={RfH(35)}
                imageResizeMode={'contain'}
              />
            </View>
          ))}
        </View>
        {item.status && (
          <View style={[styles.pendingButton,{backgroundColor: getBgColor(item.status)}]}>
            <CustomText fontSize={10} color={Colors.white} fontWeight={'500'}>
              {item.status}
            </CustomText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

ListCard.propTypes = {
  onPress: PropTypes.func,
  item: PropTypes.any,
  index: PropTypes.number,
};
ListCard.defaultProps = {
  onPress: null,
  item: {},
  index: 0,
};
export default ListCard;
