import { writable } from 'svelte/store';
import { localStorageStore } from '../localStorageStore';

export interface Task {
  id: number;
  name: string;
  category: string;
  estimatedTime: number;
  description: string | null;
  startTime: Date | null;
  endTime: Date | null;
  isCompleted: boolean;
  selected: boolean;
  spentTime: number;
}


export interface Timer {
  startTimer: (duration: number) => void;
  stopTimer: () => Promise<void>;
}

export const tasks = localStorageStore<Task[]>('tasks', []);
export const completedTasks = localStorageStore<Task[]>('completedTasks', []);
export const notifications = writable<string>('');
export const timer = writable<Timer>({} as Timer);
export const currentTask = localStorageStore<Task>('currentTask', {} as Task);
export const time = writable<number>(0);
export const modal = writable<boolean>(false);
export const interval = writable<NodeJS.Timeout | void>();
