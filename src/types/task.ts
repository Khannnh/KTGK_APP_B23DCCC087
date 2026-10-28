export type Category = 'Học tập' | 'Công việc' | 'Sức khoẻ' | 'Cá nhân';

export type Priority = 'Cao' | 'Trung bình' | 'Thấp';

export type Task = {
  id: string;
  title: string;
  note: string;
  category: Category;
  priority: Priority;
  dueDate: string;
  done: boolean;
};

export type RootStackParamList = {
  TaskList: undefined;
  TaskForm: { taskId?: string };
  TaskDetail: { taskId: string };
};