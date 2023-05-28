
import * as React from "react";
import {Alert, Image, StyleSheet, Text, TextInput, View, SafeAreaView, Pressable, useWindowDimensions} from "react-native";
import {validateEmail, validName, getProfile, saveProfile} from "../utils";
import SplashScreen from "../components/SplashScreen";

const Onboarding = ({ navigation })=>{
    const {height, width} = useWindowDimensions();
    const [isLoading, setIsLoading] = React.useState(true);
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const isEmailValid = validateEmail(email);
    const isValidName = validName(name);

    React.useEffect(()=>{
        const fetchData = async () => {
        const profile = await getProfile();
        if(profile){
            const data = JSON.parse(profile);
            setName(data.firstName);
            setEmail(data.email);
            navigation.navigate("Profile");
        }
        setTimeout(()=>setIsLoading(false), 1000);

        }
    fetchData();

    },[]);

    if (isLoading) {
        return <SplashScreen />;
        }

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
        required={true}
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
        required={true}
        onChangeText={setEmail}
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholder={"Type your email"}
      />
      { email && !isEmailValid && <Text style={styles.error}>Invalid email format</Text>}
      <Pressable
      onPress={async ()=>  {
        await saveProfile({firstName: name, email: email});
        navigation.navigate("Profile");
      }}
      style={[styles.pressable,  (!isEmailValid || !isValidName) && styles.pressableDisabled]}
      disabled={!isEmailValid || !isValidName}

    >
      <Text style={styles.pressableText}>Next</Text>
    </Pressable>
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
      pressable: {
        borderRadius: 16,
        backgroundColor: '#F4CE14',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 8,
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
      pressableText: {
        fontSize: 16,
        color: "#495E57",
      }
  });
export default Onboarding;