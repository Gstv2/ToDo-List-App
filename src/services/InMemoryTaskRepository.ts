// src/services/InMemoryTaskRepository.ts

import { Task, createTask } from '../models/Task';
import { TaskRepositoryProtocol } from './TaskRepositoryProtocol';

// Estado inicial em memória
let taskStore: Task[] = [
    createTask('Configurar MVVM', 'Criar a estrutura de pastas e a injeção de dependências.', true),
    createTask('Implementar Testes', 'Escrever testes unitários para o ViewModel.', false),
];

// O estado interno do repositório
export class InMemoryTaskRepository implements TaskRepositoryProtocol {

    // Função para obter todas as tarefas (sempre retorna uma cópia para segurança)
    getTasks(): Task[] {
        return [...taskStore];
    }

    // Função para adicionar uma nova tarefa
    addTask(data: Omit<Task, 'id' | 'completed'>): Task {
        const newTask = createTask(data.title, data.description, false); // Nova tarefa é sempre não concluída
        taskStore.push(newTask);
        return newTask;
    }

    // Função para deletar uma tarefa
    deleteTask(id: string): boolean {
        const initialLength = taskStore.length;
        taskStore = taskStore.filter(task => task.id !== id);
        return taskStore.length < initialLength;
    }
    
    // Função para buscar por ID
    getTaskById(id: string): Task | undefined {
        return taskStore.find(task => task.id === id);
    }

    // Função para alternar o status de conclusão
    toggleTaskCompletion(id: string): boolean {
        const index = taskStore.findIndex(task => task.id === id);
        if (index > -1) {
            // Cria um novo objeto para garantir a imutabilidade do estado
            const updatedTask = { 
                ...taskStore[index], 
                completed: !taskStore[index].completed 
            };
            taskStore = [
                ...taskStore.slice(0, index), 
                updatedTask, 
                ...taskStore.slice(index + 1)
            ];
            return true;
        }
        return false;
    }
}