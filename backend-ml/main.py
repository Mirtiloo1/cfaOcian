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

@app.get("/api/jogadores/perfis")
def analisar_perfis_jogadores():
    df = pd.read_csv('jogadores_stats.csv', encoding='utf-8')
    df.columns = df.columns.str.strip().str.lower()

    features = ['gols', 'assistencias', 'desarmes', 'faltas_cometidas']

    colunas_faltando = [f for f in features if f not in df.columns]
    if colunas_faltando:
        raise HTTPException(
            status_code=500,
            detail=f"Colunas não encontradas no CSV: {colunas_faltando}. Disponíveis: {list(df.columns)}"
        )

    n_clusters = min(3, len(df))
    if n_clusters < 2:
        raise HTTPException(
            status_code=500,
            detail="São necessários pelo menos 2 jogadores para gerar perfis."
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

    cluster_ofensivo  = centroides['gols'].idxmax()
    cluster_defensivo = centroides['desarmes'].idxmax()

    def mapear_perfil(cluster_id):
        if cluster_id == cluster_ofensivo:
            return "Ofensivo"
        elif cluster_id == cluster_defensivo:
            return "Defensivo"
        else:
            return "Equilibrado"

    df['perfil_ml'] = df['cluster'].apply(mapear_perfil)
    df = df.drop(columns=['cluster'])
    df = df.fillna("") 

    return df.to_dict(orient='records')