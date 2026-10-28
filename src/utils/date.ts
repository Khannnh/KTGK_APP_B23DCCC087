import type {Task} from '../types/task';

const DATE_PATTERN = /^(\d{2})\/(\d{2})\/(\d{4})$/;

export function parseDate(str: string): Date | null {
  const match = DATE_PATTERN.exec(str);

  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const month = Number(match[2]) - 1;
  const year = Number(match[3]);
  const date = new Date(year, month, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).padStart(4, '0');

  return `${day}/${month}/${year}`;
}

export function getToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function diffDaysFromToday(dueStr: string): number {
  const dueDate = parseDate(dueStr);

  if (!dueDate) {
    throw new Error(`Invalid due date: ${dueStr}`);
  }

  return Math.round((dueDate.getTime() - getToday().getTime()) / 86400000);
}

export function isOverdue(task: Task): boolean {
  return !task.done && diffDaysFromToday(task.dueDate) < 0;
}

export function getRemainingText(task: Task): string {
  const days = diffDaysFromToday(task.dueDate);

  if (days < 0) {
    return `Quá hạn ${Math.abs(days)} ngày`;
  }

  if (days === 0) {
    return 'Hạn hôm nay';
  }

  return `Còn ${days} ngày`;
}

export function formatDateInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);
  let formatted = day;

  if (digits.length > 2) {
    formatted += `/${month}`;
  }

  if (digits.length > 4) {
    formatted += `/${year}`;
  }

  return formatted.slice(0, 10);
}