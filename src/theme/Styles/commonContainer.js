import { StyleSheet } from 'react-native';
import Colors from '../Colors';
import Fonts from '../Fonts';
import Spaces from "./spaces";
import Texts from "./texts";

const commonContainer = StyleSheet.create({
    textPrimary:{
        fontFamily: Fonts.regular,
        color: Colors.black,
        fontSize: Texts.f16
    },
    textPrimaryMedium:{
        fontFamily: Fonts.regular,
        color: Colors.black,
        fontSize: Texts.f18
    },
    textPrimaryLarge:{
        fontFamily: Fonts.regular,
        color: Colors.black,
        fontSize: Texts.f20
    },
    textPrimaryHeader:{

    },
    textPrimaryBold:{
        fontFamily: Fonts.bold,
        color: Colors.black,
        fontSize: Texts.f16
    },
    textPrimaryMediumBold:{
        fontFamily: Fonts.bold,
        color: Colors.black,
        fontSize: Texts.f18
    },
    textPrimaryLargeBold:{
        fontFamily: Fonts.bold,
        color: Colors.black,
        fontSize: Texts.f20
    },
    textPrimaryHeaderBold:{

    },
    textSecondary:{
        fontFamily: Fonts.regular,
        color: Colors.warmGrey,
        fontSize: Texts.f16
    },
    textSecondaryMedium:{
        fontFamily: Fonts.regular,
        color: Colors.warmGrey,
        fontSize: Texts.f18
    },
    textSecondaryLarge:{
        fontFamily: Fonts.regular,
        color: Colors.warmGrey,
        fontSize: Texts.f20
    },
    textSecondaryHeader:{

    },
    textSecondaryBold:{

    },
    textSecondaryMediumBold:{

    },
    textSecondaryLargeBold:{

    },
    textSecondaryHeaderBold:{

    },


    containerSpaceBetween:{
        flex: 1,
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor: Colors.white
    },

    containerCenter:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colors.white
    },
});

export default commonContainer;
