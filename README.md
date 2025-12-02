# ToDo List — Atividade Prática

Aplicativo móvel simples de Lista de Tarefas (ToDo List) desenvolvido com React Native e Expo. O foco é aplicar padrões de arquitetura (MVVM), Inversão de Dependências (DI) e testes automatizados.

## Integrantes

- **Luís Gustavo Nery Silva** — 2024116TADS0016
- **Renan Jucá da Silva** — 2024116TADS0028
- **Arthur Sousa Santana** — 2024116TADS0044
- **Nícolas Moraes Viana** — 2024116TADS0042
- **Nathália Moraes Viana** — 2024116TADS0043

## Descrição do projeto

O app possui três telas principais:

- **ListScreen (To-Do List):** exibe todas as tarefas e permite navegar para criação e detalhes.
- **CreateTaskScreen (Criar Tarefa):** formulário para adicionar uma nova tarefa.
- **TaskDetailsScreen (Detalhes):** exibe detalhes da tarefa e permite excluí-la.

A lógica de negócio (CRUD, validações, etc.) está isolada em um ViewModel (hook customizado), garantindo fácil manutenção e testabilidade.

## Arquitetura e padrões

- **MVVM (Model-View-ViewModel)**
  - `src/models` — entidades (ex.: `Task.ts`).
  - `src/views` — componentes (UI).
  - `src/viewmodels` — hooks com lógica e estado.

- **Inversão de Dependências (DI)**
  - `src/services/TaskRepositoryProtocol.ts` — contrato/abstração.
  - `src/services/InMemoryTaskRepository.ts` — implementação em memória.

## Estrutura do projeto (resumo)

```
ToDo-List-App
├── src/ # Código-fonte principal
│   ├── models/ # Camada Model: Definição de Entidades
│   │   └── Task.ts # Interface 'Task' e lógica de criação de IDs.
|   |
│   ├── services/ # Camada Service/Repositório: Persistência (CRUD)
│   │   ├── TaskRepositoryProtocol.ts # A Abstração (Interface) do Repositório.
│   │   └── InMemoryTaskRepository.ts # Repositório que armazena dados em memória.
|   |
│   ├── viewmodels/ # Camada ViewModel: Lógica e Estado
│   │   └── TaskListViewModel.ts # Custom hook que gerencia o estado e as operações CRUD.
|   |
│   ├── views/ # Camada View: Interface do Usuário (UI)
│   │   ├── CreateTaskScreen.tsx # Tela para criação de novas tarefas.
│   │   ├── ListScreens.tsx # Tela principal com a lista de tarefas.
│   │   └── TaskDetailsScreen.tsx # Tela de detalhes e exclusão de tarefas.
|   |
│   └── navigation/ # Gerenciamento de Rotas
│       └── AppNavigation.tsx # Configura o Navigator e injeta as props do ViewModel nas Views.
|
├── __tests__/ # Testes Automatizados (Jest)
|       └──TaskListViewModel.test.tsx # Testes da lógica do ViewModel (estado e falhas).
|       └──TaskRepositoryMock.ts # Mock do repositório para isolar os testes.
|   
├── index.ts # Inicialização do app.
├── App.tsx # ⚙️ Ponto de Injeção de Dependência (DI) e setup inicial.
├── package.json # Dependências e scripts de execução.
└── tsconfig.json # Configurações do TypeScript.
```

## Como rodar (desenvolvimento)

1. Instale dependências:

```powershell
npm install
```

2. Inicie o servidor do Expo:

```powershell
npx expo start
```

3. Abra no dispositivo com o app Expo Go ou emulador.

## Testes

Os testes unitários estão na pasta `__tests__/`. Eles isolam o `ViewModel` usando um mock de repositório (`TaskRepositoryMock`).

Executar todos os testes:

```powershell
npm test
```

### Resumo dos cenários de teste

- Inicialização e carregamento: verifica carregamento inicial e indicadores (`isLoading`).
- Criação: valida que `addTask` persiste e atualiza a lista.
- Exclusão: valida que `deleteTask` remove corretamente a tarefa.
- Atualização: verifica `toggleCompletion` (campo `completed`).
- Obtenção de detalhes: função que busca tarefa por ID no estado do `ViewModel`.
- Tratamento de erros: simula rejeições (ex.: `getTasks`) e valida estados de erro e loading.

### Ferramentas usadas nos testes

- `jest` — framework de testes.
- `react-test-renderer` / utilities — para simular hooks/comportamento de componentes.

---
