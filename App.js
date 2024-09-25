import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import MainAppbar from './components/MainAppbar';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <PaperProvider>
      <MainAppbar />
      <TodoList />
    </PaperProvider>
    
  );
}
