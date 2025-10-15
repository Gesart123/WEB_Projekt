import { format, parseISO, isAfter, formatDistanceToNowStrict } from 'date-fns';

export function fmtDateShort(iso) {
  const d = typeof iso === 'string' ? parseISO(iso) : new Date(iso);
  return format(d, 'dd.MM.yyyy');
}

export function fmtFromNow(iso) {
  const d = typeof iso === 'string' ? parseISO(iso) : new Date(iso);
  return formatDistanceToNowStrict(d, { addSuffix: true });
}

export function isOverdue(iso) {
  const d = typeof iso === 'string' ? parseISO(iso) : new Date(iso);
  return isAfter(new Date(), d);
}
