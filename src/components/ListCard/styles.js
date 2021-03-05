import { StyleSheet, } from 'react-native';
import { RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: Colors.white,
        borderRadius: RfH(15),
        marginBottom: RfH(20),
        paddingHorizontal: RfW(16),
        paddingTop: RfH(18),
        paddingBottom: RfH(17),
        marginHorizontal: RfW(18),
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: RfH(18),
    },
    cardHeaderOne: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: RfH(16),
        justifyContent: 'space-between',
    },
    pendingButton: {
        backgroundColor: Colors.macaroniAndCheese,
        borderRadius: RfH(29),
        paddingHorizontal: RfW(10),
        paddingVertical: RfH(7),
    },
    userIcon: {
        position: 'absolute',
        top: 0,
        borderRadius: RfH(18),
        borderWidth: RfH(2),
        borderColor: Colors.white,
    }
});

export default styles;