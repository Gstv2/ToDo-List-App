// App.tsx (COM LOGS)
console.log('Iniciando App.tsx');
import React from 'react'; // Importamos useEffect
import { NavigationContainer } from '@react-navigation/native';
 // Log para indicar o início do App.tsx
// 1. SERVICES & VIEWMODEL IMPORTS (Camada de Lógica)
import { useTaskListViewModel } from './src/viewmodels/TaskListViewModel';
import { InMemoryTaskRepository } from './src/services/InMemoryTaskRepository';

// 2. NAVIGATION IMPORT (Configuração da Navegação)
import AppNavigator from './src/navigation/AppNavigation'; 

console.log('App.tsx carregado'); // Log para indicar que o App.tsx foi carregado
// 3. INJEÇÃO DE DEPENDÊNCIAS CENTRALIZADA
const taskRepository = new InMemoryTaskRepository();

export default function App() {
  // Inicializa o ViewModel, injetando a dependência CONCRETA
  console.log('Inicializando ViewModel com InMemoryTaskRepository');
  const viewModel = useTaskListViewModel(taskRepository);
  
  // Extrai as funções e estados do ViewModel
  const { 
    tasks, 
    addTask, 
    deleteTask, 
    toggleCompletion, 
    getTaskDetails 
  } = viewModel;

  // Organiza as props de injeção por tela (para serem passadas ao AppNavigator)
  const listProps = { 
      tasks, 
      toggleCompletion 
  };
  const createProps = { 
      addTask 
  };
  const detailsProps = { 
      deleteTask, 
      getTaskDetails 
  };

  return (
    <NavigationContainer>
      <AppNavigator 
        listProps={listProps}
        createProps={{ addTask }}
        detailsProps={{ deleteTask, getTaskDetails }}
      />
    </NavigationContainer>
  );
}