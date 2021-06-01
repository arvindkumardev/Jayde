import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import styles from './styles';
import CustomTextInputNew from '../CustomTextInput';
import { RfH, RfW } from '../../utils/helpers';
import { inputs } from '../../utils/constants';

function DocumentDetailModal(props) {
    const { modalVisible, openModal, getParameter, handleDismiss } = props;
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [error, setError] = useState(false);

    const onSubmitEditing = (id) => {
        inputs[id] ? inputs[id].focus() : null;
    };

    useEffect(() => {
        if (modalVisible) {
            setTitle('');
            setNote('');
            setError(false);
        }
    }, [modalVisible]);

    const handleClick = () => {
        if (!isEmpty(title)) {
            openModal();
            getParameter({ title: title, note: note });
        } else {
            setError(true);
        }
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalBottomContainer}>
                    <View style={styles.modalInnerView}>
                        <Text style={styles.modalLabel}>{'Document details'}</Text>
                    </View>
                    <CustomTextInputNew
                        label={'Document Title'}
                        inputLabelStyle={styles.modalLabel1}
                        textInputInnerContainer={styles.textInputInnerContainer}
                        textInputStyle={styles.textInputStyle}
                        placeholder={'Enter document title'}
                        onChangeHandler={(value) => setTitle(value)}
                        value={title}
                        showClearButton={true}
                        returnKeyType={'next'}
                        error={error && isEmpty(title) ? 'Please provide the document title' : ''}
                        maxLength={60}
                        onSubmitEditing={() => onSubmitEditing('notes')}
                    />
                    <Text style={styles.charLen}>{60 - title.length} characters left</Text>
                    <CustomTextInputNew
                        label={'Notes'}
                        inputLabelStyle={styles.modalLabel1}
                        textInputInnerContainer={styles.textInputInnerContainer}
                        textInputStyle={styles.textInputStyle}
                        placeholder={'Enter notes'}
                        onChangeHandler={(value) => setNote(value)}
                        value={note}
                        showClearButton={false}
                        multiline={true}
                        noOfLines={3}
                        returnKeyType={'done'}
                        refKey={'notes'}
                        maxLength={200}
                    />
                    <Text style={styles.charLen}>{200 - note.length} characters left</Text>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between',
                        marginVertical: RfH(20), marginHorizontal: RfW(20)
                    }}>
                        <TouchableOpacity activeOpacity={0.8} style={styles.uploadView} onPress={handleClick}>
                            <Text style={styles.uplodaButton}
                            >Upload</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={styles.dismissView} onPress={handleDismiss}>
                            <Text style={styles.uplodaButton}
                            >Dismiss</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

DocumentDetailModal.propTypes = {
    modalVisible: PropTypes.bool,
    openModal: PropTypes.func,
    getParameter: PropTypes.func,
    handleDismiss: PropTypes.func,
};
DocumentDetailModal.defaultProps = {
    modalVisible: false,
    openModal: null,
    getParameter: null,
    handleDismiss: null
};

export default DocumentDetailModal;
