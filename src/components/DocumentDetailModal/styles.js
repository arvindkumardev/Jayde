import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_DIMENSIONS } from '../../utils/constants';
import { Colors } from '../../theme';
import { RfH, RfW } from '../../utils/helpers';

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalBottomContainer: {
        width: RfW(335),
        alignSelf: 'center',
        paddingHorizontal: RfW(22),
        marginBottom: RfH(44),
        backgroundColor: Colors.white,
        borderRadius: RfH(6)
    },
    modalInnerView: {
        borderBottomColor: Colors.grey,
        borderBottomWidth: RfW(1),
    },
    modalLabel: {
        fontSize: RFValue(15, STANDARD_SCREEN_DIMENSIONS.height),
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        color: Colors.blackThree,
        paddingVertical: RfH(16),
    },
    modalLabel1: {
        fontSize: RFValue(13, STANDARD_SCREEN_DIMENSIONS.height),
        fontWeight: 'normal',
        fontStyle: 'normal',
        color: Colors.grey,
    },
    uploadView: {
        backgroundColor: Colors.blue,
        borderRadius: RfH(6),
        // marginVertical: RfH(40),
        paddingHorizontal: RfW(30),
        paddingVertical: RfH(10),
        alignSelf: 'center'
    },
    dismissView: {
        backgroundColor: Colors.red,
        borderRadius: RfH(6),
        // marginVertical: RfH(40),
        paddingHorizontal: RfW(30),
        paddingVertical: RfH(10),
        alignSelf: 'center'
    },
    uplodaButton: {
        fontSize: RFValue(17, STANDARD_SCREEN_DIMENSIONS.height),
        fontWeight: '600',
        fontStyle: 'normal',
        textAlign: 'center',
        color: Colors.white,
    },
    charLen: {
        fontSize: RFValue(13, STANDARD_SCREEN_DIMENSIONS.height),
        fontWeight: 'normal',
        fontStyle: 'normal',
        color: Colors.blackThree,
        opacity: 0.3,
        textAlign: 'right'
    },
    textInputInnerContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: Colors.grey,
        borderRadius: RfW(4),
        alignItems: 'center'
    },
    textInputStyle: {
        fontSize: RFValue(15, STANDARD_SCREEN_DIMENSIONS.height),
        flex: 1,
        width: '100%',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textAlign: 'left',
        color: Colors.blackThree,
        padding: 0,
    },
});

export default styles;
