import { BASE_URL } from './api';

export interface Jogador {
  id_jogador: number;
  nome: string;
  posicao: string;
  jogos_disputados: number;
  gols: number;
  assistencias: number;
  desarmes: number;
  faltas_cometidas: number;
  faltas_sofridas?: number;
  cartoes_amarelos: number;
  cartoes_vermelhos: number;
  perfil_ml: 'Atacante' | 'Defensor' | 'Versátil';
  foto?: string;
  time?: string;
  categoria?: string;
}

export interface ResumoCategoria {
  artilheiro: { nome: string; gols: number } | null;
  assistente: { nome: string; assistencias: number; colocacao: number } | null;
  lider: { nome: string; pontos: number } | null;
}

interface RespostaAPI {
  total: number;
  distribuicao?: Record<string, number>;
  jogadores: Jogador[];
}

export const obterPerfisJogadores = async (): Promise<Jogador[]> => {
  const resposta = await fetch(`${BASE_URL}/api/jogadores/perfis`);
  const dados: RespostaAPI = await resposta.json();
  if (!resposta.ok || (dados as any)?.erro) {
    throw new Error((dados as any)?.erro ?? `Erro HTTP ${resposta.status}`);
  }
  return dados.jogadores;
};

export function calcularResumo(jogadores: Jogador[]): ResumoCategoria {
  if (!jogadores.length) {
    return { artilheiro: null, assistente: null, lider: null };
  }

  const porGols = [...jogadores].sort((a, b) => (b.gols ?? 0) - (a.gols ?? 0));
  const artilheiro = porGols[0];

  const porAssist = [...jogadores].sort((a, b) => (b.assistencias ?? 0) - (a.assistencias ?? 0));
  const assistente = porAssist[0];
  const colocacaoAssist = porAssist.findIndex(j => j.id_jogador === assistente.id_jogador) + 1;

  const lider = [...jogadores].sort((a, b) => {
    const aprovA = ((a.gols ?? 0) + (a.assistencias ?? 0)) / Math.max(a.jogos_disputados ?? 1, 1);
    const aprovB = ((b.gols ?? 0) + (b.assistencias ?? 0)) / Math.max(b.jogos_disputados ?? 1, 1);
    return aprovB - aprovA;
  })[0];

  const pontos = (lider.gols ?? 0) * 3 + (lider.assistencias ?? 0);

  return {
    artilheiro: { nome: artilheiro.nome, gols: artilheiro.gols ?? 0 },
    assistente: { nome: assistente.nome, assistencias: assistente.assistencias ?? 0, colocacao: colocacaoAssist },
    lider: { nome: lider.nome, pontos },
  };
}