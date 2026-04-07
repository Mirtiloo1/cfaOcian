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
        flexDirection: 'column',
        gap: 40
    },
    textTitle: {
        color: colors.azulClaro,
        fontFamily: 'Creato-Bold'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1A1A1A',
        height: 60,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginTop: 10
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputText: {
    color: colors.text,
    fontSize: 16,
    fontFamily: 'Creato-Medium',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '85%',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  opcao: {
    paddingVertical: 18,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#252525',
  },
  opcaoText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Creato-Bold',
  },
});