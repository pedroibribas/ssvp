## Rotas

**Obter doações**

- Rota: `/api/donations`
- Operação: `GET`
- Parâmetros: nenhum
- Corpo da requisição: nenhum
- Sucesso:

```js
[
  {
    id: /* String */,
    title: /* String */,
    donator: /* String */
  }
]
```

---

**Criar doações**

- Rota: `/api/donations`
- Operação: `POST`
- Parâmetros: nenhum
- Corpo da requisição:

```js
{
  donations: [
    {
      title: /* String */
    }
  ]
}
```

- Sucesso:

```js
{
  message: 'New donation created'
}
```

---

**Deletar doação**

- Rota: `/api/donations`
- Operação: `DELETE`
- Parâmetros: nenhum
- Corpo da requisição:

```js
{
  id: /* String */
}
```

- Sucesso:

```js
{
  message: 'Donation removed'
}
```

---

**Adicionar doador**

- Rota: `/api/donations/donator`
- Operação: `POST`
- Parâmetros: nenhum
- Corpo da requisição:

```js
{
  name: /* String */,
  donations: [
    {
      id: /* String */,
      isChecked: /* Boolean */,
    }
  ]
}
```

- Sucesso:

```js
{
  message: 'Donator added'
}
```

**Remover doador**

- Rota: `/api/donations/donator`
- Operação: `DELETE`
- Parâmetros: nenhum
- Corpo da requisição:

```js
{
  id: /* String */
}
```

- Sucesso:

```js
{
  message: 'Donator removed'
}
```

# Desenvolvimento

### Task List

- [x] Partida
  - [x] Base de dados? MongoDb
  - [x] Framework back-end? Node.js, Express.js
  - [ ] Hospedagem? Railway
  - [x] Setup do back-end
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
    - [x] Criar .gitignore
- [x] Montar back-end <mark>em andamento</mark>
  - [x] Inicializar servidor
  - [x] Integrar servidor com a database
  - [x] Servir dados
    - [x] Criar esquema Donation
    - [x] Criar roteamento
    - [x] Criar controladores
- [ ] Deploy

- [ ] Limpar importação dos controladores no app.js
- [ ] Limpar código dos controladores => as funções estão assíncronas
