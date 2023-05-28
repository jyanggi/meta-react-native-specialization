
import * as React from "react";
import {Alert, Image, StyleSheet, Text, TextInput, View, SafeAreaView, Pressable} from "react-native";
import {validateEmail, validName} from "../utils";

const Profile = ()=>{
    const [email, setEmail] = React.useState('');

    const [name, setName] = React.useState('');

    const isEmailValid = validateEmail(email);

    const isValidName = validName(name);


    return <Text>Profile Page</Text>;

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "white",
      },
      header:{
        alignSelf: "center",
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: 150
      },
      label:{
        color: "grey",
        fontSize: 20,
      },
      title: {
        color: "#333333",
        textAlign: "center",
        fontSize: 20,
        marginBottom: 50

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
        fontSize: 20,
        borderColor: "#495E57",
      },
      pressable: {
        borderRadius: 16,
        backgroundColor: '#F4CE14',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 8,
      },
      error:{
        color: "#EE9972",
        fontSize: 20,
        paddingBottom: 20
      },
      pressableDisabled: {
        backgroundColor: 'grey',
        opacity: 0.5,
      },
      pressableText: {
        fontSize: 20,
        color: "#495E57",
      }
  });
export default Profile;