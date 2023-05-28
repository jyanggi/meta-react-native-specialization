import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <NavigationContainer>
    <Stack.Navigator initialRouteName= "Onboarding"
      screenOptions={{
        headerShown: false
      }}
    >
     <Stack.Screen name="Onboarding" component={Onboarding} />
     <Stack.Screen name="Profile" component={Profile} />
     </Stack.Navigator>
  </NavigationContainer>
  </>
  );
}


