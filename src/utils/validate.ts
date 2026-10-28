import {getToday, parseDate} from './date';

export function validateTitle(s: string): string {
  const title = s.trim();

  if (title.length === 0) {
    return 'Tiêu đề không được để trống';
  }

  if (title.length > 50) {
    return 'Tiêu đề không được vượt quá 50 ký tự';
  }

  return '';
}

export function validateDueDate(s: string, isNew: boolean): string {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(s)) {
    return 'Ngày phải có định dạng dd/mm/yyyy';
  }

  const date = parseDate(s);

  if (!date) {
    return 'Ngày không hợp lệ';
  }

  if (isNew && date.getTime() < getToday().getTime()) {
    return 'Ngày đến hạn không được trước hôm nay';
  }

  return '';
}
