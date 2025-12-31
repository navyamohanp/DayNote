import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { reduxStore } from './src/redux/store';
import AppContainer from './src/navigation';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={reduxStore}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContainer />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
