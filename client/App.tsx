import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FormsTest from './src/screens/FormsTest';

export default function App() {
  return (<FormsTest/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1a1aff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
