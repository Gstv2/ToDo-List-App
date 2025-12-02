# ToDo List — Atividade Prática

Aplicativo móvel simples de Lista de Tarefas (ToDo List) desenvolvido com React Native e Expo. O foco é aplicar padrões de arquitetura (MVVM), Inversão de Dependências (DI) e testes automatizados.

## Integrantes

- **Aluno1:** Luís Gustavo Nery Silva - 2024116TADS0016
- **Aluno2:** Renan Jucá da Silva     - 2024116TADS0028
- **Aluno3:** Arthur Sousa Santana    - 2024116TADS0044
- **Aluno4:** Nícolas Moraes Viana    - 2024116TADS0042
- **Aluno5:** Nathália Moraes Viana   - 2024116TADS0043


## Descrição do Projeto

O app possui três telas principais:

- **ListScreen (To-Do List):** Exibe todas as tarefas e permite navegar para criação e detalhes.
- **CreateTaskScreen (Criar Tarefa):** Formulário para adicionar uma nova tarefa.
- **TaskDetailsScreen (Detalhes):** Exibe detalhes da tarefa e permite excluí-la.

A lógica de negócio (CRUD, validações, etc.) está isolada em um ViewModel (hook customizado), garantindo fácil manutenção e testabilidade.

## Arquitetura e Padrões

- **MVVM (Model-View-ViewModel):**
	- `src/models` — entidades (ex.: `Task.ts`).
	- `src/views` — componentes React Native (UI puro).
	- `src/viewmodels` — hooks que contêm a lógica e estado.

- **Inversão de Dependências (DI):**
	- `src/services/TaskRepositoryProtocol.ts` — contrato/abstração.
	- `src/services/InMemoryTaskRepository.ts` — implementação em memória.
	- O ViewModel depende do protocolo, permitindo trocar a implementação facilmente (ex.: mocks em testes, AsyncStorage, Firestore).

- **Testes Automatizados:**
	- Os testes unitários estão em `__tests__/` e usam um mock de repositório para isolar o ViewModel.

## Estrutura do Projeto (resumo)

```
ToDo-List
├── src/
│   ├── models/           # Estruturas de Dados (Models/Entities)
│   │   └── Task.ts           # Define a interface de dados da tarefa
│   │
│   ├── services/         # Camada de Dados (DI - Abstração e Implementação)
│   │   ├── TaskRepositoryProtocol.ts # A interface (o Contrato)
│   │   └── InMemoryTaskRepository.ts # A implementação (o Serviço real)
│   │
│   ├── viewmodels/       # Camada de Lógica (Business Logic)
│   │   └── TaskListViewModel.ts  # Lógica de CRUD e estado das tarefas
│   │
│   ├── views/            # Camada de Interface (Telas/Componentes)
│   │   ├── TaskListScreen.tsx
│   │   ├── CreateTaskScreen.tsx
│   │   └── TaskDetailScreen.tsx
│   │
│   └── navigation/       # Configuração de Navegação
│       └── AppNavigator.tsx
│
├── __tests__/           # Pasta para Testes Automatizados
│   └── TaskListViewModel.test.js # Testes unitários do ViewModel
|   └── TaskRepositoryMock.js
│
├── .gitignore
├── index.ts            
├── package.json
├── README.md                      # Documentação obrigatória
└── tsconfig.json           
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

## Executar testes

```powershell
npm test
```