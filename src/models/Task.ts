// src/models/Task.ts

export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

const generateUniqueId = (): string => Math.random().toString(36).substring(2, 9) + Date.now().toString(36);

export const createTask = (title: string, description: string, completed: boolean = false): Task => ({
    id: generateUniqueId(),
    title,
    description,
    completed,
});