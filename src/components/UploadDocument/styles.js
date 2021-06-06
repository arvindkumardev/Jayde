import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../../theme';
import { RfH, RfW } from '../../utils/helpers';
import Fonts from '../../theme/Fonts';
import { STANDARD_SCREEN_SIZE } from '../../utils/constants';
import { RFValue } from 'react-native-responsive-fontsize';


export const styles = StyleSheet.create({

    mainModal: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'flex-end'
    },
    bottomContainer: {
        width: RfW(359),
        alignSelf: 'center',
        marginBottom: RfH(10)
    },
    uploadMsgView: {
        borderRadius: RfW(14),
        backgroundColor: '#E3E3E3'
    },
    label: {
        fontFamily: Fonts.regular,
        fontSize: RFValue(20, STANDARD_SCREEN_SIZE),
        textAlign: 'center',
        color: Colors.sandBrown,
        fontWeight: 'normal',
        fontStyle: 'normal',
        paddingVertical: RfH(16)
    },
    label1: {
        fontFamily: Fonts.regular,
        fontSize: RFValue(13, STANDARD_SCREEN_SIZE),
        fontWeight: '600',
        fontStyle: 'normal',
        textAlign: 'center',
        color: '#8f8f8f',
        paddingVertical: RfH(15),
    },
    saparator: {
        height: RfH(0.6),
        opacity: 0.5,
        backgroundColor: 'rgba(17, 17, 17, 0.5)'
    },
    cancelView: {
        borderRadius: RfW(14),
        marginTop: RfH(8),
        backgroundColor: '#fff',
    },
    cancelLabel: {
        fontFamily: Fonts.regular,
        fontSize: RFValue(20, STANDARD_SCREEN_SIZE),
        textAlign: 'center',
        color: Colors.sandBrown,
        fontWeight: 'normal',
        fontStyle: 'normal',
        paddingVertical: RfH(16),
        fontWeight: '400'
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.black,
        paddingTop: Platform.OS === 'ios' ? RfH(0) : RfH(10),
        justifyContent: 'space-between'
    },
    registrationContainer: {
        marginHorizontal: RfW(36),
        backgroundColor: Colors.backgroundYellow,
        borderRadius: RfH(50),
        paddingVertical: RfH(17),
        // marginTop: RfH(30),
        // justifyContent: 'flex-end',
        alignItems: 'center',
        
    },
    registrationText: {
        fontFamily: Fonts.regular,
        fontSize: RFValue(13, STANDARD_SCREEN_SIZE),
        fontWeight: 'bold',
        fontStyle: 'normal',
        color: Colors.white,

    },
    imageView: {
        height: RfW(360),
        borderColor: '#717171',
        alignItems: 'center',
        justifyContent: 'center',
        // borderRadius: RfW(15),
        // borderWidth: RfW(1),
        marginBottom: RfH(30)
    },
    thumbView: {
        width: RfW(75),
        height: RfW(75),
        borderColor: '#717171',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: RfW(15),
        borderWidth: RfW(1),
        marginRight: RfW(16),
        // padding: RfW(2)
    }


});
