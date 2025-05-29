import * as SecureStore from 'expo-secure-store';

export async function getSession(key: string): Promise<string | null> {
  return SecureStore.getItemAsync(key);
}

export async function setSession(key: string, value: string): Promise<void> {
  return SecureStore.setItemAsync(key, value);
}

export async function removeSession(key: string): Promise<void> {
  return SecureStore.deleteItemAsync(key);
}
