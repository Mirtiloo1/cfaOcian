import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/src/theme/colors";

const { width: windowWidth } = Dimensions.get('window');
const MARGEM_CONTEUDO = 20;
const LARGURA_DISPONIVEL = windowWidth - (MARGEM_CONTEUDO * 2);
const LARGURA_ITEM_SELECTOR = 120;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  pagerView: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
  },
  flatListContent: {
    padding: MARGEM_CONTEUDO,
  },
  carrosselWrapper: {
    alignItems: 'center',
    paddingHorizontal: MARGEM_CONTEUDO,
    marginTop: 10,
    paddingBottom: 10,
  },
  carrosselInternal: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  botaoSeta: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListSelectorContent: {
    alignItems: 'center',
    paddingHorizontal: (LARGURA_DISPONIVEL - 40*2 - 10*2 - LARGURA_ITEM_SELECTOR) / 2,
  },
  itemContainer: {
    width: LARGURA_ITEM_SELECTOR,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  itemText: {
    fontFamily: 'Creato-Bold',
    color: '#666',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  activeItemContainer: {
    width: LARGURA_ITEM_SELECTOR,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 5,
  },
  activeItemText: {
    fontFamily: 'Creato-Bold',
    color: '#FFF',
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerContainer: {
    marginBottom: 10,
  },
  seasonTitle: {
    fontFamily: 'Creato-Bold',
    color: '#FFF',
    fontSize: 20,
    marginBottom: 20,
  },
  mainCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 22,
    marginBottom: 15,
    flexDirection: 'column',
    gap: 10
  },
  cardLabel: {
    fontFamily: 'Creato-Bold',
    color: colors.text_secondary,
    fontSize: 14,
    letterSpacing: 1,
    marginBottom: 8,
  },
  playerName: {
    fontFamily: 'Creato-Bold',
    color: '#FFF',
    fontSize: 32,
    marginBottom: 4,
  },
  playerStats: {
    fontFamily: 'Creato-Medium',
    color: 'gray',
    fontSize: 20,
  },
  gols: {
    fontFamily: 'Creato-Bold',
    fontSize: 36,
    color: colors.primary
  },
  rowCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  smallCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    width: '48%',
    flexDirection: 'column',
    gap: 6
  },
  smallCardContent: {
    flexDirection: 'column',
    gap: 6
  },
  txtColocacao: {
    color: 'gray',
    fontFamily: 'Creato-Bold',
    fontSize: 24
  },
  cardValue: {
    fontFamily: 'Creato-Bold',
    color: '#FFF',
    fontSize: 18,
    marginTop: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: 'Creato-Bold',
    color: '#FFF',
    fontSize: 18,
  },
  seeAllButton: {
    fontFamily: 'Creato-Bold',
    color: colors.text_secondary,
    fontSize: 14,
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
  statsIcon: {
    marginLeft: 4
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowDefault: {
    flexDirection: 'row',
  },
  iconRight: {
    marginLeft: 'auto',
  }
});