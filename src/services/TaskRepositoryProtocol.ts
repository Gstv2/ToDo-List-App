// src/services/TaskRepositoryProtocol.ts

import { Task } from '../models/Task';

export interface TaskRepositoryProtocol {
    getTasks(): Promise<Task[]>;
    addTask(task: Omit<Task, 'id' | 'completed'>): Promise<Task>; 
    deleteTask(id: string): Promise<boolean>;
    toggleTaskCompletion(id: string): Promise<boolean>;
    getTaskById(id: string): Task | undefined; 
}