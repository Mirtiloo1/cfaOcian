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
     texto: {
        color: colors.text
    },
    headerGeral: {
    flexDirection: 'column',
    gap: 32,
    marginBottom: 20,
    },
    footerGeral: {
        marginTop: 20,
        flexDirection: 'column',
        gap: 16,
    },
    novaPartidaCard: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10
    },
    containerCard: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center'
    },
    bgIcon: {
        padding: 6,
        backgroundColor: colors.azulClaro,
        borderRadius: 12
    },
    icon: {
        borderRadius: 100,
        padding: 4
    },
    txtPrimary: {
        color: colors.secondary,
        fontFamily: 'Creato-Regular',
        fontWeight: 700,
        fontSize: 18,
    },
    txtSecondary: {
        color: colors.text,
        fontFamily: 'Creato-Bold',
        letterSpacing: 2
    },
    textContainer: {
        flexDirection: 'column',
        gap: 2
    },
    textsResultados: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txtResultados: {
        color: colors.text,
        fontFamily: 'Creato-Bold',
        fontSize: 16
    },
    txtVerTudo: {
        color: colors.text_secondary,
        fontFamily: 'Creato-Bold',
        fontSize: 14,
    },
    partidas: {
        flexDirection: 'column',
        gap: 20,
        flex: 1
    },
    cardProximasPartidas: {
        backgroundColor: '#1a1a1a',
        padding: 18,
        borderRadius: 10,
        flexDirection: 'column',
        gap: 20,
        alignItems: 'center',
        width: 160,
    },
    topCard: {
        alignItems: 'center',
        flexDirection: 'column',
        gap: 12,
    },
    bottomCard: {
        alignItems: 'center',
        flexDirection: 'column',
        gap: 4,
    },
    img: {
        height: 40,
        width: 40
    },
    txtTime: {
        fontFamily: 'Creato-Medium',
        color: colors.text_secondary,
    },
    hr: {
        height: 0.5,
        backgroundColor: '#a1a1a1',
        width: '80%'
    },
    txtData: {
        color: colors.azulClaro,
        fontFamily: 'Creato-Bold'
    },
    txtHorario: {
        color: colors.text,
        fontFamily: 'Creato-Bold'
    },
});