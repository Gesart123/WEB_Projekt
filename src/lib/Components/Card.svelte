<script>
  import { fmtDateShort, fmtFromNow, isOverdue } from '$lib/utils/datefmt.js';
  import { itemToICS } from '$lib/utils/ics.js';

  const { item, onDelete } = $props();

  function drag(e) {
    e.dataTransfer.setData('text/plain', item.id);
  }

  function del() {
    if (confirm('Item löschen?')) onDelete?.(item);
  }

  function downloadICS() {
    const blob = itemToICS(item);
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title}.ics`;
    a.click();
  }

  async function shareItem() {
    const text = `${item.title}\n${item.description || ''}\nFällig: ${
      item.dueDate ? fmtDateShort(item.dueDate) : '–'
    }`;
    if (navigator.share) await navigator.share({ title: item.title, text });
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
      <h4 class="font-medium">{item.title}</h4>
      {#if item.description}
        <p class="text-sm text-slate-600">{item.description}</p>
      {/if}
    </div>

    <span
      class="text-[10px] uppercase px-2 py-1 rounded-full border
        {item.priority === 'high'
          ? 'bg-red-100 text-red-700 border-red-300'
          : item.priority === 'low'
          ? 'bg-green-100 text-green-700 border-green-300'
          : 'bg-amber-100 text-amber-800 border-amber-300'}"
    >
      {item.priority}
    </span>
  </div>

  <div class="mt-2 text-xs flex flex-wrap gap-2">
    <span class="border px-2 py-1 rounded bg-slate-50">
      SP: {item.storyPoints}
    </span>
    <span class="border px-2 py-1 rounded bg-slate-50">
      Erstellt: {fmtDateShort(item.creationDate)}
    </span>

    {#if item.dueDate}
      <span
        class="border px-2 py-1 rounded
          {isOverdue(item.dueDate)
            ? 'bg-red-100 text-red-700 border-red-300'
            : 'bg-slate-50'}"
      >
        Fällig: {fmtDateShort(item.dueDate)}
        {#if isOverdue(item.dueDate)} • Überfällig{/if}
      </span>
    {/if}
  </div>

  {#if item.dueDate}
    <div class="mt-1 text-[11px] text-slate-500">
      ({fmtFromNow(item.dueDate)})
    </div>
  {/if}

  <div class="mt-3 flex gap-2">
    <button onclick={downloadICS} class="px-2 py-1 border rounded">
      ICS
    </button>
    <button onclick={shareItem} class="px-2 py-1 border rounded">
      Teilen
    </button>
    <button onclick={del} class="px-2 py-1 border rounded">
      Löschen
    </button>
  </div>
</article>