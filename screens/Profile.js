
import * as React from "react";
import { Image, StyleSheet, Text, TextInput, View, SafeAreaView, ScrollView,  useWindowDimensions, Alert} from "react-native";
import { CheckBox, Separator } from "react-native-btr";
import {validateEmail, validName, getProfile, validatePhone, clearProfile, saveProfile, getInitials} from "../utils";
import * as ImagePicker from 'expo-image-picker';
import { MaskedTextInput } from "react-native-mask-text";
import Avatar from "../components/Avatar";
import LittleLemonButton from "../components/LittleLemonButton";

const Profile = ({navigation})=>{

    const {height, width} = useWindowDimensions();
    const [isValid, setIsValid] = React.useState(true);
    const reducer = (state, action) => {


      switch (action.type) {
        case "FIRST_NAME":
          return {...state, firstName: action.firstName}
        case "LAST_NAME":
          return {...state, lastName: action.lastName}
        case "EMAIL":
          return {...state, email: action.email}
        case "PHONE_NUMBER":
          return {...state, phoneNumber: action.phoneNumber}
        case "ALL":
          return {...action.profile}
        case "ORDER_STATUSES":
          return {...state, orderStatuses: action.orderStatuses}
        case "PASSWORD_CHANGES":
          return {...state, passwordChanges: action.passwordChanges}
        case "SPECIAL_OFFERS":
          return {...state, specialOffers: action.specialOffers}
        case "NEWSLETTER":
          return {...state, newsletter: action.newsletter}
        case "IMAGE":
          return {...state, image: action.image}
          default:
          return state;
      }
    };

  const [profile, dispatch] = React.useReducer(reducer, {});


  React.useEffect(()=>{
    const fetchData = async ()=>{
      const profile = await getProfile();
      const jsonData =  JSON.parse(profile);
      dispatch({type: 'ALL', profile: jsonData })
    }
    fetchData();

  },[])
  React.useEffect(()=>{

    setIsValid(
      profile.phoneNumber && validatePhone(profile.phoneNumber) &&
      profile.firstName && validName(profile.firstName) &&
      profile.lastName && validName(profile.lastName) &&
      profile.email && validateEmail(profile.email)
    );

  },[profile])

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        dispatch({type: 'IMAGE', image: result.assets[0].uri });
      }
    };

    return (profile && <ScrollView><SafeAreaView style={[styles.container,{ padding: width * .05}]}>
    <View style={[styles.header, {marginBottom: height * .05, paddingTop: height *.1}]} >
    <LittleLemonButton
      onPress={()=> navigation.navigate("Home")}
      buttonStyle={{padding: 0, width: width * .1, height: width * .1, borderRadius: (width * .1)/2}}
        text="&larr;"
        fontSize= {20}
        textColor= "#EDEFEE"
        color="#495E57"
      />
    <Image resizeMode= "contain" style={{width: width * .6, maxHeight: height * .05}} source={require('../assets/Logo.png')} />
    <Avatar size={height * .05} width={width * .2} placeholder={getInitials(profile)}  url={profile.image}/>
    </View>
   <Text style={[styles.title,{ paddingBottom:height *.02, paddingTop:height *.02}]}>
    Personal Information
  </Text>
  <View style={{ padding: height * .03, flexDirection: "row", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Avatar size={100} placeholder={getInitials(profile)}  url={profile.image}/>
      <LittleLemonButton
      buttonStyle={{marginRight: 10}}
      onPress={pickImage}
        text="Change"
        fontSize= {16}
        textColor= "#EDEFEE"
        color="#495E57"

      />
      <LittleLemonButton
      buttonStyle={{ borderStyle: "solid", borderWidth: 1, borderColor : "#495E57"}}
      onPress={() => dispatch({type: "IMAGE", image: null})}
        text="Remove"
        fontSize= {16}
        textColor= "#495E57"
        color="white"
      />
    </View>
  <Text style={styles.label}>
    First Name *
  </Text>
  <TextInput
    style={styles.input}
    value={profile.firstName}
    onChangeText={(text)=> dispatch({type: 'FIRST_NAME', firstName: text })}
    placeholder={"Type your first name"}
  />
    {profile.firstName && !validName(profile.firstName) && <Text style={styles.error}>Invalid name format (At least 2 characters with letters, space, hyphen, comma, and period only)</Text>}
    <Text style={styles.label}>
    Last Name *
  </Text>
  <TextInput
    style={styles.input}
    value={profile.lastName}

    onChangeText={(text)=> dispatch({type: 'LAST_NAME', lastName: text })}
    placeholder={"Type your last name"}
  />
    {profile.lastName && !validName(profile.lastName) && <Text style={styles.error}>Invalid name format (At least 2 characters with letters, space, hyphen, comma, and period only)</Text>}
    <Text style={styles.label}>
    Email *
  </Text>
    <TextInput
    style={styles.input}
    value={profile.email}
    onChangeText={(text)=> dispatch({type: 'EMAIL', email: text })}
    keyboardType="email-address"
    textContentType="emailAddress"
    placeholder={"Type your email"}
  />
  { profile.email && !validateEmail(profile.email)&& <Text style={styles.error}>Invalid email format</Text>}
  <Text style={styles.label}>
    Phone number *
  </Text>
  <MaskedTextInput
  mask="(999) 999-9999"
  value={profile.phoneNumber}
  style={styles.input}
  keyboardType="phone-pad"
  onChangeText={(text, rawText) => {
    dispatch({type: 'PHONE_NUMBER', phoneNumber: rawText })
  }}
  placeholder={"(555) 555-1234"}
/>
{profile.phoneNumber && !validatePhone(profile.phoneNumber) && <Text style={styles.error}>Invalid phone format</Text>}
<Separator />
<Text style={[styles.title,{ paddingBottom:height *.02, paddingTop:height *.02}]}>
    Email Notifications
  </Text>
  <View style={styles.checkboxRow}>
      <CheckBox
        checked={profile.orderStatuses}
        color="#495E57"
        onPress={() => dispatch({type: 'ORDER_STATUSES', orderStatuses: !profile.orderStatuses })}
      />
      <Text style={styles.label}>Order Statuses</Text>
    </View>
    <View style={styles.checkboxRow}>
      <CheckBox
        checked={profile.passwordChanges}
        color="#495E57"
        onPress={() => dispatch({type: 'PASSWORD_CHANGES', passwordChanges: !profile.passwordChanges })}
      />
      <Text style={styles.label}>Password changes</Text>
      </View>
      <View style={styles.checkboxRow}>
      <CheckBox
        checked={profile.specialOffers}
        color="#495E57"
        onPress={() => dispatch({type: 'SPECIAL_OFFERS', specialOffers: !profile.specialOffers })}
      />
      <Text style={styles.label}>Special Offers</Text>
    </View>
    <View style={styles.checkboxRow}>
      <CheckBox
        checked={profile.newsletter}
        color="#495E57"
        onPress={() => dispatch({type: 'NEWSLETTER', newsletter: !profile.newsletter })}
      />
      <Text style={styles.label}>Newsletter</Text>
    </View>
<Separator/>
<LittleLemonButton
      buttonStyle={{marginTop: 25, marginBottom: 25}}
      onPress={async ()=>  {
        await clearProfile();
        navigation.push("Onboarding")
      }}
        text="Logout"
        fontSize= {16}
        textColor= "#495E57"
      />
  <View style={{ padding: height * .03, flexDirection: "row", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <LittleLemonButton
      buttonStyle={{marginRight: 10, borderStyle: "solid", borderWidth: 1, borderColor : "#495E57"}}
      onPress={async ()=>{
          const profile = await getProfile();
          const jsonData =  JSON.parse(profile);
          dispatch({type: 'ALL', profile: jsonData })
        }
      }
        text="Discard Changes"
        fontSize= {16}
        textColor= "#495E57"
        color="white"
      />
      <LittleLemonButton
      onPress={async ()=> {
        if(isValid){
          await saveProfile(profile);
          Alert.alert('Success', 'Changes saved', [
            {text: 'OK', onPress: () => {}},
          ]);
        }else{
          Alert.alert('Validation', 'Please fill up required fields with correct format', [
            {text: 'OK', onPress: () => {}},
          ]);
        }
      }}
        text="Save Changes"
        fontSize= {16}
        textColor= "#EDEFEE"
        color="#495E57"
      />
    </View>
</SafeAreaView></ScrollView>);

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "white",
    },
    header:{
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      flexDirection: "row",
      fontFamily: "Karla-Regular"
    },
    label:{
      color: "grey",
      fontSize: 15,
      marginLeft: 10,
      fontFamily: "Karla-Regular"
    },
    title: {
      color: "#333333",
      fontSize: 20,
      fontFamily: "Karla-Regular"
    },
    input: {
      height: 35,
      marginVertical: 15,
      borderRadius: 8,
      borderWidth: 1,
      padding: 8,
      fontSize: 16,
      borderColor: "#495E57",
      fontFamily: "Karla-Regular"
    },
    error:{
      color: "#EE9972",
      fontSize: 14,
      paddingBottom: 15,
      fontFamily: "Karla-Regular"
    },
    checkboxRow: {
      flexDirection: "row",
      backgroundColor: "#fff",
      alignItems: "center",
      padding: 5,
    },
});
export default Profile;