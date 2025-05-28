export async function getSession(key: string): Promise<string | null> {
  return localStorage.getItem(key);
}

export async function setSession(key: string, value: string): Promise<void> {
  localStorage.setItem(key, value);
}

export async function removeSession(key: string): Promise<void> {
  localStorage.removeItem(key);
}
