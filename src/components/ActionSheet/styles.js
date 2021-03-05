import { StyleSheet } from 'react-native';
import { deviceWidth, RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';

const styles = StyleSheet.create({
    mainModalContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        marginBottom: RfH(25),
        width: deviceWidth() - RfW(20),
        alignSelf: 'center',
    },
    modalInnerContainer: {
        borderRadius: RfW(14),
        backgroundColor: '#FFF',
        paddingHorizontal: RfW(20)
    },
    modalSeparator: {
        height: RfH(0.6),
        opacity: 0.5,
        backgroundColor: 'rgba(17, 17, 17, 0.5)'
    },
    modalDismissContainer: {
        borderRadius: RfW(14),
        marginTop: RfH(8),
        backgroundColor: '#fff'
    },
});

export default styles
