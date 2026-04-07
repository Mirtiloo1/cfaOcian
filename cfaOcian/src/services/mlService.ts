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
  cartoes_amarelos: number;
  cartoes_vermelhos: number;
  perfil_ml: 'Ofensivo' | 'Defensivo' | 'Equilibrado';
  foto?: string;
}

export const obterPerfisJogadores = async (): Promise<Jogador[]> => {
  const resposta = await fetch(`${BASE_URL}/api/jogadores/perfis`);

  const dados = await resposta.json();

  if (!resposta.ok || dados?.erro) {
    throw new Error(dados?.erro ?? `Erro HTTP ${resposta.status}`);
  }

  return dados as Jogador[];
};