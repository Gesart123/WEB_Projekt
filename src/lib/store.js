export const STORAGE_KEY = 'kanban_items_v1';

export const LANES = [
  { id: 'do', title: 'Do' },
  { id: 'doing', title: 'Doing' },
  { id: 'done', title: 'Done' },
  { id: 'archiv', title: 'Archiv' }
];

export function getItems() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}