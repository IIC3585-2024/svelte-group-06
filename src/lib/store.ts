import { writable } from 'svelte/store';

export interface Task {
  id: number;
  name: string;
  category: string;
  estimatedTime: number;
  timeUnit: string;
  description: string | null;
  startTime: Date | null;
  endTime: Date | null;
  isCompleted: boolean;
}

export interface Timer {
  startTimer: (duration: number) => void;
  stopTimer: () => void;
}

export const tasks = writable<Task[]>([]);
export const completedTasks = writable<Task[]>([]);
export const notifications = writable<string>('');
export const timer = writable<Timer>({} as Timer);
