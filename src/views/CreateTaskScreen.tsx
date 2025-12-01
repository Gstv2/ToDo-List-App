// src/views/CreateTaskScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface CreateTaskScreenProps {
  addTask: (title: string, description: string) => void;
}

export default function CreateTaskScreen({ addTask }: CreateTaskScreenProps) {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateTask = () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'Por favor, insira um título para a tarefa');
      return;
    }

    // Chama a função do ViewModel (addTask)
    addTask(title.trim(), description.trim());

    setTitle('');
    setDescription('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CREATE TASK</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        returnKeyType="next"
      />
      
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        multiline
        textAlignVertical="top"
      />

      <TouchableOpacity 
        style={[styles.createButton, !title.trim() && styles.disabledButton]} 
        onPress={handleCreateTask}
        disabled={!title.trim()}
      >
        <Text style={styles.buttonText}>ADD</Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  createButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#a5d6a7',
    opacity: 0.7,
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
});