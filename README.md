# SSVP

## Informações

- Status: Online
- Hospedagem: Cyclic
- Linguagem: JavaScript
- Framework: Express.js
- Base de dados: MongoDb
- Criado por [Pedro Ribas](https://github.com/pedroibribas)
- Licensa MIT

## Rodando o projeto

- Criar variáveis de ambiente no arquivo raiz `.env`:

```bash
NODE_ENV="development"
PORT=5000
MONGODB_URI=#Gerar uma URI para conectar à base de produção
MONGODB_URI_QA=#Gerar uma URI para conectar à base de QA
JWT_SECRET=#Criar senha JWT
```

- Rodar o servidor:

```bash
# Clone o repositório
# Acesse a pasta do projeto
# Instale todas as dependências
npm install
# ou
yarn install

# Rode o servidor de desenvolvimento com Nodemon
npm run server
# ou
yarn server

# O projeto será inicializado localmente em <http://localhost:5000>
```


