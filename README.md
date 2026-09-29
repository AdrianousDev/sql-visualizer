# SQL Visualizer — OPA UNIVALI

Aplicação didática para visualizar comandos SQL e manipular visitantes em um banco PostgreSQL.

## Pré-requisitos

- Node.js e npm instalados.
- Docker com Docker Compose instalado e em execução.

## Rodar localmente

### 1. Preparar e iniciar o backend

Na raiz do projeto, execute:

```bash
cd api-node
npm install
cp .env.example .env
docker compose -f docker/compose.yml up -d
```

Aguarde o PostgreSQL iniciar. Na primeira execução, prepare o banco e gere o Prisma Client:

```bash
npm run prisma:migrate
npm run prisma:generate
```

Inicie a API e mantenha o terminal aberto:

```bash
npm run dev
```

O backend estará disponível em `http://localhost:3000`.

### 2. Iniciar o frontend

Em outro terminal, a partir da raiz do projeto:

```bash
cd react-app
npm install
npm run dev
```

### 3. Acessar o app

Abra [http://localhost:5173](http://localhost:5173) no navegador. Se a porta estiver ocupada, use o endereço indicado pelo Vite no terminal.

Nas próximas execuções, basta subir o PostgreSQL com o mesmo comando do Docker Compose e iniciar o backend e o frontend com `npm run dev` em seus respectivos diretórios. Se houver novas migrations, execute também `npm run prisma:migrate` e `npm run prisma:generate` no backend.
