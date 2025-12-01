// __tests__/TaskListViewModel.test.js

import { renderHook, act } from '@testing-library/react-hooks';
import { useTaskListViewModel } from '../src/viewmodels/TaskListViewModel';
import { createTask } from '../src/models/Task';

// Mock do TaskRepositoryProtocol
const mockRepository = {
  getTasks: jest.fn(),
  addTask: jest.fn(),
  deleteTask: jest.fn(),
  toggleTaskCompletion: jest.fn(),
  getTaskById: jest.fn(),
};

// 1. Configuração de Tarefas Mock
const MOCK_TASK_1 = createTask('Tarefa MVP', 'Implementar as telas principais.', false);
const MOCK_TASK_2 = createTask('Testar MVVM', 'Criar mocks e testes unitários.', true);

describe('TaskListViewModel - Testes Unitários de Lógica de Negócio (CRUD)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Configuração padrão dos mocks
    mockRepository.getTasks.mockResolvedValue([MOCK_TASK_1, MOCK_TASK_2]);
    mockRepository.addTask.mockResolvedValue(undefined);
    mockRepository.deleteTask.mockResolvedValue(undefined);
    mockRepository.toggleTaskCompletion.mockResolvedValue(undefined);
    mockRepository.getTaskById.mockImplementation((id) => {
      return [MOCK_TASK_1, MOCK_TASK_2].find(task => task.id === id);
    });
  });

  // Teste 1: Inicialização e Carregamento (Read)
  it('should load initial tasks and set loading state correctly', async () => {
    const { result } = renderHook(() => 
      useTaskListViewModel(mockRepository)
    );

    // O estado inicial deve mostrar que está carregando
    expect(result.current.isLoading).toBe(true);

    // Aguarda o carregamento assíncrono
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // O estado final deve ter as tarefas carregadas
    expect(result.current.isLoading).toBe(false);
    expect(result.current.tasks).toHaveLength(2);
    expect(result.current.tasks[0].title).toBe('Tarefa MVP');
    expect(mockRepository.getTasks).toHaveBeenCalledTimes(1);
  });

  // Teste 2: Adicionar Tarefa (Create)
  it('should add a new task and update the list (addTask)', async () => {
    const { result } = renderHook(() => 
      useTaskListViewModel(mockRepository)
    );

    // Aguarda o carregamento inicial
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const initialCount = result.current.tasks.length;
    
    await act(async () => {
      await result.current.addTask('Tarefa Nova', 'Detalhes da nova tarefa.');
    });

    // Verifica se as funções foram chamadas corretamente
    expect(mockRepository.addTask).toHaveBeenCalledWith({
      title: 'Tarefa Nova',
      description: 'Detalhes da nova tarefa.'
    });
    // O loadTasks deve ser chamado após addTask
    expect(mockRepository.getTasks).toHaveBeenCalledTimes(2);
  });

  // Teste 3: Excluir Tarefa (Delete)
  it('should remove an existing task (deleteTask)', async () => {
    const { result } = renderHook(() => 
      useTaskListViewModel(mockRepository)
    );

    // Aguarda o carregamento inicial
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const idToDelete = MOCK_TASK_1.id;
    
    await act(async () => {
      await result.current.deleteTask(idToDelete);
    });

    expect(mockRepository.deleteTask).toHaveBeenCalledWith(idToDelete);
    expect(mockRepository.getTasks).toHaveBeenCalledTimes(2);
  });

  // Teste 4: Alternar Status (Update)
  it('should toggle the completion status of a task (toggleCompletion)', async () => {
    const { result } = renderHook(() => 
      useTaskListViewModel(mockRepository)
    );

    // Aguarda o carregamento inicial
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const idToToggle = MOCK_TASK_1.id;
    
    await act(async () => {
      await result.current.toggleCompletion(idToToggle);
    });
    
    expect(mockRepository.toggleTaskCompletion).toHaveBeenCalledWith(idToToggle);
    expect(mockRepository.toggleTaskCompletion).toHaveBeenCalledTimes(1);
  });
  
  // Teste 5: Obter Detalhes (Read by ID)
  it('should retrieve task details by ID (getTaskDetails)', async () => {
    const { result } = renderHook(() => 
      useTaskListViewModel(mockRepository)
    );

    // Aguarda o carregamento inicial
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const details = result.current.getTaskDetails(MOCK_TASK_2.id);

    expect(details).toBeDefined();
    expect(details.title).toBe('Testar MVVM');
    expect(details.completed).toBe(true);
    expect(mockRepository.getTaskById).toHaveBeenCalledWith(MOCK_TASK_2.id);
  });

  // Teste 6: Tratamento de Erros
  it('should handle errors when repository fails', async () => {
    // Mock com erro
    mockRepository.getTasks.mockRejectedValue(new Error('Erro de teste'));

    const { result } = renderHook(() => 
      useTaskListViewModel(mockRepository)
    );

    // Aguarda o carregamento (que vai falhar)
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Verifica se o erro foi capturado
    expect(result.current.error).toBe('Erro ao carregar a lista de tarefas.');
    expect(result.current.isLoading).toBe(false);
  });
});