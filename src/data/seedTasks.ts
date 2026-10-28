import type {Task} from '../types/task';
import {formatDate, getToday} from '../utils/date';

function dateOffset(days: number): string {
  const date = getToday();
  date.setDate(date.getDate() + days);
  return formatDate(date);
}

export const seedTasks: Task[] = [
  {
    id: 'seed-1',
    title: 'Ôn tập cấu trúc dữ liệu',
    note: 'Xem lại cây nhị phân và thuật toán sắp xếp.',
    category: 'Học tập',
    priority: 'Cao',
    dueDate: dateOffset(-3),
    done: false,
  },
  {
    id: 'seed-2',
    title: 'Gửi báo cáo tuần',
    note: 'Tổng hợp tiến độ các đầu việc trong tuần.',
    category: 'Công việc',
    priority: 'Trung bình',
    dueDate: dateOffset(2),
    done: false,
  },
  {
    id: 'seed-3',
    title: 'Đi bộ buổi sáng',
    note: 'Dành 30 phút vận động ngoài trời.',
    category: 'Sức khoẻ',
    priority: 'Thấp',
    dueDate: dateOffset(1),
    done: false,
  },
  {
    id: 'seed-4',
    title: 'Đọc sách trước khi ngủ',
    note: 'Đọc tiếp cuốn sách đang dang dở.',
    category: 'Cá nhân',
    priority: 'Trung bình',
    dueDate: dateOffset(4),
    done: false,
  },
  {
    id: 'seed-5',
    title: 'Hoàn thành bài tập tiếng Anh',
    note: 'Làm bài đọc và kiểm tra từ vựng.',
    category: 'Học tập',
    priority: 'Thấp',
    dueDate: dateOffset(3),
    done: true,
  },
  {
    id: 'seed-6',
    title: 'Chuẩn bị nội dung họp',
    note: 'Ghi lại các nội dung cần trao đổi với nhóm.',
    category: 'Công việc',
    priority: 'Cao',
    dueDate: dateOffset(5),
    done: false,
  },
  {
    id: 'seed-7',
    title: 'Đặt lịch khám sức khoẻ',
    note: 'Kiểm tra lịch trống và đặt hẹn.',
    category: 'Sức khoẻ',
    priority: 'Cao',
    dueDate: dateOffset(7),
    done: false,
  },
  {
    id: 'seed-8',
    title: 'Sắp xếp góc làm việc',
    note: 'Dọn bàn và phân loại giấy tờ.',
    category: 'Cá nhân',
    priority: 'Thấp',
    dueDate: dateOffset(0),
    done: false,
  },
];