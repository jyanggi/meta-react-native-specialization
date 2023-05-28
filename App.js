import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/Onboarding';

export default function App() {
  return (
       <NavigationContainer>
         <Stack.Navigator>
           <Stack.Screen name="Onboarding" component={Onboarding} />
         </Stack.Navigator>
       </NavigationContainer>

  );
}


