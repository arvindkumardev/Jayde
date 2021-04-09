/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
import { Colors } from '../../theme';

function Loader(props) {
  const { isLoading } = props;
  return (
    <>
      {isLoading ? (
        <View style={styles.container}>
          <View style={styles.activityWrapper}>
            <ActivityIndicator size="large" color={Colors.mango} />
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
