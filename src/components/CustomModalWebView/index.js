import React, {useState} from 'react';
import {Modal, SafeAreaView, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';
import Header from '../Header';
import {Colors} from '../../theme';

function CustomModalWebView(props) {
  const {
    headerText,
    data,
    backButtonHandler,
    modalVisible,
    onNavigationStateChange,
  } = props;


  const [isError, setError] = useState(false);
  return (
    <Modal visible={modalVisible} animationType={'slide'} backdropOpacity={1}
      transparent={true}
      onRequestClose={() => backButtonHandler()}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <Header titleText={headerText}
          isRightButtonVisible={false}
          isBackButtonVisible={true}
          onBackPressHandler={backButtonHandler}
        />
        <WebView domStorageEnabled={true}
          javaScriptEnabled={true}
          onNavigationStateChange={onNavigationStateChange}
          renderError={() => setError(true)}
          source={{html: data}}
          startInLoadingState={true}
        />
        {isError &&
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Something went wrong</Text>
          </View>}
      </SafeAreaView>
    </Modal>
  );
}

CustomModalWebView.propTypes = {
  headerText: PropTypes.string,
  data: PropTypes.string,
  backButtonHandler: PropTypes.func,
  modalVisible: PropTypes.bool,
  onNavigationStateChange: PropTypes.func,
  showLoader:PropTypes.bool,
};

CustomModalWebView.defaultProps = {
  headerText: '',
  data: '',
  modalVisible: false,
  showLoader:true,
  backButtonHandler:null,
};

export default CustomModalWebView;
