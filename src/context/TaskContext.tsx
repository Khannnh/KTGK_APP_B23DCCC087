import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import type {Task} from '../types/task';
import {seedTasks} from '../data/seedTasks';
import {loadTasks, saveTasks} from '../storage/taskStorage';

type NewTaskData = Omit<Task, 'id' | 'done'>;
type UpdatedTaskData = Partial<Omit<Task, 'id'>>;

type TaskContextValue = {
  tasks: Task[];
  loading: boolean;
  error: Error | null;
  addTask: (data: NewTaskData) => void;
  updateTask: (id: string, data: UpdatedTaskData) => void;
  deleteTask: (id: string) => void;
  toggleDone: (id: string) => void;
  deleteCompleted: () => void;
};

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export function TaskProvider({children}: PropsWithChildren) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;

    async function hydrateTasks() {
      try {
        const storedTasks = await loadTasks();

        if (active) {
          setTasks(storedTasks ?? seedTasks);
          setLoaded(true);
        }
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError
              : new Error('Không thể tải danh sách công việc.'),
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void hydrateTasks();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    let active = true;

    async function persistTasks() {
      try {
        await saveTasks(tasks);

        if (active) {
          setError(null);
        }
      } catch (saveError) {
        if (active) {
          setError(
            saveError instanceof Error
              ? saveError
              : new Error('Không thể lưu danh sách công việc.'),
          );
        }
      }
    }

    void persistTasks();

    return () => {
      active = false;
    };
  }, [loaded, tasks]);

  const addTask = useCallback((data: NewTaskData) => {
    const task: Task = {
      ...data,
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      done: false,
    };

    setTasks(currentTasks => [...currentTasks, task]);
  }, []);

  const updateTask = useCallback((id: string, data: UpdatedTaskData) => {
    setTasks(currentTasks =>
      currentTasks.map(task => (task.id === id ? {...task, ...data} : task)),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(currentTasks => currentTasks.filter(task => task.id !== id));
  }, []);

  const toggleDone = useCallback((id: string) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === id ? {...task, done: !task.done} : task,
      ),
    );
  }, []);

  const deleteCompleted = useCallback(() => {
    setTasks(currentTasks => currentTasks.filter(task => !task.done));
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      loading,
      error,
      addTask,
      updateTask,
      deleteTask,
      toggleDone,
      deleteCompleted,
    }),
    [
      tasks,
      loading,
      error,
      addTask,
      updateTask,
      deleteTask,
      toggleDone,
      deleteCompleted,
    ],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks(): TaskContextValue {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTasks phải được sử dụng bên trong TaskProvider.');
  }

  return context;
}