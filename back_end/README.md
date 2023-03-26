# M6-S1 Desafio Fullstack

## Primeiros passos para usar a API

Para clonar e executar este repositório, você precisará do [Git](https://git-scm.com), do [Node.js](https://nodejs.org/pt-br/download/), do [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) e do [PostgreSQL](https://www.postgresql.org/download/) instalados em seu computador. \
Na sua linha de comando:

```bash
# Clone este repositório
git clone git@github.com:ThomSchreiner/M6-S1__Desafio_Fullstack.git
# Entre no repositório
cd M6-S1__Desafio_Fullstack
# Intale as dependências
yarn
# Intancie o banco de dados
yarn typeorm migration:run -d .\src\data-source.ts
# Execute a api
yarn dev
```
