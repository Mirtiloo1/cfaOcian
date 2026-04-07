from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

df_base = pd.read_csv('jogadores_stats.csv', encoding='utf-8')
df_base.columns = df_base.columns.str.strip().str.lower()


@app.get("/api/jogadores/perfis")
def analisar_perfis_jogadores():
    df = df_base.copy()

    if 'perfil_ml' in df.columns:
        return {
            "total": len(df),
            "jogadores": df.fillna("").to_dict(orient='records')
        }

    features = [
        'gols',
        'assistencias',
        'desarmes',
        'faltas_cometidas',
        'faltas_sofridas'
    ]

    colunas_faltando = [f for f in features if f not in df.columns]
    if colunas_faltando:
        raise HTTPException(
            status_code=500,
            detail=f"Colunas não encontradas: {colunas_faltando}"
        )

    df[features] = df[features].apply(pd.to_numeric, errors='coerce').fillna(0)

    if 'jogos_disputados' in df.columns:
        df['jogos_disputados'] = pd.to_numeric(df['jogos_disputados'], errors='coerce').replace(0, 1)
        for col in ['gols', 'assistencias', 'desarmes']:
            df[col] = df[col] / df['jogos_disputados']

    n_clusters = min(3, len(df))
    if n_clusters < 2:
        raise HTTPException(
            status_code=500,
            detail="Poucos jogadores para análise"
        )

    X = df[features]
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
    df['cluster'] = kmeans.fit_predict(X_scaled)

    centroides = pd.DataFrame(
        scaler.inverse_transform(kmeans.cluster_centers_),
        columns=features
    )

    cluster_ofensivo = (centroides['gols'] + centroides['assistencias']).idxmax()
    cluster_defensivo = centroides['desarmes'].idxmax()

    def mapear_perfil(cluster_id):
        if cluster_id == cluster_ofensivo:
            return "Atacante"
        elif cluster_id == cluster_defensivo:
            return "Defensor"
        else:
            return "Versátil"

    df['perfil_ml'] = df['cluster'].apply(mapear_perfil)

    distribuicao = df['perfil_ml'].value_counts().to_dict()

    df = df.drop(columns=['cluster'])
    df = df.fillna("")

    return {
        "total": len(df),
        "distribuicao": distribuicao,
        "jogadores": df.to_dict(orient='records')
    }