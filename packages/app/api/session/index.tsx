// packages/lib/session/index.ts
import { Platform } from 'react-native';

let sessionImpl: {
  getSession: (key: string) => Promise<string | null>;
  setSession: (key: string, value: string) => Promise<void>;
  removeSession: (key: string) => Promise<void>;
};

if (Platform.OS === 'web') {
  sessionImpl = require('./web');
  console.log('web')
} else {
  sessionImpl = require('./native');
  console.log('native')
}

export const getSession = sessionImpl.getSession;
export const setSession = sessionImpl.setSession;
export const removeSession = sessionImpl.removeSession;
