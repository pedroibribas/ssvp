## Rotas

**Obter listas**

- Rota: `/api/lists`
- Acesso: Privado
- Operação: `GET`
- Parâmetros: nenhum
- Corpo da requisição: nenhum
- Sucesso:

```json
[
  {
    "id": /* String */,
    "manager": /* String */,
    "items": [
      {
        "id": /* String */,
        "title": /* String */,
        "donator": /* String */
      }
    ]
  }
]
```

---

**Criar lista**

- Rota: `/api/lists`
- Acesso: Privado
- Operação: `POST`
- Parâmetros: nenhum
- Corpo da requisição:

```json
{
  "manager": /* String */,
  "items": [
    {
      "title": /* String */
    }
  ]
}
```

- Sucesso:

```json
{
  "message": "List created"
}
```

---

**Obter lista**

- Rota: `/api/lists/:id`
- Acesso: Público
- Operação: `GET`
- Parâmetros: `:id` da página
- Corpo da requisição: nenhum

- Sucesso:

```json
{
  "id": /* String */,
  "manager": /* String */,
  "items": [
    {
      "id": /* String */,
      "title": /* String */,
      "donator": /* String */
    }
  ]
}
```

---

**Adicionar doação**

- Rota: `/api/lists:id`
- Acesso: Privado
- Operação: `POST`
- Parâmetros: nenhum
- Corpo da requisição:

```json
  {
    "title": /* String */
  }
```

- Sucesso:

```json
{
  "message": "Donation added"
}
```

---

**Deletar lista**

- Rota: `/api/lists/:id`
- Acesso: Privado
- Operação: `DELETE`
- Parâmetros: `:id` da página
- Corpo da requisição: Auth

- Sucesso:

```json
{
  "message": "List removed"
}
```

---

**Deletar doação**

- Rota: `/api/lists/:listId/donations/:itemId`
- Acesso: Privado
- Operação: `DELETE`
- Parâmetros: `listId`, `itemId`
- Corpo da requisição: Auth

- Sucesso:

```json
{
  "message": "Donation removed"
}
```

---

**Adicionar doador**

- Rota: `/api/lists/:id/donations`
- Acesso: Público
- Operação: `POST`
- Parâmetros: nenhum
- Corpo da requisição:

```json
{
  "name": /* String */,
  "donations": [
    {
      "id": /* String */,
      "isChecked": /* Boolean */,
    }
  ]
}
```

- Sucesso:

```json
{
  "message": "Donator added"
}
```

**Remover doador**

- Rota: `/api/lists/:id/donations/:itemId/donator`
- Acesso: Privado
- Operação: `Delete`
- Parâmetros: `listId`, `itemId`
- Corpo da requisição: Auth

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
- [x] Montar back-end
  - [x] Inicializar servidor
  - [x] Integrar servidor com a database
  - [x] Servir dados
    - [x] Criar esquema List
    - [x] Criar roteamento
    - [x] Criar controladores
  - [ ] Servir dados
    - [ ] Criar esquema User
    - [ ] Criar roteamento
    - [ ] Criar controladores
- [ ] Deploy

- [x] Tratar erro de simultaneidade
- [x] Refatorar rota de exclusão de doador
- [ ] Limpar importação dos controladores no app.js
