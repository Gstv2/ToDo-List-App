// src/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from '../views/ListScreens';
import CreateTaskScreen from '../views/CreateTaskScreen';
import TaskDetailsScreen from '../views/TaskDetailsScreen';

// 1. Definição de Tipos para Rotas (Crucial para TypeScript)
// Define os parâmetros esperados para cada rota.
export type RootStackParamList = {
  ListScreen: undefined; // Não espera parâmetros
  CreateTaskScreen: undefined; // Não espera parâmetros
  TaskDetailsScreen: { taskId: string }; // Espera o ID da tarefa
};

const Stack = createStackNavigator<RootStackParamList>();

// 2. Componente de Navegação
// Ele define a estrutura das telas. As props do ViewModel serão injetadas
// por quem renderiza este componente (App.tsx).
interface AppNavigatorProps {
  // O App.tsx irá injetar as props do ViewModel aqui
  listProps: any; 
  createProps: any; 
  detailsProps: any; 
}

export default function AppNavigator({ listProps, createProps, detailsProps }: AppNavigatorProps) {
  return (
    <Stack.Navigator
      initialRouteName="ListScreen"
      screenOptions={{
        headerStyle: { backgroundColor: '#f0f0f0' },
        headerTintColor: '#333',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="ListScreen" options={{ title: 'TO-DO LIST' }}>
        {(props) => <ListScreen {...props} {...listProps} />}
      </Stack.Screen>

      <Stack.Screen name="CreateTaskScreen" options={{ title: 'CREATE TASK' }}>
        {(props) => <CreateTaskScreen {...props} {...createProps} />}
      </Stack.Screen>

      <Stack.Screen name="TaskDetailsScreen" options={{ title: 'TASK DETAILS' }}>
        {(props) => <TaskDetailsScreen {...props} {...detailsProps} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}