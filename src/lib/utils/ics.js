import { parseISO } from 'date-fns';

export function itemToICS(item) {
  const uid = `${item.id}@kanban`;
  const start = toUtcString(item.dueDate || new Date());
  const end = toUtcString(addHour(item.dueDate || new Date()));
  const lines = [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Svelte Kanban//DE','BEGIN:VEVENT',
    `UID:${uid}`,`DTSTAMP:${toUtcString(new Date())}`,
    `DTSTART:${start}`,`DTEND:${end}`,
    `SUMMARY:${escapeICS(item.title)}`,`DESCRIPTION:${escapeICS(item.description || '')}`,
    'END:VEVENT','END:VCALENDAR'
  ];
  return new Blob([lines.join('\\r\\n')], { type: 'text/calendar' });
}

function addHour(d) {
  const date = typeof d === 'string' ? parseISO(d) : new Date(d);
  date.setHours(date.getHours() + 1);
  return date;
}

function toUtcString(d) {
  const date = typeof d === 'string' ? parseISO(d) : d;
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function escapeICS(s) {
  return String(s).replace(/\\\\/g, '\\\\\\\\').replace(/\\n/g, '\\\\n').replace(/,/g, '\\\\,').replace(/;/g, '\\\\;');
}
