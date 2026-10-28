import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Task} from '../types/task';

const STORAGE_KEY = '@planner_tasks';

export async function loadTasks(): Promise<Task[] | null> {
  try {
    const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);

    if (storedTasks === null) {
      return null;
    }

    const tasks: unknown = JSON.parse(storedTasks);

    if (!Array.isArray(tasks)) {
      throw new Error('Dữ liệu công việc đã lưu không hợp lệ.');
    }

    return tasks as Task[];
  } catch (error) {
    console.error('Không thể tải danh sách công việc.', error);
    throw error;
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Không thể lưu danh sách công việc.', error);
    throw error;
  }
}