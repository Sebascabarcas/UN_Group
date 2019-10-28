import {AsyncStorage} from 'react-native';

const StoreKey = '@UNGroupStore:'
const Storage = {
  get: async (key, callback) => {
    try {
      var value
      if (callback) {
        value = await AsyncStorage.getItem (`${StoreKey}${key}`, callback)
      } else {
        value = await AsyncStorage.getItem (`${StoreKey}${key}`)
      }
      if (value !== null) {
        return JSON.parse(value)
      }
      return value
    } catch (error) {
      console.log (error);
    }
  },
  set: async (key, value, callback) => {
    try {
      const valueString = JSON.stringify (value);
      if (callback) {
        await AsyncStorage.setItem (`${StoreKey}${key}`, valueString, callback);
      } else {
        await AsyncStorage.setItem (`${StoreKey}${key}`, valueString);
      }
    } catch (error) {
      console.log (error);
    }
  },
  delete: async (key, callback) => {
    try {
      if (callback) {
        await AsyncStorage.removeItem (`${StoreKey}${key}`, callback);
      } else {
        await AsyncStorage.removeItem (`${StoreKey}${key}`);
      }
    } catch (error) {
      console.log (error);
    }
  },
};

export default Storage;
