import React, { useState } from 'react';
import { Modal, Text, View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';
import Pdf from 'react-native-pdf';
import { isEmpty } from 'lodash';

import { Header, Loader } from '../';
import { RfH } from '../../utils/helpers';
import styles from './style';


function DocumentViewer(props) {
  const {
    headerText,
    url,
    backButtonHandler,
    modalVisible,
    onNavigationStateChange,
    title,
    notes
  } = props;
  const [isError, setError] = useState(false);
  const sourceForPDF = { uri: url, cache: false };

  return (
    <Modal visible={modalVisible} animationType={'slide'} backdropOpacity={1}
      transparent={true}
      onRequestClose={() => backButtonHandler()}
    >
      <SafeAreaView style={{ flex: 1, }}>
        <View style={{ flex: 1, }}>
          <Header
            isRightButtonVisible={false}
            isBackButtonVisible={true}
            onBackPressHandler={backButtonHandler}
            titleText={headerText}
          />
          {!isEmpty(title) &&
            <View style={styles.innerContainer}>
              <Text style={styles.inputTextLabel}>Document Title</Text>
              <Text style={styles.inputStyle}>{title}</Text>
              <View style={{ marginTop: RfH(10) }}>
                <Text style={styles.inputTextLabel}>Notes</Text>
                <Text style={styles.inputStyle}>{notes}</Text>
              </View>
            </View>}

          {url.includes('pdf') ?
            <Pdf
              source={sourceForPDF}
              activityIndicator={<Loader isLoading={true} />}
              onError={(error) => {
                setError(true);
              }}
              style={{
                flex: 1,
                width: '100%',
                height: '100%'
              }}
            /> :
            <WebView domStorageEnabled={true}
              javaScriptEnabled={true}
              onNavigationStateChange={onNavigationStateChange}
              renderError={() => setError(true)}
              renderLoading={() => (
                <Loader
                  isLoading={true}
                  text="Please Wait..."
                />
              )}
              source={{ uri: url }}
              startInLoadingState={true}
            />
          }
          {isError &&
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Something Went Wrong</Text>
              <Text>Please Try Again Later</Text>
            </View>}
        </View>
      </SafeAreaView>

    </Modal>
  );
}

DocumentViewer.propTypes = {
  headerText: PropTypes.string,
  url: PropTypes.string,
  backButtonHandler: PropTypes.func,
  modalVisible: PropTypes.bool,
  onNavigationStateChange: PropTypes.func,
  subTitle: PropTypes.string,
  title: PropTypes.string,
  notes: PropTypes.string,
};

DocumentViewer.defaultProps = {
  headerText: '',
  url: '',
  modalVisible: false,
  title: '',
  notes: '',
};

export default DocumentViewer;
