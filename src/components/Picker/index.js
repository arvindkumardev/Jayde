/* eslint-disable no-empty */
/* eslint-disable prefer-destructuring */
import React, { useState } from 'react';
import { Text, Platform, ActionSheetIOS, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-community/picker';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import Styles from "./styles";

const DropDown = (props) => {
  const { items, onValueChange, selectedValue, containerStyle, itemStyle, placeholderText, mode } = props;
  const [iosSelectedValue, setSelectedValue] = useState(selectedValue || placeholderText);
  const getAndroidDropDown = (dropDownData = []) => {
    const Item = Picker.Item;
    return (
      <View style={[Styles.androidPickerContainer, containerStyle]}>
        <Picker
          mode={mode}
          itemStyle={itemStyle}
          // style={containerStyle}
          onValueChange={onValueChange}
          selectedValue={selectedValue}>
          <Item label={placeholderText} value="" />
          {dropDownData.map((item, index) => (
            <Item key={index} value={item.value} label={item.label} />
          ))}
        </Picker>
      </View>
    );
  };
  const openActionSheet = () => {
    const buttonListLabel = items.map((item) => item.label);
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', ...buttonListLabel],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else {
          const actionSheetItemSelect = items.find((item) => item.label);
          setSelectedValue(actionSheetItemSelect.label);
          onValueChange(actionSheetItemSelect.value);
        }
      }
    );
  };

  const getIOSActionSheet = () => {
    return (
      <TouchableOpacity style={containerStyle} onPress={openActionSheet}>
        <Text>{iosSelectedValue}</Text>
      </TouchableOpacity>
    );
  };
  return Platform.select({
    ios: getIOSActionSheet(),
    android: getAndroidDropDown(items),
  });
};

DropDown.propTypes = {
  mode: PropTypes.string,
  onValueChange: PropTypes.func,
  itemStyle: {},
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  items: PropTypes.arrayOf({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  containerStyle: {},
  placeholderText: PropTypes.string,
};
DropDown.defaultProps = {
  items: [],
  selectedValue: '',
  onValueChange: (val) => console.log(val),
  containerStyle: {},
  itemStyle: {},
  placeholderText: 'Please select item',
  mode: 'modal',
};

export default DropDown;
