import {Modal, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import React, { useState} from 'react';
import {RfH, RfW} from '../../utils/helpers';
import {styles} from './styles';
import DocumentPicker from 'react-native-document-picker';
import PropTypes from 'prop-types';
import IconButtonWrapper from '../IconWrapper';
import {Images} from '../../theme';
import {isEmpty, map} from 'lodash';
import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-uuid';

const RNFS = require('react-native-fs');
const CAMERA = 1;
const GALLERY = 2;
const FILE = 3;



function UploadDocument(props) {
    const { isVisible, handleClose, isPhotoPickerVisible, isFilePickerVisible, handleUpload, snapCount } = props;
    const [imageSet, updateImageSet] = useState([]);
    const [isPickerVisible, setPickerVisibility] = useState(true);
    const [isPreviewVisible, setPreviewVisibility] = useState(false);
    const [recentImage, setRecentImage] = useState({});
    const [selectedOption, setOption] = useState('');    
 
    const closeWindow = () => {
        handleClose();
        setPickerVisibility(true);
        setPreviewVisibility(false);
        updateImageSet([]);
    };

    const submitDoc = () => {
        const formData = new FormData();
        imageSet.map(item => (
            formData.append('file', {
                name: item.fileName,
                type: item.mime,
                uri: item.path,
            })
        ));       
        closeWindow();
    };


    const createTempFile = (base64) => {
        const path = RNFS.DocumentDirectoryPath + '/temp.pdf';
        RNFS.writeFile(path, base64, 'base64')
            .then((success) => {
                handleUpload({
                    base64: base64,
                    file: Platform.OS==='android'? 'file:///'+path: path,
                    // mime:'application/pdf'
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

  


    const handleDelete = () => {
        const temp = imageSet.filter(item => item.path !== recentImage.path);
        updateImageSet(temp);
        if (isEmpty(temp)) {
            setPickerVisibility(true);
            setPreviewVisibility(false);
        } else {
            setRecentImage(temp[0]);
        }
    };

    const openCamera = () => {
        ImagePicker.openCamera({
            width: 800,
            height: 800,
            // cropping: true,
            compressImageMaxHeight: 600,
            compressImageMaxWidth: 600,
            compressImageQuality: Platform.OS === 'android' ? 0.2 : 0.2,
            mediaType:'photo'
        }).then(image => {
            console.log('image-', image);
            const tempImageName = uuid()+'.jpg';
            updateImageSet([...imageSet, { path: image.path, fileName: tempImageName, mime: image.mime }]);
            setPreviewVisibility(true);
            setRecentImage({ path: image.path, fileName: tempImageName, mime: image.mime });
        }).catch(err => {
            // alertBox('Required permission missing',
            //     'Please grant permission to access camera', {
            //     positiveText: 'Settings',
            //     onPositiveClick: () => {
            //         Linking.openSettings();
            //     },
            //     negativeText: 'Cancel',
            //         onNegativeClick:()=>{
            //         }
            // });
            closeWindow();
        });
    };

    const openGallery = () => {
        ImagePicker.openPicker({
            width: 800,
            height: 800,
            // cropping: true,
            compressImageMaxHeight:600,
            compressImageMaxWidth:600,
            multiple: snapCount > 1 ? true : false,
            maxFiles: snapCount - imageSet.length,
            showsSelectedCount: true,
            compressImageQuality: Platform.OS === 'android' ? 0.2 : 0.2,
            mediaType:'photo'
        }).then(images => {
            console.log('gallery image-', images);
            const temp = images.map(item => ({ path: item.path, fileName: uuid()+'.jpg', mime: item.mime }));
            updateImageSet([...imageSet, ...temp]);
            setPreviewVisibility(true);
            setRecentImage(temp[0]);
        }).catch(err => {
            // alertBox('Required permission missing',
            //     'Please grant permission to access photo gallery', {
            //     positiveText: 'Settings',
            //     onPositiveClick: () => {
            //         Linking.openSettings();
            //     },
            //     negativeText: 'Cancel',
            //         onNegativeClick:()=>{
            //         }
            // });
            closeWindow();
        });
    };

    const editImage = () => {
        ImagePicker.openCropper({
            path: recentImage.path,
            width: 800,
            height: 800
        }).then(image => {
            // console.log(image);
            // console.log('imageSet--', imageSet)
            const temp = imageSet.map(item => {
                if (item.path === recentImage.path) {
                    item.path = image.path;
                    setRecentImage(item);
                }
                return item;
            });
            updateImageSet(temp);
        });
    };

    const openDocPicker = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            console.log('res', res);
            handleUpload({base64: '', file: res.uri, type:res.type});
            closeWindow();
            // RNFS.readFile(res.uri, 'base64')
            //     .then(data => {
            //         console.log(data);
            //         handleUpload({
            //             base64: data,
            //             file: res.uri,
            //             // mime: res.type
            //         });
            //         closeWindow();
            //     });
        } catch (err) {
            console.log('err', err);
            if (DocumentPicker.isCancel(err)) {
                closeWindow();
            } else {
                throw err;
            }
        }
    };

    const addMoreImage = () => {
        if (selectedOption === CAMERA) {
            openCamera();
        } else if (selectedOption === GALLERY) {
            openGallery();
        } else if (selectedOption === FILE) {
            openDocPicker();
        }
    };

    

    const topHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <IconButtonWrapper
                    iconImage={Images.close}
                    iconWidth={RfW(25)}
                    iconHeight={RfH(25)}
                    containerStyling={{
                        justifyContent: 'center', paddingTop: RfH(9),
                        paddingBottom: RfH(14), paddingHorizontal: RfW(15)
                    }}
                    submitFunction={closeWindow}
                />

                <View style={{ alignItems: 'flex-end' }}>
                    <IconButtonWrapper
                        iconImage={Images.delete}
                        iconWidth={RfW(15)}
                        iconHeight={RfH(22)}
                        containerStyling={{
                            alignSelf: 'center',
                            paddingTop: RfH(9),
                            paddingBottom: RfH(14),
                            // paddingHorizontal: RfW(15)
                            paddingRight: RfW(20)
                        }}
                        submitFunction={handleDelete}
                    />
                </View>
            </View>
        );
    };

    const filePicker = () => {
        return (
            <TouchableWithoutFeedback onPress={handleClose}>

                <View style={styles.mainModal}>
                    <SafeAreaView>
                        <View style={styles.bottomContainer}>
                            <View style={styles.uploadMsgView}>
                                <Text style={styles.label1}>{'How would you like to upload your document?'}</Text>
                                <View style={styles.saparator} />
                                {isPhotoPickerVisible && <>
                                    <TouchableOpacity activeOpacity={0.4}
                                        onPress={() => {
                                            setPickerVisibility(false);
                                            setOption(CAMERA);
                                            setTimeout(() => {
                                                openCamera();
                                            }, 200);
                                        }}
                                    ><Text style={styles.label}>Camera</Text>
                                    </TouchableOpacity>
                                    <View style={styles.saparator} />
                                    <TouchableOpacity activeOpacity={0.4}
                                        onPress={() => {
                                            setPickerVisibility(false);
                                            setOption(GALLERY);
                                            setTimeout(() => {
                                                openGallery();
                                            }, 200);
                                        }}
                                    ><Text style={styles.label}>Gallery</Text>
                                    </TouchableOpacity><View style={styles.saparator} />
                                </>}

                                {isFilePickerVisible &&
                                    <TouchableOpacity activeOpacity={0.4}
                                        onPress={() => {
                                            setOption(FILE);
                                            setPickerVisibility(false);
                                            setTimeout(() => {
                                                openDocPicker();
                                            }, 200);
                                        }}
                                    ><Text style={styles.label}>Files</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            <View style={styles.cancelView}>
                                <Text style={styles.cancelLabel} onPress={handleClose}>Cancel</Text>
                            </View>
                        </View>
                    </SafeAreaView>
                </View>
            </TouchableWithoutFeedback>
        );
    };
    const preview = () => {
        return (
            <View style={{ flex: 1, backgroundColor: '#000' }}>
                <SafeAreaView>
                    {topHeader()}
                    <View style={styles.imageView}>
                        <IconButtonWrapper
                            iconImage={recentImage.path}
                            iconWidth={RfW(350)}
                            iconHeight={RfH(440)}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: RfW(16) }}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            decelerationRate="fast"
                        >
                            {!isEmpty(imageSet) && map(imageSet, (item) =>
                                (<View style={styles.thumbView}>
                                    <IconButtonWrapper
                                        iconImage={item.path}
                                        iconWidth={RfW(75)}
                                        iconHeight={RfW(75)}
                                        styling={{ borderRadius: RfW(15) }}
                                        imageResizeMode={'cover'}
                                        submitFunction={() => setRecentImage(item)}
                                    />
                                </View>))
                            }
                            {
                                imageSet.length >= snapCount ? null :
                                    <View style={[styles.thumbView, { marginLeft: RfW(0) }]}>
                                        <IconButtonWrapper
                                            iconImage={Images.maximise}
                                            iconWidth={RfW(17.5)}
                                            iconHeight={RfW(17.5)}
                                            submitFunction={addMoreImage}
                                        />
                                    </View>}
                        </ScrollView>
                    </View>
                </SafeAreaView>
                <View style={{ zIndex: 9999, flex: 1, justifyContent: 'center', paddingVertical:RfH(10) }}>
                    <TouchableOpacity
                        style={styles.registrationContainer}
                        activeOpacity={0.5}
                        onPress={submitDoc}
                    >
                        <Text style={styles.registrationText}>Submit documents</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };


    return (
        <View>
            <Modal animationType="slide" transparent={true}
                visible={isVisible} onRequestClose={handleClose}>
                {isPickerVisible && filePicker()}

                {isPreviewVisible && preview()}
            </Modal>
        </View>
    );
}

UploadDocument.propTypes = {
    isVisible: PropTypes.bool,
    handleClose: PropTypes.func,
    isFilePickerVisible: PropTypes.bool,
    isPhotoPickerVisible: PropTypes.bool,
    handleUpload: PropTypes.func,
    snapCount: PropTypes.number,
};

UploadDocument.defaultProps = {
    isVisible: false,
    handleClose: null,
    isPhotoPickerVisible: true,
    isFilePickerVisible: false,
    handleUpload: null,
    snapCount: 1
};


export default UploadDocument;
