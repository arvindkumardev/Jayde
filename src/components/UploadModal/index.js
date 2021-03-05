import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import DocumentPicker from 'react-native-document-picker';
import { isEmpty } from 'lodash';
import uuid from 'react-uuid';
const RNFS = require('react-native-fs');

import { alertBox } from '../../utils/helpers';
import { ALLOWED_FILE_SIZE, OPTIONS } from './constant';
import styles from './styles';
import { ActionSheet } from '../';


function UploadModal(props) {
    const { modalVisible, openModal, getCallbackUrl, isDocAllow } = props;
    // const dispatch = useDispatch();

    const compressImage = (imageRes) => {
        ImageResizer.createResizedImage(imageRes.uri, 800, 800, 'JPEG', 80, 0, null)
            .then((response) => {
                if (response.size > ALLOWED_FILE_SIZE) {
                    alertBox('Large File', 'File size should be less than 2Mb');
                } else {
                    const tempImageName = uuid() + '.jpg';
                    RNFS.readFile(response.uri, 'base64')
                        .then(data => {
                            getCallbackUrl({ base64Data: data, fileName: tempImageName, type: 'image/jpg', displayName: imageRes.fileName });
                        });
                }
                // dispatch(loadingSlice.actions.setIsLoading(false));
            })
            .catch(err => {
                // dispatch(loadingSlice.actions.setIsLoading(false));
                return err;
            });
    };

    const handleCamera = () => {
        openModal();
        setTimeout(() => {
            // dispatch(loadingSlice.actions.setIsLoading(true));
            launchCamera(OPTIONS, (imageRes) => {
                if (imageRes.didCancel) {
                    // dispatch(loadingSlice.actions.setIsLoading(false));
                } else if (imageRes.error) {
                    // dispatch(loadingSlice.actions.setIsLoading(false));
                } else {
                    compressImage(imageRes);
                }
            });
        }, 50);
    };

    const handleGallery = () => {
        openModal();
        setTimeout(() => {
            // dispatch(loadingSlice.actions.setIsLoading(true));
            launchImageLibrary(OPTIONS, (imageRes) => {
                if (imageRes.didCancel) {
                    // dispatch(loadingSlice.actions.setIsLoading(false));
                } else if (imageRes.error) {
                    // dispatch(loadingSlice.actions.setIsLoading(false));
                } else {
                    compressImage(imageRes);
                }
            });
        }, 50);
    };

    const handleDoc = async () => {
        openModal();
        // dispatch(loadingSlice.actions.setIsLoading(true));
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            if (res.size > ALLOWED_FILE_SIZE) {
                alertBox('Error', 'File size not allowed');
            } else {
                let tempFileName = uuid();
                if (!isEmpty(res.name)) {
                    const type = res.name.split('.').pop();
                    tempFileName = tempFileName + '.' + type;
                }
                RNFS.readFile(res.uri, 'base64')
                    .then(data => {
                        getCallbackUrl({ base64Data: data, fileName: tempFileName, type: res.type, displayName: res.name });
                    });
            }
            // dispatch(loadingSlice.actions.setIsLoading(false));
        } catch (err) {
            // dispatch(loadingSlice.actions.setIsLoading(false));
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err;
            }
        }
    };

    const withoutDoc = [{ label: 'Camera', handler: handleCamera },
    { label: 'Gallery', handler: handleGallery }];

    const withDoc = [{ label: 'Camera', handler: handleCamera },
    { label: 'Gallery', handler: handleGallery },
    { label: 'Files', handler: handleDoc }];

    return (
        <View style={styles.blockContainer}>
            <ActionSheet
                actions={isDocAllow ? withDoc : withoutDoc}
                cancelText={'Cancel'}
                handleCancel={openModal}
                isVisible={modalVisible}
                topLabel={'How would you like to upload your document?'}
            />
        </View>
    );

}


UploadModal.propTypes = {
    modalVisible: PropTypes.bool,
    openModal: PropTypes.func,
    getCallbackUrl: PropTypes.func,
    isDocAllow: PropTypes.bool,
};
UploadModal.defaultProps = {
    modalVisible: false,
    openModal: null,
    getCallbackUrl: null,
    isDocAllow: false,
};
export default UploadModal;

