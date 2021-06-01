import React from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { Images, Colors } from '../../theme';
import { RfH, RfW } from '../../utils/helpers';
import IconButtonWrapper from '../IconWrapper';
import { isEmpty } from 'lodash';
import styles from './style';
import { CustomText } from '../../components';


function CustomSearchBar(props) {
    const { placeholder, onChangeText, value, cancelSearch } = props;
    return (
        <View style={styles.container}>
            <IconButtonWrapper
                iconImage={Images.search}
                iconWidth={RfH(28)}
                iconHeight={RfH(28)}
            />
            <TextInput
                style={styles.textStyle}
                underlineColorAndroid="transparent"
                placeholder={placeholder}
                autoCorrect={false}
                autoCapitalize={'none'}
                autoCompleteType={'off'}
                value={value}
                onChangeText={onChangeText}

            />
            {!isEmpty(value) && <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                activeOpacity={1}
                onPress={() => onChangeText('')}
            >
                <Image
                    source={Images.clear}
                    style={styles.iconStyle}
                />
            </TouchableOpacity>}
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                onChangeText('')
                cancelSearch()}                
                }>
                <CustomText
                    styling={{ padding: 5 }}
                    fontSize={14}
                    fontWeight='bold'
                    color={Colors.purple}
                >{'CANCEL'}</CustomText>
            </TouchableOpacity>
        </View>
    );
}

CustomSearchBar.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func,


};

CustomSearchBar.defaultProps = {
    value: '',
    placeholder: 'Search ...',
};

export default React.memo(CustomSearchBar);
