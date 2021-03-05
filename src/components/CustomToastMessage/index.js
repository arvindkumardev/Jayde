import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { IconWrapper } from '../';
import PropTypes from 'prop-types';

const CustomToastMessage = (props) => {
    const { msg, iconImage } = props;
    return (
        <View style={styles.toastContainer}>
            <View style={styles.toastInnerContainer}>
                <IconWrapper iconImage={iconImage} iconHeight={45} iconWidth={45} />
                <View style={styles.toastLabelContainer}>
                    <Text style={styles.toastLabel}>{msg}</Text>
                </View>
            </View>
        </View>
    );
};

CustomToastMessage.propTypes = {
    iconImage: PropTypes.any,
    msg: PropTypes.string
};

export default CustomToastMessage;
