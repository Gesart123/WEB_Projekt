export function exportAllCSV(items) {
  const escapeField = (field) => `"${(field || '').toString().replace(/"/g, '""')}"`;
  const csv = ['id,title,description,creationDate,dueDate,storyPoints,priority,lane']
    .concat(items.map(i => `${i.id},${escapeField(i.title)},${escapeField(i.description)},${i.creationDate},${i.dueDate},${i.storyPoints},${i.priority},${i.lane}`))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'kanban.csv';
  a.click();
}