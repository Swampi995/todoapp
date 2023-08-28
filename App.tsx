import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { reduxStore } from './src/store';
import { StyleSheet } from 'react-native';
import Navigation from './src/navigation';
import Colors from './src/components/Colors';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={reduxStore}>
        <SafeAreaView style={styles.wrapper}>
          <Navigation />
        </SafeAreaView>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
