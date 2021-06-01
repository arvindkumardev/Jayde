import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import PropTypes from 'prop-types';

import { RfH } from '../../utils/helpers';
import { styles } from './styles';
import {
    CustomText,
    CustomTextInput,
} from '../';
import { Colors } from '../../theme';


function UploadDocument(props) {
    const { isVisible, handleClose, handleSubmit } = props;
    const [comment, setComment] = useState('');
    const [clickNext, setClickNext] = useState(false);

    useEffect(() => {
        setComment('');
    }, []);

    const onSubmit = () => {
        setClickNext(true);
        if (comment.length !== 0) {
            handleClose();
            handleSubmit();
        }
    }

    return (
        <Modal animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={handleClose}>

            <KeyboardAvoidingView
                style={styles.mainModal}
                behavior={Platform.select({ android: '', ios: 'position' })}
                enabled>

                <View style={styles.bottomContainer}>

                    <CustomTextInput
                        label={''}
                        inputLabelStyle={styles.inputLabelStyle}
                        textInputStyle={styles.textInputStyle}
                        placeholder={'Comments :'}
                        textInputInnerContainer={{
                            backgroundColor: Colors.paleGrey,
                            borderRadius: RfH(13),
                            paddingVertical: RfH(14),
                        }}
                        value={comment}
                        returnKeyType="done"
                        onChangeHandler={(value) => setComment(value)}
                        error={clickNext && comment.length === 0 && 'Please provide comments'}
                        showClearButton={false}
                        multiline={true}
                        noOfLines={3}
                    />

                    <TouchableOpacity activeOpacity={0.8} style={styles.submitButton} onPress={onSubmit} activeOpacity={0.7}>
                        <CustomText fontSize={17} fontWeight={'500'} color={Colors.blue} >SUBMIT</CustomText>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

UploadDocument.propTypes = {
    isVisible: PropTypes.bool,
    handleClose: PropTypes.func,
    handleSubmit: PropTypes.func,
};

UploadDocument.defaultProps = {
    isVisible: false,
    handleClose: null,
    handleSubmit: null,
};


export default UploadDocument;
