import React from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';
import {RfH, RfW} from '../../utils/helpers';
import IconButtonWrapper from '../IconWrapper';
import {Images} from '../../theme';

const CheckBoxWrapper = (props) => {
  const {
    isChecked,
    checkBoxHandler,
    checkBoxName,
    checkedIcon,
    unCheckedIcon,
  } = props;

  return (
    <IconButtonWrapper
      iconHeight={RfH(44)}
      iconWidth={RfW(44)}
      iconImage={isChecked ? checkedIcon : unCheckedIcon}
      submitFunction={() => checkBoxHandler(checkBoxName)}
    />
  );
};

CheckBoxWrapper.propTypes = {
  isChecked: PropTypes.bool,
  checkBoxHandler: PropTypes.func,
  checkBoxName: PropTypes.string,
  checkedIcon: PropTypes.any,
  unCheckedIcon: PropTypes.any,
};

CheckBoxWrapper.defaultProps = {
  isChecked: false,
  checkedIcon: Images.orangeCheck,
  unCheckedIcon: Images.unCheckedIcon,
};
export default CheckBoxWrapper;
