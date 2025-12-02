import { act } from 'react-test-renderer';
import { useTaskListViewModel } from '../src/viewmodels/TaskListViewModel';
import { createTask } from '../src/models/Task';
import { TaskRepositoryMock } from './TaskRepositoryMock'; // Importa a classe mock real

// MOCK de renderHook: Mantido
const renderHook = (callback) => {
    let result = {};
    let error;

    function TestComponent() {
        try {
            result.current = callback();
        } catch (e) {
            error = e;
        }
        return null;
    }

    act(() => {
        require('react-test-renderer').create(<TestComponent />);
    });

    return { result, error };
};

// 1. Configuração de Tarefas Mock
const MOCK_TASK_1 = createTask('Tarefa MVP', 'Implementar as telas principais.', false);
const MOCK_TASK_2 = createTask('Testar MVVM', 'Criar mocks e testes unitários.', true);

// Declaração da variável que irá armazenar a instância real do repositório mock
let mockRepositoryInstance: TaskRepositoryMock;

describe('TaskListViewModel - Testes Unitários de Lógica de Negócio (CRUD)', () => {
    // Para suprimir o console.error no Teste 6
    let consoleErrorSpy: jest.SpyInstance;

    beforeAll(() => {
        // Espiona e suprime console.error ANTES de todos os testes
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        // Restaura console.error APÓS todos os testes
        consoleErrorSpy.mockRestore();
    });

    beforeEach(() => {
        // 🚨 NOVO: Inicializa uma nova instância da TaskRepositoryMock
        // com o estado inicial para CADA teste, permitindo que ele mantenha o estado.
        mockRepositoryInstance = new TaskRepositoryMock([
            { ...MOCK_TASK_1 }, 
            { ...MOCK_TASK_2 }
        ]);
        jest.clearAllMocks(); // Limpa Mocks APENAS (se houver algum)
    });

    // Teste 1: Inicialização e Carregamento (Read)
    it('should load initial tasks and set loading state correctly', async () => {
        // 🚨 NOVO: Passa a instância real
        const { result } = renderHook(() => 
            useTaskListViewModel(mockRepositoryInstance)
        );

        expect(result.current.isLoading).toBe(true);

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.tasks).toHaveLength(2);
        expect(result.current.tasks[0].title).toBe('Tarefa MVP');
        // Não precisamos verificar o "toHaveBeenCalledTimes" no mockRepositoryInstance, 
        // pois estamos testando o comportamento do hook com a dependência real.
    });

    // Teste 2: Adicionar Tarefa (Create)
    it('should add a new task and update the list (addTask)', async () => {
        const { result } = renderHook(() => 
            useTaskListViewModel(mockRepositoryInstance)
        );

        // Aguarda o carregamento inicial (2 tarefas)
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });
        expect(result.current.tasks).toHaveLength(2);
        
        const title = 'Tarefa Nova';
        const description = 'Detalhes da nova tarefa.';

        await act(async () => {
            await result.current.addTask(title, description);
        });

        // 🚨 NOVO: Verifica se a lista foi ATUALIZADA no ViewModel
        expect(result.current.tasks).toHaveLength(3);
        const newTask = result.current.tasks.find(t => t.title === title);
        expect(newTask).toBeDefined();
        expect(newTask.description).toBe(description);
        // O teste é muito mais robusto agora.
    });

    // Teste 3: Excluir Tarefa (Delete)
    it('should remove an existing task (deleteTask)', async () => {
        const { result } = renderHook(() => 
            useTaskListViewModel(mockRepositoryInstance)
        );

        // Aguarda o carregamento inicial (2 tarefas)
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });
        expect(result.current.tasks).toHaveLength(2);

        const idToDelete = MOCK_TASK_1.id;
        
        await act(async () => {
            await result.current.deleteTask(idToDelete);
        });

        // 🚨 NOVO: Verifica se a lista foi ATUALIZADA no ViewModel
        expect(result.current.tasks).toHaveLength(1);
        expect(result.current.tasks.some(t => t.id === idToDelete)).toBe(false);
    });

    // Teste 4: Alternar Status (Update)
    it('should toggle the completion status of a task (toggleCompletion)', async () => {
        const { result } = renderHook(() => 
            useTaskListViewModel(mockRepositoryInstance)
        );

        // Aguarda o carregamento inicial
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        const taskToToggle = result.current.tasks.find(t => t.id === MOCK_TASK_1.id);
        const initialCompleted = taskToToggle.completed; // false

        await act(async () => {
            await result.current.toggleCompletion(MOCK_TASK_1.id);
        });
        
        // Verifica se o status foi invertido
        const updatedTask = result.current.tasks.find(t => t.id === MOCK_TASK_1.id);
        expect(updatedTask.completed).toBe(!initialCompleted); // true
    });
    
    // Teste 5: Obter Detalhes (Read by ID)
    it('should retrieve task details by ID (getTaskDetails)', async () => {
        const { result } = renderHook(() => 
            useTaskListViewModel(mockRepositoryInstance)
        );

        // Aguarda o carregamento inicial
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        const details = result.current.getTaskDetails(MOCK_TASK_2.id);

        expect(details).toBeDefined();
        expect(details.title).toBe('Testar MVVM');
        expect(details.completed).toBe(true);
        // Não é necessário verificar mockRepository.getTaskById, pois ele é uma função síncrona 
        // implementada no hook para buscar do estado LOCAL, e não do repositório.
        // O ViewModel deve chamar this.tasks.find() internamente, não o mockRepository.
    });

    // Teste 6: Tratamento de Erros
    it('should handle errors when repository fails (loadTasks)', async () => {
        // 🚨 NOVO: Criamos um mock APENAS para o getTasks deste teste, 
        // simulando a falha de rede/repositório.
        mockRepositoryInstance.getTasks = jest.fn().mockRejectedValue(new Error('Erro de teste'));

        const { result } = renderHook(() => 
            useTaskListViewModel(mockRepositoryInstance)
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