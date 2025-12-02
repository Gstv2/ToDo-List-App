// src/services/InMemoryTaskRepository.ts (CORRIGIDO)

import { createTask, Task } from '../models/Task'; // NÃO importe createTask aqui
import { TaskRepositoryProtocol } from './TaskRepositoryProtocol';

// Função auxiliar simples para ID (OPCIONAL: apenas se quiser evitar a importação)
const generateId = () => Math.random().toString(36).substring(2, 9);

// ESTADO INICIAL EM MEMÓRIA (Corrigido para usar objetos literais e IDs simples)
let taskStore: Task[] = [
    {
        id: generateId(),
        title: 'Configurar MVVM',
        description: 'Criar a estrutura de pastas e a injeção de dependências.',
        completed: true // VALOR BOLEANO PURO
    },
    {
        id: generateId(),
        title: 'Implementar Testes',
        description: 'Escrever testes unitários para o ViewModel.',
        completed: false // VALOR BOLEANO PURO
    },
];

// O estado interno do repositório
export class InMemoryTaskRepository implements TaskRepositoryProtocol {
    // 🚨 CORRIGIDO: Retornando Promise.resolve()
    getTasks(): Promise<Task[]> {
        return Promise.resolve([...taskStore]);
    }

    // 🚨 CORRIGIDO: Retornando Promise.resolve()
    addTask(data: Omit<Task, 'id' | 'completed'>): Promise<Task> {
        const newTask = createTask(data.title, data.description, false);
        taskStore.push(newTask);
        return Promise.resolve(newTask);
    }

    // 🚨 CORRIGIDO: Retornando Promise.resolve()
    deleteTask(id: string): Promise<boolean> {
        const initialLength = taskStore.length;
        taskStore = taskStore.filter(task => task.id !== id);
        return Promise.resolve(taskStore.length < initialLength);
    }
    
    // Mantido síncrono, pois é uma busca direta sem impacto na Promise.
    getTaskById(id: string): Task | undefined {
        return taskStore.find(task => task.id === id);
    }

    // 🚨 CORRIGIDO: Retornando Promise.resolve()
    toggleTaskCompletion(id: string): Promise<boolean> {
        const index = taskStore.findIndex(task => task.id === id);
        if (index > -1) {
            const updatedTask = { 
                ...taskStore[index], 
                completed: !taskStore[index].completed 
            };
            taskStore = [
                ...taskStore.slice(0, index), 
                updatedTask, 
                ...taskStore.slice(index + 1)
            ];
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
}