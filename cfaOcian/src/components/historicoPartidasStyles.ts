import { StyleSheet } from "react-native";
import { colors } from "@/src/theme/colors";

export const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  colorBorder: {
    backgroundColor: colors.primary,
    width: 8,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    height: 120
  },
  matchCard: {
    flex: 1,
    height: 120,
    backgroundColor: '#1a1a1a',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  escudoBackground: {
    width: 46,
    height: 46,
    borderRadius: 100,
    backgroundColor: '#101010',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  escudoTime: {
    height: 36,
    width: 36,
  },
  timeUm: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    gap: 6
  },
  txtTimeUm: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Creato-Medium',
    textAlign: 'center'
  },
  timeDois: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    gap: 6
  },
  txtTimeDois: {
    color: 'gray',
    fontSize: 14,
    fontFamily: 'Creato-Medium',
    textAlign: 'center'
  },
  placarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6
  },
  dataJogo: {
    color: '#666',
    fontFamily: 'Creato-Medium',
    fontSize: 12,
    marginBottom: 4
  },
  golsWrapper: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center'
  },
  golBox: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  txtGol: {
    fontFamily: 'Creato-Medium',
    fontSize: 28,
    color: colors.text_secondary,
  },
  traco: {
    color: '#61C6FF',
    fontSize: 28,
    fontFamily: 'Creato-Medium'
  },
  statsIcon: {
    marginLeft: 4
  }
});