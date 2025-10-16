import { createEvent } from 'ics';

export function itemToICS(item) {
  const event = {
    start: new Date(item.dueDate).toISOString().split('T')[0].split('-').map(Number),
    title: item.title,
    description: item.description || '',
    duration: { hours: 1 }
  };
  let value;
  createEvent(event, (error, val) => {
    if (error) {
      console.error(error);
      return null;
    }
    value = val;
  });
  if (!value) return null;
  return new Blob([value], { type: 'text/calendar' });
}