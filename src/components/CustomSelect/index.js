import React from 'react';
import {Platform, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
import {Colors} from '../../theme';
import RNPickerSelect from '../RNPickerSelect';
import {RfH} from '../../utils/helpers';
import IconButtonWrapper from '../IconWrapper';

function CustomSelect(props) {
  const {
    label,
    error,
    inputLabelStyle,
    textInputStyle,
    placeholder,
    onChangeHandler,
    data,
    editable,
    value,
    iconImage,
    topMargin,
  } = props;

  const handleChange = (value) => {
    onChangeHandler(value);
  };

  return (
    <View
      style={[
        styles.textInputContainer,
        {marginTop: RfH(topMargin)},
        error && {borderColor: '#b00820'},
      ]}>
      <View>
        <Text style={[inputLabelStyle, error && {color: '#b00820'}]}>
          {label}
        </Text>
      </View>
      <RNPickerSelect
        placeholder={{
          label: placeholder,
          value: '',
        }}
        items={data}
        disabled={!editable}
        onValueChange={(value) => handleChange(value)}
        useNativeAndroidPickerStyle={false}
        style={{
          viewContainer: {...styles.textInputInnerContainer},
          placeholder: {...styles.inputStyle, color: Colors.coolGrey},
          done: {color: Colors.backgroundYellow},
          inputIOS: {...styles.inputStyle},
          inputAndroid: {...styles.inputStyle},
          inputAndroidContainer: {...styles.textInputInnerContainer},
          iconContainer: {
            top: Platform.OS === 'ios' ? RfH(10) : RfH(30),
            right: 5,
          },
        }}
        value={value}
        Icon={() => {
          return (
            <View
              style={{
                bottom: Platform.OS === 'ios' ? RfH(5) : RfH(20),
              }}>
              <IconButtonWrapper
                iconImage={iconImage}
                iconWidth={RfH(16)}
                iconHeight={RfH(10)}
              />
            </View>
          );
        }}
      />
      {error ? <Text style={styles.errorTextStyle}>{error}</Text> : null}
    </View>
  );
}

CustomSelect.propTypes = {
  error: PropTypes.any,
  inputWidth: PropTypes.number,
  label: PropTypes.string,
  value: PropTypes.any,
  inputLabelStyle: PropTypes.object,
  textInputStyle: PropTypes.object,
  placeholder: PropTypes.string,
  topLabelText: PropTypes.string,
  onChangeHandler: PropTypes.func,
  icon: PropTypes.any,
  data: PropTypes.any,
  editable: PropTypes.boolean,
  topMargin: PropTypes.number,
};

CustomSelect.defaultProps = {
  label: '',
  error: '',
  showPasswordField: false,
  inputWidth: 0,
  value: '',
  inputLabelStyle: {},
  textInputStyle: {},
  data: [],
  editable: true,
  topMargin: 25,
};

export default CustomSelect;
