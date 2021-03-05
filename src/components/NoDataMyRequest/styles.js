import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { RfH, RfW } from '../../utils/helpers';
import { STANDARD_SCREEN_DIMENSIONS } from '../../utils/constants';

const styles = StyleSheet.create({
    warningCard: {
        height: RfH(378),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: RfH(5),
        marginHorizontal: RfH(20)
    },

    warningInfoMessage: {
        fontSize: RFValue(13, STANDARD_SCREEN_DIMENSIONS.height),
        color: '#999999',
        paddingTop: RfH(10),
        textAlign: 'center',
    },

    warningInfoText: {
        fontSize: RFValue(15, STANDARD_SCREEN_DIMENSIONS.height),
        color: '#000',
        marginTop: RfH(10),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: RfW(40)
    },
    imageStyle: {
        width: RfW(54),
        height: RfW(54)
    }
});
export default styles;
