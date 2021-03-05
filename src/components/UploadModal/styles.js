import { StyleSheet } from 'react-native';
import { RfW, RfH } from '../../utils/helpers';
import { Colors } from '../../theme';

const styles = StyleSheet.create({
    blockContainer: {
        paddingHorizontal: RfW(0),
        backgroundColor: Colors.white,
        paddingBottom: RfH(31),
    },
});
export default styles;
