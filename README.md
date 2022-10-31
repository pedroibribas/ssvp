# Lista de Doação da SSVP

Aplicação destinada a servir dados para a página web [Lista de Doação da SSVP](https://doarssvp.vercel.app).

<br/>

## Informações

- Status: Online
- Hospedagem: Cyclic
- Linguagem: JavaScript
- Framework: Express.js
- Base de dados: MongoDb
- Criado por [Pedro Ribas](https://github.com/pedroibribas)
- Licensa MIT

<br/>

## Rodando o projeto

```bash
# Clone o repositório
$ git clone https://github.com/pedroibribas/ssvp-donation-list-api.git
# ou com SSH
$ git clone git@github.com:pedroibribas/ssvp-donation-list-api.git

# Acesse a pasta do projeto
$ cd ssvp-donation-list-api

# Instale todas as dependências
npm install
# ou
yarn install

# Configure as variáveis de ambiente[*]

# Rode o servidor de desenvolvimento com nodemon
npm run server
# ou
yarn server

# Rode o front-end a partir do servidor [**]
npm run client
# ou
yarn client

# O projeto será inicializado localmente em <http://localhost:5000>
```

[*] Variáveis de ambiente no arquivo raiz `.env`:

```bash
# MongoDb
MONGODB_URI=#Gere uma URI para conectar ao MongoDb

# JWT
JWT_SECRET=#Crie uma senha JWT

# Local
NODE_ENV='development'#[**]
PORT=5000

#[**] Quando o ambiente é `development`, o servidor monta a versão build do front-end.
```
