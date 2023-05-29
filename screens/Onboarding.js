
import * as React from "react";
import { Image, StyleSheet, Text, TextInput, View, SafeAreaView, Pressable, useWindowDimensions} from "react-native";
import {validateEmail, validName, saveProfile} from "../utils";
import LittleLemonButton from "../components/LittleLemonButton";

const Onboarding = ({ navigation })=>{
    const {height, width} = useWindowDimensions();
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const isEmailValid = validateEmail(email);
    const isValidName = validName(name);

    return <SafeAreaView style={[styles.container,{ padding: width * .05}]}>
        <View style={[styles.header, {marginBottom: height * .1, paddingTop: height *.1}]} >
        <Image source={require('../assets/Logo.png')} />
        </View>
       <Text style={[styles.title,{ paddingBottom:height *.05}]}>
        Let us get to know you
      </Text>
      <Text style={styles.label}>
        First Name *
      </Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder={"Type your name"}
      />
        {name && !isValidName && <Text style={styles.error}>Invalid name format (At least 2 characters with letters, space, hyphen, comma, and period only)</Text>}
        <Text style={styles.label}>
        Email *
      </Text>
        <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholder={"Type your email"}
      />
      { email && !isEmailValid && <Text style={styles.error}>Invalid email format</Text>}
      <LittleLemonButton
      buttonStyle={(!isEmailValid || !isValidName) && styles.pressableDisabled}
      onPress={async ()=>  {
        await saveProfile({firstName: name, email: email});
        navigation.navigate("Profile");
      }}
        text="Next"
        disabled={!isEmailValid || !isValidName}
        fontSize= {16}
        textColor= "#495E57"
      />
    </SafeAreaView>;

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
      },
      header:{
        alignSelf: "center",
      },
      label:{
        color: "grey",
        fontSize: 16,
      },
      title: {
        color: "#333333",
        textAlign: "center",
        fontSize: 20,
      },
      logo: {
        height: 100,
        width: 300,
        resizeMode: "contain",
        marginBottom: 32,
      },
      input: {
        height: 40,
        marginVertical: 24,
        borderRadius: 8,
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        borderColor: "#495E57",
      },
      error:{
        color: "#EE9972",
        fontSize: 14,
        paddingBottom: 20
      },
      pressableDisabled: {
        backgroundColor: 'grey',
        opacity: 0.5,
      },

  });
export default Onboarding;