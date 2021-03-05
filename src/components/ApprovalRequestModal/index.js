import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Linking,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import {RfH, RfW} from '../../utils/helpers';
import {CustomImage, CustomText} from '../../components';
import {Colors, Images} from '../../theme';
import {APPROVAL_REQUEST_OPTION} from '../../utils/constants';

function ApprovalRequestModal(props) {
  const {isVisible, openModal, onClick, module} = props;


    const modalHeader = () => (
        <View style={styles.header}>
            <CustomText color={Colors.primaryBlack} fontSize={16} fontWeight={'bold'}>
                {module.name}
            </CustomText>
            <CustomText color={Colors.purple} fontWeight={'bold'} fontSize={14}>
                {'CANCEL'}
            </CustomText>
        </View>
    );
    
  const mainView = () => (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={styles.innerView}>
        {modalHeader()}
        <View style={{flex: 1, paddingHorizontal: RfW(22)}}>
          {module.subModule.map((item) => (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                paddingVertical: RfH(18),
                borderBottomWidth: RfH(0.8),
                borderBottomColor: Colors.grayBorder,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              activeOpacity={0.5}
              onPress={() => onClick(item)}>
              <CustomText fontSize={16} color={Colors.primaryBlack}>
                {item.name}
              </CustomText>

              <CustomImage
                image={Images.arrowRight}
                imageWidth={RfW(15)}
                imageHeight={RfH(15)}
                imageResizeMode={'contain'}
              />
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

ApprovalRequestModal.propTypes = {
  isVisible: PropTypes.bool,
  openModal: PropTypes.func,
  onClick: PropTypes.func,
};
ApprovalRequestModal.defaultProps = {
  isVisible: false,
  openModal: null,
  onClick: null,
};
export default ApprovalRequestModal;
