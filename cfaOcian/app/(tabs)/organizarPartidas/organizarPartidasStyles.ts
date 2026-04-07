import { StyleSheet, Dimensions } from "react-native"
import { colors } from "@/src/theme/colors";

const MARGEM_CONTEUDO = 20;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
      },
    content: {
        padding: MARGEM_CONTEUDO,
        paddingBottom: 20,
    },
});