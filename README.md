# M6-S1 Desafio Fullstack

## Primeiros passos

Para clonar e executar este repositório, você precisará do [Git](https://git-scm.com), do [Node.js](https://nodejs.org/pt-br/download/), do [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) e do [PostgreSQL](https://www.postgresql.org/download/) instalados em seu computador. \
Na sua linha de comando:

```bash
# Clone este repositório
git clone git@github.com:ThomSchreiner/M6-S1__Desafio_Fullstack.git
# Entre no repositório do back end
cd ./M6-S1__Desafio_Fullstack/back_end/
# Intale as dependências
yarn
# Intancie o banco de dados
yarn typeorm migration:run -d ./src/data-source.ts
# Execute a api
yarn dev
# Abra outro terminal na raiz do repositório e entre na pasta do front end
cd ./front_end/
# Intale as dependências
yarn
# Inicie a aplicação
yarn dev
```

Clique [aqui](http://localhost:3000) e veja a aplicação funcionando.
