# ToDo App — Front-end

Interface web responsiva para gerenciamento de tarefas, desenvolvida com React, TypeScript e Vite.

O projeto consome uma API REST construída com FastAPI e permite criar, visualizar, concluir, reabrir e excluir tarefas.

## Aplicação publicada

Acesse o projeto:

https://todo-app-frontend-e35w.onrender.com

## API utilizada

Documentação Swagger:

https://api-lista-de-tarefas-zjn5.onrender.com/docs

Repositório do back-end:

https://github.com/RafaDavila/API-Lista-de-Tarefas

## Funcionalidades

- Criar tarefas com título e descrição
- Validação de título e descrição
- Listar tarefas cadastradas
- Exibir data e horário de criação
- Marcar tarefas como concluídas
- Reabrir tarefas concluídas
- Excluir tarefas
- Confirmar antes da exclusão
- Exibir mensagens de sucesso e erro
- Exibir estado de carregamento
- Navegação entre páginas
- Interface responsiva para computadores e celulares

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- React Router
- Lucide React
- CSS
- Fetch API
- Render

## Integração com a API

O front-end consome os seguintes endpoints:

| Método | Endpoint | Função |
|---|---|---|
| POST | `/tasks/` | Criar uma tarefa |
| GET | `/tasks/` | Listar tarefas |
| GET | `/tasks/{id}` | Buscar uma tarefa |
| PUT | `/tasks/{id}` | Atualizar uma tarefa |
| DELETE | `/tasks/{id}` | Excluir uma tarefa |

A URL da API é configurada por variável de ambiente:

```env
VITE_API_URL=https://api-lista-de-tarefas-zjn5.onrender.com

```

## Como Executar localmente: 

### Pré-requisitos
- Node.js;
- npm;
- Git;

### Instalação

Clone o repositório:
```
git clone https://github.com/RafaDavila/API-Lista-de-Tarefas-FrontEnd.git
```
Entre na pasta: 
```
cd API-Lista-de-Tarefas-FrontEnd
```
Instale as depedências: 
```
npm install
```
Crie o arquivo .env com base no .env.example:
```
VITE_API_URL=https://api-lista-de-tarefas-zjn5.onrender.com
```

Inicie o servidor de desenvolvimento:
```
npm run dev
```
A aplicação ficará disponível normalmente em:
```
http://localhost:5173
```
## Build de produção

Para gerar a versão otimizada:
```
npm run build
```
Os arquivos serão criados na pasta:
```
dist/
```
Para testar a build localmente:
```
npm run preview
```
## Estrutura principal
```
src/
├── pages/
│   ├── Home.tsx
│   └── Tasks.tsx
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## Observação

Atualmente, a aplicação utiliza uma lista pública e compartilhada.

Como ainda não existe autenticação, todos os visitantes acessam as mesmas tarefas e podem criar, atualizar ou excluir itens.

Uma futura evolução do projeto será adicionar autenticação com JWT e associar cada tarefa ao seu respectivo usuário.

## Próximas melhorias:
- Autenticação de usuários com JWT
- Tarefas individuais por usuário
- Edição de título e descrição
- Filtros por tarefas pendentes e concluídas
- Testes automatizados do front-end
- Paginação da lista
- Melhorias de acessibilidade

## Autor
Desenvolvido por Rafael Davila.
GitHub: https://github.com/RafaDavila

