export function exportAllCSV(items) {
  const headers = ['id','title','description','creationDate','dueDate','storyPoints','priority','lane'];
  const rows = [headers.join(',')];
  for (const it of items) rows.push(headers.map(h => csvCell(it[h])).join(','));
  const blob = new Blob([rows.join('\\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'kanban-items.csv';
  a.click();
}

function csvCell(v) {
  const s = String(v ?? '');
  return /[\",\\n]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
}
