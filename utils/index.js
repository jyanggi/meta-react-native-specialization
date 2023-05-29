import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRef, useEffect } from 'react';

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


const API_URL =
'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
export const fethMenu = async() => {
  try{
    const result = await fetch(API_URL)
    return await result.json()
  }catch(e){
    console.error(e);
  }
  return [];
}


export const getInitials = (data)=> {
  const firstInitial = data?.firstName?.substring(0,1)?.toUpperCase()  || "";
  const lastInitial = data?.lastName?.substring(0,1)?.toUpperCase()  || "";
  return `${firstInitial}${lastInitial}`;
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
