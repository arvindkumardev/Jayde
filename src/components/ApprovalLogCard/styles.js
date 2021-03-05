import { StyleSheet, } from 'react-native';
import { RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';

const styles = StyleSheet.create({
    approvalCard: {
        backgroundColor: Colors.white,
        borderRadius: RfH(15),
        marginBottom: RfH(20),
        paddingHorizontal: RfW(14),
        paddingTop: RfH(17),
        paddingBottom: RfH(11),
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    approvalDetail: {
        flex: 1,
        paddingLeft: RfW(10),
    },
});

export default styles;