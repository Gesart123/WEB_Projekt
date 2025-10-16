<script>
  import { fmtDateShort, fmtFromNow, isOverdue } from '$lib/utils/datefmt.js';
  import { itemToICS } from '$lib/utils/ics.js';

  const { it, onDelete } = $props();  

  function drag(e) {
    e.dataTransfer.setData('text/plain', it.id);
  }

  function del() {
    if (confirm('Item löschen?')) onDelete?.(it);
  }

  function downloadICS() {
    const blob = itemToICS(it);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${it.title}.ics`;
    a.click();
  }

  async function shareItem() {
    const text = `${it.title}\n${it.description}\nFällig: ${fmtDateShort(it.dueDate)}`;
    if (navigator.share) await navigator.share({ title: it.title, text });
    else await navigator.clipboard.writeText(text);
  }
</script>

<article
  draggable
  ondragstart={drag}
  class="rounded-xl border border-slate-200 bg-white p-3 shadow-sm hover:shadow transition"
>
  <div class="flex justify-between items-start gap-2">
    <div>
      <h4 class="font-medium">{it.title}</h4>
      {#if it.description}
        <p class="text-sm text-slate-600">{it.description}</p>
      {/if}
    </div>
    <span
      class="text-[10px] uppercase px-2 py-1 rounded-full
        {it.priority==='high' ? 'bg-red-100 text-red-700 border-red-300 border' :
         it.priority==='low' ? 'bg-green-100 text-green-700 border-green-300 border' :
         'bg-amber-100 text-amber-800 border border-amber-300'}"
    >
      {it.priority}
    </span>
  </div>

  <div class="mt-2 text-xs flex flex-wrap gap-2">
    <span class="border px-2 py-1 rounded bg-slate-50">SP: {it.storyPoints}</span>
    <span class="border px-2 py-1 rounded bg-slate-50">
      Erstellt: {fmtDateShort(it.creationDate)}
    </span>

    {#if it.dueDate}
      <span
        class="{isOverdue(it.dueDate)
          ? 'bg-red-100 text-red-700 border-red-300'
          : 'bg-slate-50 border'} border px-2 py-1 rounded"
      >
        Fällig: {fmtDateShort(it.dueDate)} {isOverdue(it.dueDate) ? '• Überfällig' : ''}
      </span>
    {/if}
  </div>

  {#if it.dueDate}
    <div class="mt-1 text-[11px] text-slate-500">
      ({fmtFromNow(it.dueDate)})
    </div>
  {/if}

  <div class="mt-3 flex gap-2">
    <button onclick={downloadICS} class="px-2 py-1 border rounded">ICS</button>
    <button onclick={shareItem} class="px-2 py-1 border rounded">Teilen</button>
    <button onclick={del} class="px-2 py-1 border rounded">Löschen</button>
  </div>
</article>
