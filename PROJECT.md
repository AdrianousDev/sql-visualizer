# PROJECT.md

# SQL Visualizer — OPA UNIVALI

## 1. Objetivo

Este projeto é uma aplicação web full stack simples criada para uma demonstração de SQL básico no OPA da UNIVALI.

A aplicação deve permitir que uma pessoa visualize a relação entre ações realizadas em uma interface gráfica e os comandos SQL equivalentes.

Exemplo:

Ao selecionar a operação `INSERT` e preencher:

- nome: `Ana`
- idade: `20`

a interface deve exibir:

```sql
INSERT INTO visitantes (nome, idade)
VALUES ('Ana', 20);
```

Ao executar a operação, o frontend envia uma requisição HTTP para a API, que utiliza Prisma para persistir os dados no PostgreSQL.

O SQL mostrado na interface é uma representação didática e não deve depender do SQL interno gerado pelo Prisma.

---

## 2. Escopo

A aplicação será executada somente em ambiente local (`localhost`).

Não faz parte do escopo:

- autenticação;
- autorização;
- usuários;
- deploy em produção;
- cloud;
- arquitetura distribuída;
- microsserviços;
- gerenciamento complexo de estado;
- observabilidade;
- arquitetura enterprise.

As prioridades do projeto são:

1. simplicidade;
2. legibilidade;
3. facilidade de demonstração;
4. valor didático;
5. código fácil de compreender por estudantes.

---

## 3. Estrutura do repositório

Todo o projeto deve permanecer no mesmo repositório.

Estrutura esperada:

```text
.
├── react-app/
├── api-node/
├── .gitignore
├── README.md
├── PROJECT.md
└── AGENTS.md
```

O frontend e o backend são aplicações independentes dentro do mesmo repositório.

---

# 4. Frontend

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS

O projeto deve ser criado usando Vite com o template React + TypeScript.

Não utilizar frameworks full stack no frontend.

---

## 4.1. Tela principal

A tela principal deve ocupar aproximadamente toda a altura da viewport.

A estrutura visual principal será dividida em duas áreas lado a lado.

```text
┌─────────────────────────┬─────────────────────────┐
│                         │                         │
│       FORMULÁRIO        │       SQL PREVIEW       │
│                         │                         │
│                         │                         │
└─────────────────────────┴─────────────────────────┘

          [ Visualizar visitantes ]
```

A implementação pode utilizar algo equivalente a:

```tsx
<main className="flex min-h-dvh flex-col">
  <section className="grid flex-1 grid-cols-2">
    <div>{/* operação + formulário */}</div>
    <div>{/* SQL */}</div>
  </section>

  <section>
    {/* botão para abrir SELECT */}
  </section>
</main>
```

Essa estrutura é apenas uma referência. Pequenos ajustes são permitidos desde que o comportamento e a simplicidade sejam mantidos.

---

# 5. Operações SQL

A aplicação trabalhará com quatro operações didáticas:

- INSERT
- UPDATE
- DELETE
- SELECT

INSERT, UPDATE e DELETE estarão na tela principal.

SELECT será apresentado através de um modal de visualização dos registros.

---

## 5.1. INSERT

Campos:

- nome
- idade

Exemplo:

```text
Nome: Ana
Idade: 20
```

SQL exibido:

```sql
INSERT INTO visitantes (nome, idade)
VALUES ('Ana', 20);
```

Ao executar:

```http
POST /visitors
```

Body aproximado:

```json
{
  "nome": "Ana",
  "idade": 20
}
```

---

## 5.2. UPDATE

Campos:

- id
- nome
- idade

Exemplo:

```text
ID: 1
Nome: Ana Maria
Idade: 21
```

SQL exibido:

```sql
UPDATE visitantes
SET nome = 'Ana Maria',
    idade = 21
WHERE id = 1;
```

Ao executar:

```http
PUT /visitors/1
```

---

## 5.3. DELETE

Campo:

- id

Exemplo:

```text
ID: 1
```

SQL exibido:

```sql
DELETE FROM visitantes
WHERE id = 1;
```

Ao executar:

```http
DELETE /visitors/1
```

---

# 6. SELECT

Abaixo da interface principal deve existir um botão semelhante a:

```text
Visualizar visitantes
```

Ao clicar, deve abrir um modal contendo uma tabela paginada.

Exemplo:

```text
┌────┬──────────────────────┬───────┐
│ ID │ Nome                 │ Idade │
├────┼──────────────────────┼───────┤
│ 1  │ Ana                  │ 20    │
│ 2  │ João                 │ 24    │
│ 3  │ Maria                │ 19    │
└────┴──────────────────────┴───────┘

              < 1 2 3 >
```

A consulta será realizada através de:

```http
GET /visitors?page=1&limit=10
```

O modal também deve mostrar o SQL didático correspondente à página atual.

Página 1:

```sql
SELECT id, nome, idade
FROM visitantes
ORDER BY id
LIMIT 10 OFFSET 0;
```

Página 2:

```sql
SELECT id, nome, idade
FROM visitantes
ORDER BY id
LIMIT 10 OFFSET 10;
```

Para um limite `L` e página `P`, o offset pode ser calculado como:

```text
OFFSET = (P - 1) * L
```

---

# 7. Componentização do frontend

A aplicação deve ser componentizada, mas sem excesso de abstração.

Estrutura sugerida:

```text
react-app/
└── src/
    ├── components/
    │   ├── OperationTabs.tsx
    │   ├── VisitorForm.tsx
    │   ├── SqlPreview.tsx
    │   ├── VisitorsModal.tsx
    │   └── VisitorsTable.tsx
    │
    ├── services/
    │   └── visitorService.ts
    │
    ├── utils/
    │   └── sqlPreview.ts
    │
    ├── types/
    │   └── visitor.ts
    │
    ├── App.tsx
    ├── main.tsx
    └── index.css
```

Essa estrutura pode sofrer pequenos ajustes se houver uma justificativa simples.

---

## 7.1. Estado

O projeto é pequeno.

Preferir:

- `useState`;
- props;
- estado local.

Evitar adicionar soluções globais sem necessidade.

Não utilizar:

- Redux;
- Zustand;
- Context API sem necessidade real;
- React Query;
- bibliotecas de formulário.

---

## 7.2. Requisições HTTP

Utilizar a API nativa:

```ts
fetch()
```

Centralizar chamadas HTTP em:

```text
services/visitorService.ts
```

Não utilizar Axios sem necessidade.

---

# 8. SQL didático

A geração do SQL exibido na interface deve ficar separada da comunicação com o backend.

Estrutura esperada:

```text
Estado do formulário
       │
       ├──────────────► sqlPreview.ts
       │                     │
       │                     ▼
       │                 SQL visual
       │
       └──────────────► visitorService.ts
                             │
                             ▼
                         API Express
                             │
                             ▼
                           Prisma
                             │
                             ▼
                         PostgreSQL
```

O arquivo:

```text
utils/sqlPreview.ts
```

deve concentrar funções responsáveis pela geração dos comandos SQL apresentados ao usuário.

O frontend não deve tentar interceptar, analisar ou reproduzir o SQL interno executado pelo Prisma.

---

# 9. Backend

## Stack

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL

O projeto backend será criado a partir de:

```bash
npm init -y
```

e terá TypeScript configurado explicitamente.

---

# 10. Arquitetura do backend

A arquitetura deve permanecer simples.

Fluxo esperado:

```text
HTTP Request
     │
     ▼
   Route
     │
     ▼
 Controller
     │
     ▼
   Prisma
     │
     ▼
PostgreSQL
```

Não criar camadas adicionais sem necessidade.

Não adicionar:

- Repository Pattern;
- Service Layer sem necessidade concreta;
- Use Cases;
- Dependency Injection;
- CQRS;
- DTOs complexos;
- arquitetura hexagonal;
- Clean Architecture completa.

Este é um projeto pequeno e didático.

---

## 10.1. Estrutura sugerida

```text
api-node/
├── docker/
│   └── compose.yml
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── controllers/
│   │   └── visitor.controller.ts
│   │
│   ├── routes/
│   │   └── visitor.routes.ts
│   │
│   ├── lib/
│   │   └── prisma.ts
│   │
│   └── server.ts
│
├── prisma.config.ts
├── .env
├── .env.example
├── package.json
└── tsconfig.json
```

A estrutura final pode variar de acordo com a versão instalada do Prisma, desde que continue simples e siga as práticas atuais da ferramenta.

---

# 11. API

Endpoints necessários:

```text
POST   /visitors
GET    /visitors?page=1&limit=10
PUT    /visitors/:id
DELETE /visitors/:id
```

---

## 11.1. POST /visitors

Cria um visitante.

Entrada:

```json
{
  "nome": "Ana",
  "idade": 20
}
```

---

## 11.2. GET /visitors

Lista visitantes.

Exemplo:

```http
GET /visitors?page=1&limit=10
```

Os registros devem ser ordenados por `id`.

A resposta deve fornecer informação suficiente para o frontend realizar paginação.

Exemplo conceitual:

```json
{
  "data": [
    {
      "id": 1,
      "nome": "Ana",
      "idade": 20
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

---

## 11.3. PUT /visitors/:id

Atualiza um visitante existente.

Entrada aproximada:

```json
{
  "nome": "Ana Maria",
  "idade": 21
}
```

---

## 11.4. DELETE /visitors/:id

Remove um visitante pelo ID.

---

# 12. Banco de dados

O banco será PostgreSQL executado localmente através de Docker Compose.

Apenas o PostgreSQL precisa obrigatoriamente estar em container.

Frontend e backend podem ser executados diretamente pelo Node.js durante o desenvolvimento.

---

## 12.1. Entidade Visitante

Campos:

| Campo | Tipo | Regra |
|---|---|---|
| id | integer | primary key, autoincrement |
| nome | string | obrigatório |
| idade | integer | obrigatório |

Modelo Prisma aproximado:

```prisma
model Visitante {
  id    Int    @id @default(autoincrement())
  nome  String
  idade Int

  @@map("visitantes")
}
```

O nome físico da tabela deve ser:

```text
visitantes
```

Isso é importante porque os exemplos SQL exibidos na interface utilizarão esse nome.

---

# 13. Docker

O Docker Compose deve ficar em:

```text
api-node/docker/compose.yml
```

Ele deve subir apenas o PostgreSQL necessário para desenvolvimento.

Configuração esperada:

- PostgreSQL;
- porta padrão 5432;
- banco próprio para o projeto;
- credenciais locais simples;
- volume persistente.

Não adicionar containers desnecessários.

---

# 14. Validação

Como o projeto é didático, implementar apenas validações essenciais.

Exemplos:

- nome obrigatório;
- idade deve ser um número válido;
- id deve ser válido para UPDATE e DELETE;
- parâmetros de paginação devem possuir valores seguros.

Não adicionar bibliotecas de validação apenas para validar poucos campos, a menos que exista uma necessidade concreta posteriormente.

---

# 15. Tratamento de erros

Erros devem ser simples e compreensíveis.

Exemplos:

- visitante não encontrado;
- dados inválidos;
- erro de comunicação com a API;
- erro inesperado do servidor.

Não criar uma infraestrutura complexa de erros.

---

# 16. Interface

O visual deve funcionar bem em:

- notebook;
- monitor;
- projetor.

Priorizar:

- texto grande;
- boa legibilidade;
- contraste;
- separação visual entre formulário e SQL;
- aparência de editor de código no SQL Preview;
- tabela fácil de visualizar.

A aplicação é principalmente desktop.

Responsividade para dispositivos móveis é secundária.

---

# 17. Dependências

Antes de instalar uma nova dependência, verificar se a funcionalidade pode ser implementada de maneira simples com as ferramentas existentes.

Dependências desnecessárias devem ser evitadas.

Preferir APIs nativas e recursos das stacks já escolhidas.

---

# 18. Critério de conclusão

O projeto estará funcional quando for possível:

1. iniciar PostgreSQL com Docker;
2. iniciar a API Node.js;
3. iniciar o frontend React;
4. selecionar INSERT;
5. preencher nome e idade;
6. visualizar o SQL correspondente em tempo real;
7. executar o INSERT e salvar o visitante;
8. executar UPDATE;
9. executar DELETE;
10. abrir o modal de SELECT;
11. visualizar registros reais do PostgreSQL;
12. navegar pelas páginas da tabela;
13. visualizar o SELECT com LIMIT e OFFSET correspondente.

---

# 19. Princípio principal

Este projeto existe para demonstrar SQL.

A arquitetura deve ajudar nessa demonstração, e não competir com ela.

Quando houver duas soluções válidas, preferir a mais simples e fácil de explicar.
