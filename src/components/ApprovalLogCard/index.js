import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { Images, Colors } from '../../theme';
import { CustomText, IconWrapper, CustomImage } from '../';
import { RfH, RfW } from '../../utils/helpers';

const ApprovalLogCard = (props) => {
    const { item, index, } = props;

    return (
        <View style={styles.approvalCard} key={index}>
            <CustomImage
                image={Images.userPlaceHolderSquare}
                imageWidth={RfW(42)}
                imageHeight={RfH(44)}
                imageResizeMode={'contain'}
            />
            <View style={styles.approvalDetail}>
                <CustomText fontSize={17} color={Colors.blackThree} fontWeight={'500'}>
                    Rajesh Kumar</CustomText>
                <CustomText fontSize={15} color={Colors.grey} styling={{ paddingTop: RfH(3) }}>
                    Senior Manager</CustomText>
                <CustomText fontSize={13} color={Colors.blackThree} styling={{ paddingTop: RfH(3) }}>
                    Comments : Approving request</CustomText>
                <CustomText fontSize={10} color={Colors.blackThree} styling={{ paddingTop: RfH(3) }}>
                    02-03-2020 08:35 AM</CustomText>
            </View>

            <IconWrapper
                iconImage={Images.greenCheck}
                iconWidth={RfH(34)}
                iconHeight={RfH(34)}
            />
        </View>
    );
};

ApprovalLogCard.propTypes = {
    item: PropTypes.any,
    index: PropTypes.number,
};
ApprovalLogCard.defaultProps = {
    item: {},
    index: 0,
};
export default ApprovalLogCard;
