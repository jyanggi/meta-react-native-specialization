import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';
import SplashScreen from './components/SplashScreen';
import {getProfile, fethMenu} from "./utils";
import Home from './screens/Home';
import { useFonts } from 'expo-font';
import {
  createTable,
  getMenuItems,
  saveMenuItems
} from './database';
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = React.useState(false);

  const [fontsLoaded] = useFonts({
    'MarkaziText-Regular': require('./assets/Fonts/MarkaziText-Regular.ttf'),
    'Karla-Regular': require('./assets/Fonts/Karla-Regular.ttf'),
  });




  React.useEffect(()=>{
      const fetchData = async () => {
      await createTable();
      let dbMenuItems = await getMenuItems();
      if (!dbMenuItems.length) {
      const menuItems = await fethMenu();
       saveMenuItems(menuItems.menu);
      }
      const profile = await getProfile();
      setIsOnboardingCompleted(profile? true: false);
      setTimeout(()=> setIsLoading(false), 800)
      }
  fetchData();

  },[]);

  if (isLoading || !fontsLoaded) {
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
   <>
     <Stack.Screen name="Home" component={Home} />
     <Stack.Screen name="Profile" component={Profile} />
     </>
    ) : (
     // User is NOT signed in
     <Stack.Screen name="Onboarding" component={Onboarding} />
   )}
  </Stack.Navigator>
  </NavigationContainer>
  </>
  );
}


