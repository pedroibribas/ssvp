<!-- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). -->

# Índice

Criar índice

---

# Desenvolvimento

### Base de Dados

```ts
// Item para doação
item: {
  id: ObjectId,
  name: String,
  donator: donator.id,
}

// Doador
donator: {
  id: ObjectId,
  name: String,
  phone: String
}
```

### Task List

- [x] Partida
  - [x] Base de dados? MongoDb
  - [x] Framework back-end? Node.js
  - [x] Framework front-end? React.js
  - [x] Pré-processador? SASS
- [ ] Montar back-end <mark>em andamento</mark>
  - [x] Setup
    - [x] Instalação de pacotes
      - [x] dotenv
      - [x] express
      - [x] express-async-handler
      - [x] mongoose
      - [x] nodemon
    - [x] Atalhos CLI
    - [x] Variáveis ambiente
      - [x] NODE_ENV
      - [x] PORT
      - [x] MONGO_URI
    - [x] Design das pastas
  - [ ] Inicializar servidor
  - [ ] Integrar servidor com a database
  - [ ] Servir product
    - [ ] Criar esquema do product
    - [ ] Criar roteamento
    - [ ] Criar middleware
- [ ] Montar front-end
  - [ ] Setup
    - [ ] Instalação de pacotes
      - [ ] Pacotes do React.js
      - [ ] Axios
      - [ ] SASS
  - [ ] Montar \_document
    - [ ] Favicon
    - [ ] Escolher fontes
  - [ ] Serviços HTTP
  - [ ] Estilizações
    - [ ] globals
      - [ ] Escolher cores
    - [ ] Home.module
  - [ ] Montar Home
- [ ] Deploy
  - [ ] Escolher servidor
  - [ ] Preparar aplicação para deploy

<!-- ## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details. -->