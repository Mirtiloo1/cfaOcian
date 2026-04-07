import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, ActivityIndicator, TouchableOpacity,
  Image, ScrollView, TextInput, FlatList,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { obterPerfisJogadores, Jogador } from '@/src/services/mlService';
import { styles } from './estatisticasStyles';
import { Header } from '@/src/components/Header';
import { BASE_URL } from '@/src/services/api';
import { colors } from '@/src/theme/colors';

// ─── Categorias ──────────────────────────────────────────────────────────────
const CATEGORIAS = [
  { id: '1', title: 'SUB 12', key: 'sub12' },
  { id: '2', title: 'SUB 18', key: 'sub18' },
  { id: '3', title: 'SUB 20', key: 'sub20' },
];

const LARGURA_ITEM_SELECTOR = 120;
const ITEM_INTERVAL = LARGURA_ITEM_SELECTOR + 10;

// ─── Filtros de estatísticas ──────────────────────────────────────────────────
type StatKey = 'gols' | 'assistencias' | 'cartoes_amarelos' | 'cartoes_vermelhos' | 'desarmes';

const FILTROS: { label: string; id: StatKey }[] = [
  { label: 'GOLS',      id: 'gols' },
  { label: 'ASSIST.',   id: 'assistencias' },
  { label: 'AMARELOS',  id: 'cartoes_amarelos' },
  { label: 'VERMELHOS', id: 'cartoes_vermelhos' },
  { label: 'DESARMES',  id: 'desarmes' },
];

const PLACEHOLDER   = require('@/assets/images/placeholder_jogador.png');
const LIMITE_PASSO  = 5;
const LIMITE_INIT   = 4;

const fotoSource = (foto?: string) =>
  foto ? { uri: `${BASE_URL}/fotos/${foto}` } : PLACEHOLDER;

const pad2 = (n: number) => String(n ?? 0).padStart(2, '0');

// ─── Conteúdo de uma página (uma categoria) ───────────────────────────────────
interface PageContentProps {
  categoriaKey: string;
  jogadores: Jogador[];
  carregando: boolean;
  erro: string | null;
  onRetry: () => void;
}

function PageContent({ categoriaKey, jogadores, carregando, erro, onRetry }: PageContentProps) {
  const [filtroAtivo, setFiltroAtivo] = useState<StatKey>('gols');
  const [busca, setBusca]             = useState('');
  const [limiteRanking, setLimiteRanking] = useState(LIMITE_INIT);

  // Filtra e ordena sempre que mudam os dados/filtro/busca
  const filtrados = React.useMemo(() => {
    let lista = [...jogadores].sort(
      (a, b) => (b[filtroAtivo] ?? 0) - (a[filtroAtivo] ?? 0)
    );
    const termo = busca.trim().toLowerCase();
    if (termo) {
      lista = lista.filter(j =>
        j.nome?.toLowerCase().includes(termo) ||
        j.posicao?.toLowerCase().includes(termo)
      );
    }
    return lista;
  }, [jogadores, filtroAtivo, busca]);

  // Reseta o limite ao trocar filtro ou busca
  useEffect(() => { setLimiteRanking(LIMITE_INIT); }, [filtroAtivo, busca]);

  const labelFiltro = FILTROS.find(f => f.id === filtroAtivo)?.label ?? '';
  const getValor    = (j: Jogador) => j[filtroAtivo] ?? 0;
  const top3        = filtrados.slice(0, 3);
  const ranking     = filtrados.slice(3, 3 + limiteRanking);
  const temMais     = 3 + limiteRanking < filtrados.length;

  if (carregando) {
    return (
      <View style={[styles.container, styles.centralizado]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.txtCarregando}>Carregando estatísticas...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={[styles.container, styles.centralizado]}>
        <Text style={styles.txtErro}>Ops! {erro}</Text>
        <TouchableOpacity style={styles.btnRetry} onPress={onRetry}>
          <Text style={styles.txtBtnRetry}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContent}
    >
      {/* Busca */}
      <View style={styles.inputWrapper}>
        <MaterialCommunityIcons name="magnify" size={18} color={colors.text_secondary} style={styles.inputIcon} />
        <TextInput
          style={styles.inputBusca}
          placeholder="Buscar jogador..."
          placeholderTextColor={colors.text_secondary}
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      {/* Filtros de stat */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollFiltros}>
        {FILTROS.map(f => (
          <TouchableOpacity
            key={f.id}
            style={[styles.btnFiltro, filtroAtivo === f.id && styles.btnFiltroAtivo]}
            onPress={() => setFiltroAtivo(f.id)}
          >
            <Text style={[styles.txtFiltro, filtroAtivo === f.id && styles.txtFiltroAtivo]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Card #1 */}
      {top3.length > 0 && (
        <View style={styles.card1}>
          <Text style={styles.card1NumFundo}>01</Text>
          <Image source={fotoSource(top3[0].foto)} style={styles.card1Foto} />
          <Text style={styles.card1Nome}>{top3[0].nome}</Text>
          <Text style={styles.card1Time}>
            {top3[0].time ?? top3[0].posicao} • {top3[0].perfil_ml}
          </Text>
          <View style={styles.card1RowValor}>
            <Text style={styles.card1Valor}>{getValor(top3[0])}</Text>
            <Text style={styles.card1LabelValor}> {labelFiltro}</Text>
          </View>
        </View>
      )}

      {/* Ranking a partir do 4º */}
      {ranking.map((j, i) => (
        <View key={j.id_jogador ?? i} style={styles.rankingLinha}>
          <Text style={styles.rankingPos}>{pad2(i + 4)}</Text>
          <Image source={fotoSource(j.foto)} style={styles.rankingFoto} />
          <View style={styles.rankingInfoJogador}>
            <Text style={styles.rankingNome}>{j.nome}</Text>
            <Text style={styles.rankingTime}>
              {j.time ?? j.posicao} • {j.perfil_ml}
            </Text>
          </View>
          <Text style={styles.rankingValor}>{getValor(j)}</Text>
        </View>
      ))}

      {temMais && (
        <TouchableOpacity
          style={styles.btnCarregarMais}
          onPress={() => setLimiteRanking(l => l + LIMITE_PASSO)}
        >
          <Text style={styles.txtCarregarMais}>CARREGAR MAIS RESULTADOS</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

// ─── Tela principal ────────────────────────────────────────────────────────────
export default function Estatisticas() {
  const flatListSelectorRef = useRef<FlatList>(null);
  const pagerRef            = useRef<PagerView>(null);

  const [activeIndex, setActiveIndex] = useState(1);
  const [jogadores,   setJogadores]   = useState<Jogador[]>([]);
  const [carregando,  setCarregando]  = useState(true);
  const [erro,        setErro]        = useState<string | null>(null);

  useEffect(() => { carregarDados(); }, []);

  const carregarDados = async () => {
    setCarregando(true);
    setErro(null);
    try {
      setJogadores(await obterPerfisJogadores());
    } catch (e: any) {
      setErro(e?.message ?? 'Erro na conexão com o servidor.');
    } finally {
      setCarregando(false);
    }
  };

  // ── Navegação do seletor (igual ao index.tsx) ──
  const handleSelectFromTop = (index: number) => {
    flatListSelectorRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
    pagerRef.current?.setPage(index);
    setActiveIndex(index);
  };

  const handlePrevious = () => { if (activeIndex > 0) handleSelectFromTop(activeIndex - 1); };
  const handleNext     = () => { if (activeIndex < CATEGORIAS.length - 1) handleSelectFromTop(activeIndex + 1); };

  const onPageSelected = (e: any) => {
    const index = e.nativeEvent.position;
    if (index !== activeIndex) {
      flatListSelectorRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
      setActiveIndex(index);
    }
  };

  const renderCategorySelectorItem = ({ item, index }: { item: any; index: number }) => {
    const isActive = index === activeIndex;
    if (isActive) {
      return (
        <LinearGradient
          colors={['#006AFF', '#009FFF']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.activeItemContainer}   // reutilize os mesmos estilos do index
        >
          <Text style={styles.activeItemText}>{item.title}</Text>
        </LinearGradient>
      );
    }
    return (
      <TouchableOpacity onPress={() => handleSelectFromTop(index)} style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="ESTATÍSTICAS" icon="chart-box-outline" iconName="bell"  />

      {/* ── Seletor de categoria (igual ao index.tsx) ── */}
      <View style={styles.carrosselWrapper}>
        <View style={styles.carrosselInternal}>
          <TouchableOpacity onPress={handlePrevious} style={styles.botaoSeta} activeOpacity={0.7}>
            <MaterialCommunityIcons name="chevron-left" size={30} color="#FFF" />
          </TouchableOpacity>

          <FlatList
            ref={flatListSelectorRef}
            data={CATEGORIAS}
            horizontal
            renderItem={renderCategorySelectorItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListSelectorContent}
            snapToInterval={ITEM_INTERVAL}
            decelerationRate="fast"
            initialScrollIndex={1}
            scrollEnabled={false}
            getItemLayout={(_, index) => ({
              length: ITEM_INTERVAL,
              offset: ITEM_INTERVAL * index,
              index,
            })}
          />

          <TouchableOpacity onPress={handleNext} style={styles.botaoSeta} activeOpacity={0.7}>
            <MaterialCommunityIcons name="chevron-right" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── PagerView com uma página por categoria ── */}
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={1}
        onPageSelected={onPageSelected}
        scrollEnabled={false}   
      >
        {CATEGORIAS.map((cat) => (
          <View key={cat.id}>
            <PageContent
              categoriaKey={cat.key}
              jogadores={jogadores}        // passe a lista filtrada por categoria quando tiver o back-end
              carregando={carregando}
              erro={erro}
              onRetry={carregarDados}
            />
          </View>
        ))}
      </PagerView>
    </View>
  );
}