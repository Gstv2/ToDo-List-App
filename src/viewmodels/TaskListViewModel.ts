// src/viewmodels/TaskListViewModel.ts

import { useState, useEffect, useCallback } from 'react';
import { Task } from '../models/Task';
import { TaskRepositoryProtocol } from '../services/TaskRepositoryProtocol';

export const useTaskListViewModel = (taskRepository: TaskRepositoryProtocol) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Função central para carregar dados
    const loadTasks = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedTasks = await taskRepository.getTasks();
            setTasks(fetchedTasks);
        } catch (err) {
            setError('Erro ao carregar a lista de tarefas.');
            console.error('Erro ao carregar tarefas:', err);
        } finally {
            setIsLoading(false);
        }
    }, [taskRepository]);

    // Carrega dados na inicialização
    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    // Adiciona uma nova tarefa
    const addTask = useCallback(async (title: string, description: string) => {
        setError(null);
        try {
            await taskRepository.addTask({ title, description });
            await loadTasks(); // Recarrega a lista
        } catch (err) {
            setError('Falha ao criar tarefa.');
            throw err;
        }
    }, [taskRepository, loadTasks]);

    // Deleta uma tarefa
    const deleteTask = useCallback(async (id: string) => {
        setError(null);
        try {
            await taskRepository.deleteTask(id);
            await loadTasks(); // Recarrega a lista
        } catch (err) {
            setError('Falha ao excluir tarefa.');
            throw err;
        }
    }, [taskRepository, loadTasks]);

    // Alterna o status
    const toggleCompletion = useCallback(async (id: string) => {
        setError(null);
        try {
            await taskRepository.toggleTaskCompletion(id);
            await loadTasks(); // Recarrega a lista
        } catch (err) {
            setError('Falha ao atualizar status.');
            throw err;
        }
    }, [taskRepository, loadTasks]);

    // Busca detalhes da tarefa
    const getTaskDetails = useCallback((id: string): Task | undefined => {
        try {
            return taskRepository.getTaskById(id);
        } catch (err) {
            setError('Falha ao buscar detalhes da tarefa.');
            throw err;
        }
    }, [taskRepository]);

    return {
        tasks,
        isLoading,
        error,
        addTask,
        deleteTask,
        toggleCompletion,
        getTaskDetails,
        loadTasks,
    };
};