// src/navigation/AppNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from '../views/ListScreen'; 
import CreateTaskScreen from '../views/CreateTaskScreen';
import TaskDetailsScreen from '../views/TaskDetailsScreen';

// 1. Definição de Tipos para Rotas (Crucial para TypeScript)
export type RootStackParamList = {
  ListScreen: undefined;
  CreateTaskScreen: undefined;
  TaskDetailsScreen: { taskId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

// 2. Tipagem para as props injetadas
interface AppNavigatorProps {
  listProps: any; 
  createProps: any; 
  detailsProps: any; 
}

// 🛑 CORREÇÃO: Garanti que a função fecha corretamente (retorno implícito do JSX)
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
      </Stack.Screen><Stack.Screen name="CreateTaskScreen" options={{ title: 'CREATE TASK' }}>
        {(props) => <CreateTaskScreen {...props} {...createProps} />}
      </Stack.Screen><Stack.Screen name="TaskDetailsScreen" options={{ title: 'TASK DETAILS' }}>
        {(props) => <TaskDetailsScreen {...props} {...detailsProps} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}