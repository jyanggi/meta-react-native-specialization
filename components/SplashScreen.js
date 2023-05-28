
import * as React from "react";
import { Image, StyleSheet, Text, View} from "react-native";

const SplashScreen = ()=>{
    return (
        <View style={styles.container}>
          <View style={styles.contentContainer}>
          <Image source={require('../assets/Logo.png')} />
            <Text style={styles.title}>
              Loading
            </Text>
          </View>
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'white',
        justifyContent: 'space-between',
      },
      contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        marginTop: 48,
        paddingVertical: 10,
        color: "#333333",
        textAlign: "center",
        fontSize: 20,
      },
    });
export default SplashScreen;