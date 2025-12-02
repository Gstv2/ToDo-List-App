// src/views/ListScreen.tsx

import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Task } from '../models/Task';

interface ListScreenProps {
  tasks: Task[];
  toggleCompletion: (id: string) => void;
}

export default function ListScreen({ tasks, toggleCompletion }: ListScreenProps) {
  const navigation = useNavigation();
  
  const renderItem = ({ item }: { item: Task }) => {
    // O valor de item.completed está sendo usado corretamente aqui (booleano)
    
    // Retorna o elemento JSX para cada item da FlatList
    return (
      // Contêiner principal da tarefa. Permite navegação ao tocar em qualquer lugar.
      <TouchableOpacity
        style={[styles.taskItem, item.completed && styles.completedTask]}
        onPress={() => navigation.navigate('TaskDetailsScreen', { taskId: item.id })} // Passa ID para navegação
      >
        
        {/* 1. Checkbox/Botão de Conclusão */}
        <TouchableOpacity 
          style={[styles.checkbox, item.completed && styles.checkedCheckbox]}
          onPress={() => toggleCompletion(item.id)} // Chama a função do ViewModel
          activeOpacity={0.7}
        >
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>

        {/* 2. Conteúdo da Tarefa */}
        <View style={styles.textContainer}>
          <Text style={[styles.taskTitle, item.completed && styles.completedText]}>{item.title}</Text>
          <Text style={[styles.taskDescription, item.completed && styles.completedText]} numberOfLines={1}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  // Retorno do componente ListScreen principal
  return (
    <View style={styles.container}>
      <Text style={styles.header}>TO-DO LIST</Text>
      
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma tarefa cadastrada</Text>
        }
      />

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateTaskScreen')}
      >
        <Text style={styles.buttonText}>CREATE</Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
    borderRadius: 5,
  },
  completedTask: {
    backgroundColor: '#e6ffe6', // Fundo mais claro para tarefa concluída
    opacity: 0.8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  checkedCheckbox: {
    backgroundColor: '#4CAF50', // Cor de fundo quando marcado
    borderColor: '#4CAF50',
  },
  checkmark: {
    fontSize: 18,
    color: '#fff', // Cor do checkmark branco
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
  createButton: {
    backgroundColor: '#ddd',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});