import React, {useContext, useEffect, useState, useRef} from 'react';
import {
    Modal,
    View,
    Text
    } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Styles from "./styles";
import { RNCamera } from "react-native-camera";
import { TouchableOpacity } from 'react-native';
import { Fonts } from '../../theme';

const Camera = ({ visible, onClose, onTakePic }) => {
  const navigation = useNavigation();
  const [ showModal, setShowModal ] = useState(visible);
  const camera = useRef(null);
  const onCloseModal = () => {
      setShowModal(false);
      onClose()
  }

  const onCapturePic = async () => {
    const options = { quality: 0.2, base64: true };
    const data = await camera.current.takePictureAsync(options);
    onTakePic(data)
  }

  useEffect(() => {
    console.log("Value changed for visible", visible);
    setShowModal(visible);
  }, [visible])
  return (
            <Modal visible={showModal} animated={true} animationType={'slide'}>
                <View style={Styles.cameraContainer}>
                    <RNCamera
                    ref={camera}
                    style={Styles.cameraPreview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    />
                    <View style={Styles.BtnsContainer}>
                        <TouchableOpacity style={Styles.closeButton} onPress={()=> onCloseModal()}>
                            <Text style={Styles.closeTxt}>Close Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.captureButton} onPress={()=> onCapturePic()}>
                            <Text style={Styles.BtnTakeSnap}>Take Snap</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
  );
}

export default Camera;
