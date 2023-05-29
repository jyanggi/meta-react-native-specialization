import AsyncStorage from '@react-native-async-storage/async-storage';

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};


export const validName = (name) => {
  return name.match(
    /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]+$/
  );
};


export const validatePhone = (name) => {
  return name.match(
    /^[0-9]{10}$/
  );
};
const LITTLE_LEMON_PROFILE = "littleLemonProfile";

export const saveProfile = async(profile) => {
  try {
    const jsonValue = JSON.stringify(profile)
    await AsyncStorage.setItem(LITTLE_LEMON_PROFILE, jsonValue)
  } catch(e) {
   console.error(e);
  }
}

export const getProfile = async() => {
  try {
    return await AsyncStorage.getItem(LITTLE_LEMON_PROFILE)
  } catch(e) {
    console.error(e);
  }
}

export const mergeProfile = async (profile) => {
  try {
    const jsonValue = JSON.stringify(profile)
    await AsyncStorage.mergeItem(LITTLE_LEMON_PROFILE, jsonValue)
  } catch(e) {
    console.error(e);
  }
}


export const clearProfile = async() => {
  try {
     await AsyncStorage.clear();
  } catch(e) {
    console.error(e);
  }
}