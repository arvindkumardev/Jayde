import {
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import { CustomText } from '../';
import styles from './styles';
import { Colors } from '../../theme';
import { RfH } from '../../utils/helpers';

function ActionSheet(props) {
    const { isVisible, handleCancel, cancelText, topLabel, actions, isTopLabelVisible, selectedIndex } = props;
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={handleCancel}>
            <TouchableWithoutFeedback
            // onPress={handleCancel}
            >
                <View style={styles.mainModalContainer}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalInnerContainer}>

                            {isTopLabelVisible &&
                                <CustomText fontSize={13} color={'#8f8f8f'} fontWeight={'600'} styling={{ paddingVertical: RfH(15), textAlign: 'center', }}>
                                    {topLabel}</CustomText>}

                            {actions && map(actions, (action, index) => (<View key={index}>

                                <View style={styles.modalSeparator} />
                                <TouchableOpacity activeOpacity={0.8} onPress={() => action.handler(index)}>
                                    <CustomText fontSize={18} color={Colors.blue} styling={{ paddingVertical: RfH(16), textAlign: 'center', }}>
                                        {action.label}</CustomText>
                                    {/* <Text style={[styles.modalActionLabel, action.labelColor && { color: action.labelColor }]}>
                                        {selectedIndex !== null && selectedIndex === index ? <Text> ✓  </Text> : null}
                                        {action.label}</Text> */}
                                </TouchableOpacity>
                            </View>))}
                        </View>
                        <View style={styles.modalDismissContainer}>
                            <CustomText fontSize={18} color={Colors.red} styling={{ paddingVertical: RfH(16), textAlign: 'center', }}
                                onPress={handleCancel}>{cancelText}</CustomText>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

ActionSheet.propTypes = {
    isVisible: PropTypes.bool,
    handleCancel: PropTypes.func,
    cancelText: PropTypes.string,
    topLabel: PropTypes.string,
    actions: PropTypes.array,
    isTopLabelVisible: PropTypes.bool,
    selectedIndex: PropTypes.number,
};
ActionSheet.defaultProps = {
    isVisible: false,
    handleCancel: null,
    cancelText: 'Cancel',
    topLabel: 'Actions',
    actions: [],
    isTopLabelVisible: true,
};
export default ActionSheet;
