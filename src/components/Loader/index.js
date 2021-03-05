import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

function Loader(props) {
  const {isLoading} = props;
  return (
    <>
      {isLoading ? (
        <View style={styles.container}>
          <View style={styles.activityWrapper}>
            <ActivityIndicator size="large" color={'#6932CE'} />
          </View>
        </View>
      ) : null}
    </>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool,
  text: PropTypes.string,
};

Loader.defaultProps = {
  isLoading: false,
  text: 'Please Wait ...',
};

export default Loader;
