import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { Images } from '../../theme';

const NoDataApprovalRequest = (props) => {
    const { heading, message, onListRefresh } = props;
    return (
        <View style={styles.warningCard}>
            <View style={styles.imageContainer}>
                <Image source={Images.checkedIom} style={styles.imageStyle} resizeMode={'cover'} />
                <Text style={styles.warningInfoText}>{heading}</Text>
                <Text style={styles.warningInfoMessage}>{message}</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={onListRefresh} style={styles.refreshButton}>
                    <Text style={[styles.warningInfoText, { color: '#1350eb' }]}>Refresh</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

NoDataApprovalRequest.propTypes = {
    heading: PropTypes.string,
    message: PropTypes.string,
    onListRefresh: PropTypes.func
};
NoDataApprovalRequest.defaultProps = {
    heading: 'You’re all caught up',
    message: 'Once you have a request pending for approval, it will appear here.',
    onListRefresh: null
};
export default NoDataApprovalRequest;
