// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// Removemos a importação do createStackNavigator, pois ele está no AppNavigator.

// 1. SERVICES & VIEWMODEL IMPORTS (Camada de Lógica)
import { useTaskListViewModel } from './src/viewmodels/TaskListViewModel';
import { InMemoryTaskRepository } from './src/services/InMemoryTaskRepository';

// 2. NAVIGATION IMPORT (Configuração da Navegação)
import AppNavigator from './src/navigation/AppNavigation'; 
// Note: O arquivo de views não é mais importado aqui, apenas no AppNavigator.

// 3. INJEÇÃO DE DEPENDÊNCIAS CENTRALIZADA
// A Injeção de Dependência acontece neste nível, onde decidimos
// qual implementação concreta será usada (TaskRepositoryProtocol -> InMemoryTaskRepository).
const taskRepository = new InMemoryTaskRepository();

export default function App() {
  // Inicializa o ViewModel, injetando a dependência CONCRETA
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
      {/* O AppNavigator recebe as props injetadas e cuida de passar
        cada função/estado para a tela correta, mantendo a arquitetura MVVM.
      */}
      <AppNavigator 
        listProps={listProps}
        createProps={createProps}
        detailsProps={detailsProps}
      />
    </NavigationContainer>
  );
}