import { StyleSheet } from "react-native";
import { Spaces, Texts, Container, commonCss } from "./Styles";

const appStyles = StyleSheet.create({
    ...Container,
    ...Texts,
    ...Spaces,
    ...commonCss
})

export default appStyles;