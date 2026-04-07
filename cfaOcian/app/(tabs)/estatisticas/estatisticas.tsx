import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import { obterPerfisJogadores, Jogador } from '@/src/services/mlService';
import { styles } from './estatisticasStyles';
import { Header } from '@/src/components/Header';
import { BASE_URL } from '@/src/services/api';
import { colors } from '@/src/theme/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FILTROS = [
  { label: 'GOLS',      id: 'gols' },
  { label: 'ASSIST.',   id: 'assistencias' },
  { label: 'AMARELOS',  id: 'cartoes_amarelos' },
  { label: 'VERMELHOS', id: 'cartoes_vermelhos' },
  { label: 'DESARMES',  id: 'desarmes' },
];

const PLACEHOLDER  = require('@/assets/images/placeholder_jogador.png');
const LIMITE_PASSO = 5;
const LIMITE_INIT  = 4;

const fotoSource = (foto?: string) =>
  foto ? { uri: `${BASE_URL}/fotos/${foto}` } : PLACEHOLDER;

const pad2 = (n: number) => String(n ?? 0).padStart(2, '0');

export default function Estatisticas() {
  const [jogadores, setJogadores]         = useState<Jogador[]>([]);
  const [filtrados, setFiltrados]         = useState<Jogador[]>([]);
  const [carregando, setCarregando]       = useState(true);
  const [erro, setErro]                   = useState<string | null>(null);
  const [filtroAtivo, setFiltroAtivo]     = useState('gols');
  const [busca, setBusca]                 = useState('');
  const [limiteRanking, setLimiteRanking] = useState(LIMITE_INIT);

  useEffect(() => { carregarDados(); }, []);

  useEffect(() => {
    let lista = [...jogadores].sort((a, b) =>
      ((b as any)[filtroAtivo] ?? 0) - ((a as any)[filtroAtivo] ?? 0)
    );
    if (busca.trim()) {
      const t = busca.toLowerCase();
      lista = lista.filter(j =>
        j.nome?.toLowerCase().includes(t) ||
        j.posicao?.toLowerCase().includes(t)
      );
    }
    setFiltrados(lista);
    setLimiteRanking(LIMITE_INIT);
  }, [filtroAtivo, jogadores, busca]);

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

  const labelFiltro = FILTROS.find(f => f.id === filtroAtivo)?.label ?? '';
  const getValor    = (j: Jogador) => (j as any)[filtroAtivo] ?? 0;
  const top3        = filtrados.slice(0, 3);
  const ranking     = filtrados.slice(3, 3 + limiteRanking);
  const temMais     = 3 + limiteRanking < filtrados.length;

  if (carregando) {
    return (
      <View style={[styles.container, styles.centralizado]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.txtCarregando}>Analisando desempenho...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={[styles.container, styles.centralizado]}>
        <Text style={styles.txtErro}>Ops! {erro}</Text>
        <TouchableOpacity style={styles.btnRetry} onPress={carregarDados}>
          <Text style={styles.txtBtnRetry}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="ESTATÍSTICAS" icon="chart-box-outline" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >

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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollFiltros}
          style={styles.areaFiltros}
        >
          {FILTROS.map(f => (
            <TouchableOpacity
              key={f.id}
              style={[styles.btnFiltro, filtroAtivo === f.id && styles.btnFiltroAtivo]}
              onPress={() => setFiltroAtivo(f.id)}
              activeOpacity={0.8}
            >
              <Text style={[styles.txtFiltro, filtroAtivo === f.id && styles.txtFiltroAtivo]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {top3[0] && (
          <View style={styles.card1}>
            <Text style={styles.card1NumFundo}>01</Text>
            <Image source={fotoSource(top3[0].foto)} style={styles.card1Foto} />
            <Text style={styles.card1Nome}>{top3[0].nome}</Text>
            <Text style={styles.card1Time}>{(top3[0] as any).time ?? top3[0].posicao}</Text>
            <View style={styles.card1RowValor}>
              <Text style={styles.card1Valor}>{getValor(top3[0])}</Text>
              <Text style={styles.card1LabelValor}> {labelFiltro}</Text>
            </View>
          </View>
        )}

        {[top3[1], top3[2]].map((j, i) =>
          j ? (
            <View key={j.id_jogador ?? i} style={styles.cardSec}>
              <Text style={styles.cardSecNumFundo}>{pad2(i + 2)}</Text>
              <Image source={fotoSource(j.foto)} style={styles.cardSecFoto} />
              <View style={styles.cardSecInfo}>
                <Text style={styles.cardSecNome}>{j.nome}</Text>
                <Text style={styles.cardSecTime}>{(j as any).time ?? j.posicao}</Text>
                <View style={styles.cardSecRowValor}>
                  <Text style={styles.cardSecValor}>{getValor(j)}</Text>
                  <Text style={styles.cardSecLabelValor}> {labelFiltro}</Text>
                </View>
              </View>
            </View>
          ) : null
        )}

        {filtrados.length > 3 && (
          <View style={styles.rankingContainer}>

            <View style={styles.rankingHeader}>
              <Text style={styles.rankingTitulo}>RANKING COMPLETO</Text>
              <Text style={styles.rankingAtualizado}>
                ATUALIZADO: HOJE,{' '}
                {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>

            <View style={styles.rankingColunas}>
              <Text style={[styles.rankingColTxt, { width: 32 }]}>#</Text>
              <Text style={[styles.rankingColTxt, { flex: 1 }]}>JOGADOR</Text>
              <Text style={styles.rankingColTxt}>VALOR</Text>
            </View>

            {ranking.map((j, i) => (
              <View key={j.id_jogador ?? i} style={styles.rankingLinha}>
                <Text style={styles.rankingPos}>{pad2(i + 4)}</Text>
                <Image source={fotoSource(j.foto)} style={styles.rankingFoto} />
                <View style={styles.rankingInfoJogador}>
                  <Text style={styles.rankingNome}>{j.nome}</Text>
                  <Text style={styles.rankingTime}>{(j as any).time ?? j.posicao}</Text>
                </View>
                <Text style={styles.rankingValor}>{pad2(getValor(j))}</Text>
              </View>
            ))}

            {temMais && (
              <TouchableOpacity
                style={styles.btnCarregarMais}
                onPress={() => setLimiteRanking(l => l + LIMITE_PASSO)}
                activeOpacity={0.7}
              >
                <Text style={styles.txtCarregarMais}>CARREGAR MAIS RESULTADOS</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

      </ScrollView>
    </View>
  );
}