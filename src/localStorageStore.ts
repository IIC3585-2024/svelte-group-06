import { writable } from 'svelte/store';

export function localStorageStore<T>(key: string, startValue: T) {
  const isLocalStorageAvailable = typeof localStorage !== 'undefined';

  const storedValue = isLocalStorageAvailable ? localStorage.getItem(key) : null;
  const initialValue = storedValue === null ? startValue : JSON.parse(storedValue);

  const store = writable<T>(initialValue);

  if (isLocalStorageAvailable) {
    store.subscribe((value) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  return store;
}