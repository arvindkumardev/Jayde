import { StyleSheet } from "react-native";
import { Spaces, Texts, Container } from "./Styles";

const appStyles = StyleSheet.create({
    ...Container,
    ...Texts,
    ...Spaces
})

export default appStyles;