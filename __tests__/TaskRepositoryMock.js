// __tests__/TaskRepositoryMock.js

import { createTask } from '../src/models/Task';

export class TaskRepositoryMock {
    constructor(initialTasks = []) {
        this.tasks = [...initialTasks];
    }

    async getTasks() {
        return this.tasks;
    }

    async addTask(task) {
        const newTask = {
            ...task,
            id: Date.now().toString(),
            completed: false
        };
        this.tasks.push(newTask);
        return newTask;
    }

    async deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    async toggleTaskCompletion(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
        }
        return task;
    }

    getTaskById(id) {
        return this.tasks.find(task => task.id === id);
    }
}

// Teste para o mock
describe('TaskRepositoryMock', () => {
    it('should initialize with tasks', () => {
        const task = createTask('Test', 'Description', false);
        const mock = new TaskRepositoryMock([task]);
        expect(mock.tasks).toHaveLength(1);
    });
});