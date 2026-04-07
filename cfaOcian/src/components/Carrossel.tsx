import { useRef, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/theme/colors';

const DADOS = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
const LARGURA_ITEM = 150;
const ESPACAMENTO = 20;

export function Carrossel() {
  const listRef = useRef<FlatList>(null);
  const [indexAtual, setIndexAtual] = useState(0);

  const irParaProximo = () => {
    if (indexAtual < DADOS.length - 1) {
      const proximo = indexAtual + 1;
      listRef.current?.scrollToIndex({ index: proximo, animated: true });
      setIndexAtual(proximo);
    }
  };

  const irParaAnterior = () => {
    if (indexAtual > 0) {
      const anterior = indexAtual - 1;
      listRef.current?.scrollToIndex({ index: anterior, animated: true });
      setIndexAtual(anterior);
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={irParaAnterior} style={styles.botao}>
        <MaterialCommunityIcons name="chevron-left" size={30} color={colors.text} />
      </TouchableOpacity>

      <FlatList
        ref={listRef}
        data={DADOS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        getItemLayout={(_, index) => ({
          length: LARGURA_ITEM + ESPACAMENTO,
          offset: (LARGURA_ITEM + ESPACAMENTO) * index,
          index,
        })}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.texto}>{item}</Text>
          </View>
        )}
      />

      <TouchableOpacity onPress={irParaProximo} style={styles.botao}>
        <MaterialCommunityIcons name="chevron-right" size={30} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  botao: {
    padding: 10,
    zIndex: 1,
  },
  item: {
    width: LARGURA_ITEM,
    marginHorizontal: ESPACAMENTO / 2,
    height: 100,
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontFamily: 'Creato-Bold',
    color: '#FFF',
    fontSize: 16,
  },
});