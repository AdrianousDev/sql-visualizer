# AGENTS.md

# Instruções para agentes de desenvolvimento

Este arquivo contém regras para agentes de IA que trabalhem neste repositório.

Antes de implementar qualquer alteração:

1. leia `PROJECT.md`;
2. leia este arquivo;
3. analise apenas os arquivos relevantes para a tarefa;
4. respeite o escopo solicitado.

---

# 1. Objetivo do projeto

Este é um projeto educacional pequeno para demonstrar operações SQL básicas no OPA da UNIVALI.

As prioridades são:

1. simplicidade;
2. legibilidade;
3. facilidade de explicação;
4. rapidez de desenvolvimento;
5. baixo número de abstrações.

Não trate este projeto como uma aplicação enterprise.

---

# 2. Regra principal

Não faça overengineering.

Quando existirem duas soluções corretas, prefira a solução:

- menor;
- mais explícita;
- mais fácil de ler;
- mais fácil de explicar para um estudante.

Não crie abstrações apenas porque seriam comuns em projetos maiores.

---

# 3. Escopo das tarefas

Implemente somente o que foi solicitado.

Não aproveite uma tarefa pequena para:

- reorganizar o projeto inteiro;
- renomear arquivos não relacionados;
- trocar bibliotecas;
- introduzir novos patterns;
- refatorar código fora do escopo;
- alterar comportamento não relacionado.

Se identificar uma melhoria fora do escopo, apenas informe ao final. Não implemente sem solicitação.

---

# 4. Antes de editar

Antes de fazer alterações relevantes:

1. leia `PROJECT.md`;
2. identifique os arquivos diretamente relacionados;
3. entenda a implementação existente;
4. preserve os padrões já utilizados no repositório.

Não recrie soluções que já existam no projeto.

---

# 5. Frontend

Stack:

- React;
- TypeScript;
- Vite;
- Tailwind CSS.

Preferir:

- componentes funcionais;
- `useState`;
- props;
- funções pequenas;
- `fetch`;
- tipos TypeScript simples.

Não adicionar sem necessidade:

- Redux;
- Zustand;
- React Query;
- Axios;
- React Router;
- bibliotecas de formulário;
- bibliotecas de estado global;
- bibliotecas de UI grandes.

---

# 6. Componentização

Componentize quando isso melhorar a leitura.

Evite componentes excessivamente pequenos que apenas movam poucas linhas para outro arquivo sem ganho real de legibilidade.

Estrutura sugerida:

```text
components/
services/
utils/
types/
```

Responsabilidades esperadas:

- `components/`: interface visual;
- `services/`: comunicação HTTP;
- `utils/`: lógica utilitária, principalmente geração do SQL didático;
- `types/`: tipos compartilhados do frontend.

---

# 7. Estado React

Manter o estado o mais próximo possível de onde ele é utilizado.

Para o tamanho atual do projeto, `App.tsx` pode coordenar parte importante do estado da aplicação.

Não introduzir estado global sem uma necessidade concreta.

---

# 8. Comunicação HTTP

Utilizar `fetch`.

Centralizar chamadas da API relacionadas a visitantes em:

```text
services/visitorService.ts
```

Não fazer chamadas HTTP espalhadas por diversos componentes quando elas puderem ser facilmente centralizadas.

---

# 9. SQL Preview

O SQL apresentado ao usuário é didático.

Ele deve ser gerado pelo frontend com base no estado atual do formulário.

Centralizar essa lógica em:

```text
utils/sqlPreview.ts
```

Não:

- capturar queries internas do Prisma;
- acoplar o SQL Preview ao ORM;
- enviar SQL bruto do frontend para execução;
- executar diretamente o SQL digitado pelo usuário.

O banco continua sendo acessado pela API através do Prisma.

---

# 10. Backend

Stack:

- Node.js;
- TypeScript;
- Express;
- Prisma;
- PostgreSQL.

Arquitetura esperada:

```text
route -> controller -> Prisma
```

Essa arquitetura é suficiente para este projeto.

---

# 11. Não adicionar arquitetura desnecessária

Não criar sem solicitação explícita:

- repositories;
- services de domínio;
- use cases;
- interfaces para repositories;
- dependency injection;
- CQRS;
- event bus;
- domain entities;
- factories complexas;
- Clean Architecture completa;
- arquitetura hexagonal.

Se futuramente o projeto crescer e alguma dessas estruturas passar a resolver um problema real, elas poderão ser avaliadas.

---

# 12. Prisma

Utilizar a versão instalada no projeto e seguir a configuração correspondente a essa versão.

Não copiar cegamente configurações de versões antigas do Prisma.

Antes de alterar configuração do Prisma:

1. verifique a versão presente em `package.json`;
2. observe os arquivos já gerados;
3. mantenha o padrão atual do projeto.

O model `Visitante` deve mapear para a tabela física:

```text
visitantes
```

---

# 13. Banco

PostgreSQL roda localmente através de Docker Compose.

Não adicionar outros bancos.

Não adicionar:

- Redis;
- MongoDB;
- SQLite;
- cache;
- filas;
- message brokers.

O banco possui finalidade didática e deve permanecer simples.

---

# 14. Docker

Docker é utilizado principalmente para executar PostgreSQL localmente.

Não containerizar frontend ou backend sem solicitação explícita.

O Compose deve permanecer pequeno e fácil de entender.

---

# 15. API

Endpoints definidos:

```text
POST   /visitors
GET    /visitors?page=1&limit=10
PUT    /visitors/:id
DELETE /visitors/:id
```

Não criar endpoints extras sem necessidade relacionada ao escopo.

---

# 16. Validação

Faça validações básicas e explícitas.

Exemplos:

- nome não vazio;
- idade numérica;
- ID válido;
- page e limit válidos.

Não instalar automaticamente uma biblioteca de validação apenas para poucos campos.

---

# 17. Tratamento de erros

Mantenha simples.

A API deve retornar códigos HTTP coerentes.

Exemplos:

- `200` para operações bem-sucedidas quando apropriado;
- `201` para criação;
- `400` para entrada inválida;
- `404` para visitante inexistente;
- `500` para erro inesperado.

Não criar uma infraestrutura complexa de exceptions.

---

# 18. TypeScript

Evitar:

```ts
any
```

sempre que um tipo simples puder ser definido.

Não criar sistemas de tipos excessivamente genéricos ou complexos.

Prefira tipos explícitos e fáceis de compreender.

---

# 19. Estilo de código

Siga o estilo já presente no projeto.

Priorizar:

- nomes descritivos;
- funções curtas;
- early returns quando melhorarem a leitura;
- pouca duplicação;
- comentários apenas quando adicionarem contexto real.

Não adicionar comentários que apenas descrevam literalmente o código.

---

# 20. Dependências

Não instalar novas dependências sem necessidade real.

Antes de instalar um pacote, pergunte:

> Isso já pode ser resolvido de forma simples com React, Node.js, Express, Prisma, Tailwind ou uma API nativa?

Se sim, não adicionar a dependência.

---

# 21. Alterações de arquivos

Evite alterar arquivos que não tenham relação com a tarefa atual.

Não execute formatações globais do projeto apenas por conveniência.

Não gere grandes diffs sem necessidade.

---

# 22. Verificações

Após alterações relevantes, execute as verificações disponíveis no projeto.

Quando aplicável:

Frontend:

```bash
npm run build
```

Backend:

```bash
npm run build
```

ou o script equivalente existente no `package.json`.

Se houver lint configurado:

```bash
npm run lint
```

Não invente comandos. Antes, consulte os scripts existentes no `package.json`.

---

# 23. Banco e migrations

Quando uma alteração mudar o schema do Prisma:

1. atualize `schema.prisma`;
2. gere/aplique a migration adequada;
3. atualize o Prisma Client se necessário;
4. verifique se a aplicação continua compilando.

Não apagar migrations existentes sem solicitação explícita.

Não resetar o banco automaticamente se isso puder destruir dados existentes.

---

# 24. Segurança

Embora seja uma aplicação local e educacional:

- não executar SQL enviado diretamente pelo frontend;
- não interpolar entrada do usuário em queries manuais;
- utilizar Prisma para acesso ao banco;
- não expor `.env` no Git;
- manter `.env.example` sem segredos reais.

---

# 25. README

Quando uma tarefa mudar significativamente a forma de iniciar ou utilizar a aplicação, avaliar se o `README.md` precisa ser atualizado.

O README deve permanecer curto e prático.

---

# 26. Commits

O agente não deve criar commits automaticamente, a menos que isso seja solicitado.

Quando sugerir uma mensagem de commit, utilizar Conventional Commits.

Exemplos:

```text
chore: initialize project

feat(api): add visitors CRUD

feat(ui): add SQL operation interface

feat(ui): add visitors modal

feat(app): integrate visitors API

style(ui): polish presentation layout

fix(api): handle invalid visitor id
```

---

# 27. Ao finalizar uma tarefa

Sempre fornecer um resumo curto contendo:

1. o que foi implementado;
2. arquivos principais alterados;
3. verificações executadas;
4. qualquer ponto relevante que ainda dependa de ação manual.

Não produzir explicações longas se não forem necessárias.

---

# 28. O que não fazer

Não:

- alterar arquitetura sem motivo;
- introduzir padrões enterprise;
- instalar pacotes desnecessários;
- criar dezenas de arquivos para uma feature simples;
- modificar frontend durante uma tarefa explicitamente limitada ao backend;
- modificar backend durante uma tarefa explicitamente limitada ao frontend;
- implementar funcionalidades futuras sem solicitação;
- transformar o projeto em algo maior do que sua finalidade didática.

---

# 29. Critério de decisão

Sempre que houver dúvida sobre como implementar algo, utilize esta ordem de prioridade:

1. atende ao requisito?
2. é correto?
3. é simples?
4. é legível?
5. é fácil de explicar?
6. utiliza as ferramentas já existentes?

Se a resposta for sim, provavelmente é a solução adequada para este projeto.
