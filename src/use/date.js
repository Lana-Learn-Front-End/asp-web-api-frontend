import dayjs from 'dayjs';

export function formatDate(date, template = 'YYYY-MM-DD') {
  if (!date) {
    return null;
  }
  return dayjs(date).format(template);
}

export function diffDate(dateA, dateB, unit) {
  return dayjs(dateA).diff(dateB, unit);
}
