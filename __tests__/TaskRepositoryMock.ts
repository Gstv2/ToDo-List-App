// __tests__/TaskRepositoryMock.ts

import { createTask } from '../src/models/Task';

export class TaskRepositoryMock {
    tasks: any[]; // Use 'any' ou a interface Task (TaskProtocol) se estiver definida

    constructor(initialTasks = []) {
        this.tasks = [...initialTasks];
    }

    // 🚨 CORRIGIDO: Tornando getTasks assíncrono explicitamente
    async getTasks() {
        return Promise.resolve(this.tasks);
    }

    // 🚨 CORRIGIDO: Tornando addTask assíncrono explicitamente
    async addTask(task: { title: string, description: string }) {
        const newTask = {
            ...task,
            // Simulação de criação de ID, como no seu código original
            id: Date.now().toString() + Math.random().toString(36).substring(2, 9), 
            completed: false
        };
        this.tasks.push(newTask);
        return Promise.resolve(newTask);
    }

    // 🚨 CORRIGIDO: Tornando deleteTask assíncrono explicitamente
    async deleteTask(id: string) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        return Promise.resolve(undefined);
    }

    // 🚨 CORRIGIDO: Tornando toggleTaskCompletion assíncrono explicitamente
    async toggleTaskCompletion(id: string) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
        }
        return Promise.resolve(task);
    }

    // 🚨 CORRIGIDO: Tornando getTaskById assíncrono explicitamente (se necessário, 
    // mas se o ViewModel busca do estado local após o load, pode ser síncrono.
    // Manterei síncrono para corresponder à sua lógica original no ViewModel.)
    getTaskById(id: string) {
        return this.tasks.find(task => task.id === id);
    }
}

// Teste para o mock (mantido)
describe('TaskRepositoryMock', () => {
    it('should initialize with tasks', () => {
        const task = createTask('Test', 'Description', false);
        const mock = new TaskRepositoryMock([task]);
        expect(mock.tasks).toHaveLength(1);
    });
});