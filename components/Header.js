
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View , Image} from 'react-native';

import logo from '../assets/Logo.png'  ;

const Header = ()=>{

    return <SafeAreaView style={styles.container}>
       <Image source={require('../assets/Logo.png')} />
    </SafeAreaView>;

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
export default Header;