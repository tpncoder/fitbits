import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value: any, key_name: string) => {
    try {
      await AsyncStorage.setItem(key_name, value);
    } catch (e) {
      console.log(e)
    }
};

export const storeObject = async (value: object, key_name: string) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key_name, jsonValue);
    } catch (e) {
      console.log(e)
    }
};

export const getData = async (key_name: string) => {
  try {
    const value = await AsyncStorage.getItem(key_name);
    if (value !== null) {
      return value
    }
  } catch (e) {
    console.log(e)
  }
};

export const getObjectData = async (key_name) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key_name);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e)
  }
};

export const removeData = async (key_name) => {
  try {
    await AsyncStorage.removeItem(key_name)
  } catch(e) {
    console.log(e)
  }
}