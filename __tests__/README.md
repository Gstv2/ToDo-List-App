## Testes unitários — ToDo-List-App

Este documento descreve a estrutura e o funcionamento dos testes unitários do projeto `ToDo-List-App`.

### Visão geral

O projeto segue o padrão MVVM. Os testes estão focados no `ViewModel` que gerencia o estado e a lógica de negócio (CRUD) das tarefas. Para isolar a camada de persistência usamos um mock de repositório (`TaskRepositoryMock`).

Pasta dos testes: `__tests__/`.

#### Arquivos principais de teste
- `TaskListViewModel.test.tsx` — testes do ViewModel (cenários de leitura, criação, atualização, exclusão, tratamento de erros).
- `TaskRepositoryMock.ts` — implementação mock do repositório usada nos testes para isolar dependências.

### Como executar

Executar todos os testes com:

```powershell
npm test
```

Executar em modo watch:

```powershell
jest --watch
```

### Ferramentas utilizadas

- `jest` — framework de testes.
- `react-test-renderer` / utilities — para simular montagem e hooks quando necessário.
- `renderHook` (mockado) — para testar o hook `useTaskListViewModel` e acessar `result.current`.
- `act` — garante processamento correto de atualizações de estado assíncronas antes das asserções.

### Cenários de teste (resumo)

1. **Inicialização e carregamento (Read)**
    - Objetivo: verificar que o `ViewModel` carrega o estado inicial.
    - Passos: renderizar o hook; confirmar `isLoading` true inicialmente; aguardar resolução assíncrona; confirmar `isLoading` false e lista preenchida.

2. **Adicionar tarefa (Create)**
    - Objetivo: garantir que uma tarefa recém-criada seja persistida e refletida no estado.
    - Verificação: após `addTask`, `result.current.tasks` deve crescer (ex.: de 2 para 3 elementos).

3. **Excluir tarefa (Delete)**
    - Objetivo: garantir remoção correta do estado.
    - Verificação: após `deleteTask(id)`, a lista deve reduzir o tamanho esperado.

4. **Alternar status (Update)**
    - Objetivo: verificar que o campo `completed` é invertido corretamente.
    - Verificação: o atributo `completed` da tarefa alvo é invertido após `toggleCompletion`.

5. **Obter detalhes (Read by ID)**
    - Objetivo: checar a função síncrona que busca detalhes no estado atual do `ViewModel`.
    - Verificação: objeto retornado corresponde à tarefa esperada.

6. **Tratamento de erros**
    - Objetivo: validar comportamento quando operações assíncronas falham (ex.: falha em `getTasks`).
    - Abordagem: simular rejeição com `jest.fn().mockRejectedValue(...)` e suprimir logs temporariamente com `jest.spyOn(console, 'error')`.
    - Verificações: `isLoading` deve ficar `false` e `result.current.error` deve conter uma mensagem amigável (por exemplo, `"Erro ao carregar a lista de tarefas."`).

### TaskRepositoryMock (sanidade)

O `TaskRepositoryMock` simula a camada de persistência e inicializa seu array interno de tarefas a partir do construtor. Um teste de sanidade simples garante que a instância criada contém as tarefas esperadas, o que permite que os testes do `ViewModel` executem em um ambiente previsível.

---

Se quiser, posso também mesclar este conteúdo ao `README.md` principal do projeto (`/README.md`) para centralizar a documentação. Deseja que eu faça isso agora?
