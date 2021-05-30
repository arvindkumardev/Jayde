import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {isEmpty} from 'lodash';
import styles from './style';
import {alertBox, RfH, RfW} from '../../utils/helpers';
import {inputs} from '../../utils/constants';
import {Colors, Images} from '../../theme';
import CustomText from '../CustomText';

const CustomTextInput = (props) => {
  const {
    label,
    error,
    icon,
    handleShowPassword,
    secureTextEntry,
    showPasswordField,
    inputWidth,
    inputLabelStyle,
    textInputStyle,
    placeholder,
    autoCapitalize,
    onChangeHandler,
    value,
    autoCorrect,
    showClearButton,
    keyboardType,
    onSubmitEditing,
    refKey,
    returnKeyType,
    isSpecialCharactersAllowed,
    isOnlyAlphabetsAllowed,
    maxLength,
    editable,
    multiline,
    topMargin,
    isSpaceAllowed,
    noOfLines,
    textInputInnerContainer,
  } = props;

  const handleChange = (value) => {
    let regex = '';
    if (isEmpty(value)) {
      onChangeHandler(value);
      return;
    }
    let updateValue = value;
    if (!isSpecialCharactersAllowed) {
      regex = /^[A-Za-z0-9 ]+$/;
    } else if (isOnlyAlphabetsAllowed) {
      regex = /^[A-Za-z ]+$/;
    } else if (!isSpaceAllowed) {
      updateValue = value.replace(/\s/g, '');
    }
    if (!regex || regex.test(updateValue)) {
      onChangeHandler(updateValue);
    }
  };
  return (
    <View>
      <View
        style={[
          {marginTop: RfH(topMargin)},
          error && {borderColor: '#b00820'},
        ]}>
        {!isEmpty(label) && (
          <View style={styles.labelViewStyle}>
            <Text style={[inputLabelStyle, error && {color: '#b00820'}]}>
              {label}
            </Text>
          </View>
        )}
        <View
          style={[
            textInputInnerContainer,
            {height: noOfLines * RfH(38)},
            !showClearButton && !handleShowPassword && {paddingRight: RfW(17)},
          ]}>
          <View style={[{flex: 1}, !multiline && {justifyContent: 'center'}]}>
            <TextInput
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              autoCorrect={autoCorrect}
              autoCapitalize={autoCapitalize}
              autoCompleteType={'off'}
              blurOnSubmit
              value={value}
              onChangeText={handleChange}
              style={[
                !isEmpty(textInputStyle) ? textInputStyle : styles.inputStyle,
                inputWidth && {width: inputWidth},
                multiline && {textAlignVertical: 'top', paddingTop: RfH(4)},
              ]}
              keyboardType={keyboardType}
              onSubmitEditing={onSubmitEditing}
              refKey={refKey}
              ref={(input) => {inputs[refKey] = input}}             
              multiline={multiline}
              returnKeyType={returnKeyType}
              underlineColorAndroid="transparent"
              maxLength={maxLength}
              editable={editable}
            />
          </View>
          {!handleShowPassword && showClearButton && !isEmpty(value) && (
            <TouchableOpacity
              style={styles.iconContainer}
              activeOpacity={1}
              onPress={() => handleChange('')}>
              <Image source={Images.crossBlack} style={styles.iconStyle} />
              {/* <Icon name={'clear'} size={10} style={styles.iconStyle} /> */}
            </TouchableOpacity>
          )}
          {handleShowPassword && (
            <TouchableOpacity
              style={styles.iconContainer}
              activeOpacity={1}
              onPress={() => handleShowPassword(!showPasswordField)}>
              <Image source={icon} style={styles.passwordIconStyle} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {error ? (
        <CustomText
          fontSize={15}
          color={Colors.red}
          styling={{marginTop: RfH(10)}}>
          {error}
        </CustomText>
      ) : null}
    </View>
  );
};

CustomTextInput.propTypes = {
  error: PropTypes.any,
  inputWidth: PropTypes.number,
  label: PropTypes.string,
  showPasswordField: PropTypes.bool,
  value: PropTypes.string,
  inputLabelStyle: PropTypes.object,
  textInputStyle: PropTypes.object,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  autoCorrect: PropTypes.bool,
  handleShowPassword: PropTypes.func,
  onChangeHandler: PropTypes.func,
  isNumericOnly: PropTypes.bool,
  icon: PropTypes.any,
  showClearButton: PropTypes.bool,
  keyboardType: PropTypes.string,
  onSubmitEditing: PropTypes.func,
  refKey: PropTypes.string,
  returnKeyType: PropTypes.string,
  isSpecialCharactersAllowed: PropTypes.bool,
  isOnlyAlphabetsAllowed: PropTypes.bool,
  maxLength: PropTypes.number,
  infoIconEnable: PropTypes.bool,
  multiline: PropTypes.bool,
  editable: PropTypes.bool,
  topMargin: PropTypes.number,
  isSpaceAllowed: PropTypes.bool,
  noOfLines: PropTypes.number,
  textInputInnerContainer: PropTypes.object,
};

CustomTextInput.defaultProps = {
  label: '',
  error: '',
  showPasswordField: false,
  inputWidth: 0,
  value: '',
  inputLabelStyle: {},
  textInputStyle: {},
  secureTextEntry: false,
  autoCapitalize: 'none',
  autoCorrect: false,
  isNumericOnly: false,
  showClearButton: true,
  keyboardType: 'default',
  returnKeyType: 'default',
  isSpecialCharactersAllowed: true,
  isOnlyAlphabetsAllowed: false,
  maxLength: null,
  infoIconEnable: false,
  multiline: false,
  editable: true,
  topMargin: 25,
  isSpaceAllowed: true,
  noOfLines: 1,
  infoText: '',
  textInputInnerContainer: styles.textInputInnerContainer,
};

export default React.memo(CustomTextInput);
