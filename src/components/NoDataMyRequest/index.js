import React from 'react';
import { Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { Images } from '../../theme';

const NoDataMyRequest = (props) => {
    const { heading, message } = props;
    return (
        <View style={styles.warningCard}>
            <View style={styles.imageContainer}>
                <Image source={Images.anger} style={styles.imageStyle} resizeMode={'cover'} />
                <Text style={styles.warningInfoText}>{heading}</Text>
                <Text style={styles.warningInfoMessage}>{message}</Text>
            </View>
        </View>);
};

NoDataMyRequest.propTypes = {
    heading: PropTypes.string,
    message: PropTypes.string,
};
NoDataMyRequest.defaultProps = {
    heading: 'You’ve not created any request',
    message: 'Once you submit a request, you can track the approval here.',
};

export default NoDataMyRequest;
