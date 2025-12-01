// src/services/TaskRepositoryProtocol.ts

import { Task } from '../models/Task';

// O ViewModel depende DESTA interface.
export interface TaskRepositoryProtocol {
    getTasks(): Task[];
    addTask(task: Omit<Task, 'id' | 'completed'>): Task; // Recebe dados brutos da UI
    deleteTask(id: string): boolean;
    toggleTaskCompletion(id: string): boolean;
    getTaskById(id: string): Task | undefined;
}