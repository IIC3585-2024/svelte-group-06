import { writable } from 'svelte/store';

export interface Task {
  id: number;
  name: string;
  category: string;
  startTime: Date | null;
  endTime: Date | null;
  isCompleted: boolean;
}

export const tasks = writable<Task[]>([]);
export const completedTasks = writable<Task[]>([]);
export const notifications = writable<string>('');
