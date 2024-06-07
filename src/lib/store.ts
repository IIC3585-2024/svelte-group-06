import { writable } from 'svelte/store';

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
  stopTimer: () => void;
}

export const tasks = writable<Task[]>([]);
export const completedTasks = writable<Task[]>([]);
export const notifications = writable<string>('');
export const timer = writable<Timer>({} as Timer);
export const currentTask = writable<Task>({} as Task);
export const isTimerRunning = writable<boolean>(false);
export const time = writable<number>(0);
export const modal = writable<boolean>(false);
