import { format, formatDistanceToNow, isPast } from 'date-fns';
import de from 'date-fns/locale/de';

export function fmtDateShort(date) {
  return format(new Date(date), 'dd.MM.yyyy', { locale: de });
}

export function fmtFromNow(date) {
  return formatDistanceToNow(new Date(date), { locale: de, addSuffix: true });
}

export function isOverdue(date) {
  return isPast(new Date(date));
}