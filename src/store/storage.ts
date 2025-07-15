import { MMKV } from 'react-native-mmkv';
import { PersistStorage, StorageValue } from 'zustand/middleware';

export const mmkv = new MMKV();

const storage: PersistStorage<any> = {
  getItem: (name) => {
    const value = mmkv.getString(name);
    if (!value) return null;
    try {
      return JSON.parse(value) as StorageValue<any>;
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    mmkv.set(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    mmkv.delete(name);
  },
};
export default storage;
