import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { AuthStackParamList, RootStackParamList } from './types';
import { appConnect, AppProps } from '../store/connect/appConnect'
import LoginScreen from '../screens/Login';
import MainScreen from '../screens/Main';

interface NavigationProps extends AppProps {

}

function Navigation(props: NavigationProps) {
  return (
    <NavigationContainer>
      {props.authenticated ? <RootNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default appConnect(Navigation);
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}