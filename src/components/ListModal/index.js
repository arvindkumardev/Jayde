import { Modal, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import CustomText from '../CustomText';
import { Colors } from '../../theme';
import { RfH, RfW } from '../../utils/helpers';

function ListModal(props) {
  const { isVisible, openModal, list, onItemClick } = props;

  const mainView = () => (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.innerView}>
        <View style={{ flex: 1, paddingHorizontal: RfW(24) }}>
          {list.map((item) => (
            <TouchableOpacity
              style={{ borderBottomColor: Colors.grayLine, borderBottomWidth: RfH(1) }}
              activeOpacity={0.4}
              onPress={() => onItemClick(item)}>

              <CustomText
                styling={{ paddingVertical: RfH(20), textAlign: 'center' }}
                fontSize={16}
                color={Colors.primaryBlack}
                fontWeight='bold'>
                {item.value}
              </CustomText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={openModal}>
      <TouchableWithoutFeedback onPress={openModal}>
        <View style={styles.container}>{mainView()}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

ListModal.propTypes = {
  isVisible: PropTypes.bool,
  openModal: PropTypes.func,
  errorObj: PropTypes.object,
};
ListModal.defaultProps = {
  isVisible: false,
  openModal: null,
  errorObj: '',
};
export default ListModal;
