# Lista de Tarefas - EcoAlerta Local

Acompanhamento do progresso de desenvolvimento do MVP EcoAlerta Local.

## 🛠️ Progresso Geral
- `[x]` **Etapa 1: Git e Configuração Inicial**
  - `[x]` Inicializar o repositório Git local no workspace
  - `[x]` Criar arquivo `.gitignore` global para o projeto
- `[x]` **Etapa 2: Infraestrutura (`/infra`)**
  - `[x]` Criar `docker-compose.yml` (MySQL, NestJS, Angular)
  - `[x]` Criar `Dockerfile` para o backend NestJS (`Dockerfile.api`)
  - `[x]` Criar `Dockerfile` para o frontend Angular (`Dockerfile.app`)
- `[ ]` **Etapa 3: Backend (`/api`)**
  - `[ ]` Inicializar o projeto NestJS na pasta `/api`
  - `[ ]` Configurar o Prisma ORM e a conexão com o MySQL
  - `[ ]` Criar o schema Prisma com a tabela `Alert` (Campos: id, description, latitude, longitude, photo, type, createdAt)
  - `[ ]` Implementar o recurso de alertas (Module, Controller, Service)
  - `[ ]` Implementar endpoints `POST /alerts` e `GET /alerts`
  - `[ ]` Configurar CORS global na API NestJS
- `[ ]` **Etapa 4: Frontend (`/app`)**
  - `[ ]` Inicializar o projeto Angular na pasta `/app`
  - `[ ]` Configurar o Tailwind CSS no Angular
  - `[ ]` Criar o modelo/interface do Alerta e o `AlertService` para requisições HTTP
  - `[ ]` Criar componente do `Header` / Navegação
  - `[ ]` Criar componente do `Mural de Dicas` (ODS 13 e Educação Climática)
  - `[ ]` Criar componente de `Mural de Alertas (Feed)` com cards detalhados
  - `[ ]` Criar componente do `Botão Flutuante (FAB)` e o `Modal de Cadastro de Alerta`
  - `[ ]` Integrar a API nativa de Geolocalização (HTML5 Geolocation) e captura de fotos (Base64) no modal
- `[ ]` **Etapa 5: Validação e Versionamento**
  - `[ ]` Subir o ambiente completo no Docker Compose e validar a comunicação
  - `[ ]` Validar persistência e listagem de alertas no frontend
  - `[ ]` Finalizar o versionamento do projeto no Git
