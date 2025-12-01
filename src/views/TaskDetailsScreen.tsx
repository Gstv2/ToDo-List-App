// src/views/TaskDetailsScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Task } from '../models/Task';

// Define a tipagem para os parâmetros de rota esperados
type TaskDetailsRouteParams = {
  taskId: string;
};

interface TaskDetailsScreenProps {
  deleteTask: (id: string) => void;
  getTaskDetails: (id: string) => Task | undefined;
}

export default function TaskDetailsScreen({ deleteTask, getTaskDetails }: TaskDetailsScreenProps) {
  const navigation = useNavigation();
  // Obtém o taskId diretamente dos parâmetros de rota
  const route = useRoute<RouteProp<{ Details: TaskDetailsRouteParams }, 'Details'>>();
  const taskId = route.params?.taskId;
  
  const [task, setTask] = useState<Task | undefined>(undefined);

  // Usa useEffect para buscar os detalhes da tarefa via ViewModel
  useEffect(() => {
    if (taskId) {
        setTask(getTaskDetails(taskId));
    }
  }, [taskId, getTaskDetails]);

  const handleDelete = () => {
    if (!task) return;

    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir a tarefa "${task.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => {
            // Chama a função do ViewModel (deleteTask)
            deleteTask(task.id);
            navigation.goBack();
          }
        },
      ]
    );
  };

  if (!task) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Tarefa não encontrada.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>BACK</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TASK DETAILS</Text>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Status:</Text>
        <Text style={[styles.statusText, task.completed ? styles.statusCompleted : styles.statusPending]}>
            {task.completed ? 'CONCLUÍDA' : 'PENDENTE'}
        </Text>

        <Text style={styles.label}>Título:</Text>
        <Text style={styles.title}>{task.title}</Text>
        
        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.description}>{task.description || 'Sem descrição'}</Text>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>EXCLUIR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>BACK</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  detailsContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#333',
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 8,
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 10,
  },
  statusCompleted: {
    backgroundColor: '#e6ffe6',
    color: 'green',
  },
  statusPending: {
    backgroundColor: '#ffeee6',
    color: '#ff4444',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderLeftWidth: 3,
    borderLeftColor: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    lineHeight: 22,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#ddd',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#ff4444',
    marginBottom: 20,
  }
});