import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '../../theme';
import { RfH, RfW } from '../../utils/helpers';
import { STANDARD_SCREEN_DIMENSIONS } from '../../utils/constants';

export const styles = StyleSheet.create({
    mainModal: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.warmGrey,
        justifyContent: 'flex-end'
    },
    bottomContainer: {
        width: '100%',
        backgroundColor: Colors.white,
        paddingHorizontal: RfW(15),
        paddingTop: RfH(15),
        paddingBottom: RfH(33),
    },
    submitButton: {
        paddingTop: RfH(15),
        alignSelf: 'flex-end',
        paddingHorizontal: RfW(5)
    },
    inputLabelStyle: {
        fontSize: RFValue(13, STANDARD_SCREEN_DIMENSIONS.height),
        fontWeight: 'normal',
        fontStyle: 'normal',
        color: Colors.warmGreyTwo,
        paddingLeft: RfW(7),
    },
    textInputStyle: {
        fontSize: RFValue(15, STANDARD_SCREEN_DIMENSIONS.height),
        fontWeight: 'normal',
        fontStyle: 'normal',
        color: Colors.blackThree,
        paddingLeft: RfW(18),
    },
});
