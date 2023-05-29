import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';
import SplashScreen from './components/SplashScreen';
import {getProfile} from "./utils";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = React.useState(false);

  React.useEffect(()=>{
      const fetchData = async () => {
      const profile = await getProfile();
      setIsOnboardingCompleted(profile? true: false);
      setTimeout(()=> setIsLoading(false), 800)
      }
  fetchData();

  },[]);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <>
    <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
  {isOnboardingCompleted ? (
   // Onboarding completed, user is signed in
     <Stack.Screen name="Profile" component={Profile} />
    ) : (
     // User is NOT signed in
     <Stack.Screen name="Onboarding" component={Onboarding} />
   )}
  </Stack.Navigator>
  </NavigationContainer>
  </>
  );
}


