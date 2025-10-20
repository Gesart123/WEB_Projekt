<script>
  import { fmtDateShort, fmtFromNow, isOverdue } from '$lib/utils/datefmt.js';
  import { itemToICS } from '$lib/utils/ics.js';

  const { item, onDelete } = $props();

  function drag(e) {
    e.dataTransfer.setData('text/plain', item.id);
  }

  function del() {
    if (confirm('Delete this item?')) onDelete?.(item);
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
    const text = `${item.title}\n${item.description || ''}\nDue: ${
      item.dueDate ? fmtDateShort(item.dueDate) : '–'
    }`;
    if (navigator.share) await navigator.share({ title: item.title, text });
    else await navigator.clipboard.writeText(text);
  }
</script>

<article
  draggable="true"
  ondragstart={drag}
  class="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-move"
>
  <div class="flex justify-between items-start gap-3">
    <div class="space-y-1">
      <h4 class="font-semibold text-blue-800 text-sm">{item.title}</h4>
      {#if item.description}
        <p class="text-[13px] text-slate-600 leading-snug">{item.description}</p>
      {/if}
    </div>

    <span
      class="text-[10px] uppercase px-2 py-1 rounded-full border font-medium
        {item.priority === 'high'
          ? 'bg-red-50 text-red-700 border-red-200'
          : item.priority === 'low'
          ? 'bg-green-50 text-green-700 border-green-200'
          : 'bg-blue-50 text-blue-700 border-blue-200'}"
    >
      {item.priority}
    </span>
  </div>

  <div class="mt-3 text-xs flex flex-wrap gap-2">
    <span class="border px-2 py-1 rounded-full bg-blue-50 text-blue-800 border-blue-100">
      SP: {item.storyPoints}
    </span>
    <span class="border px-2 py-1 rounded-full bg-slate-50 border-slate-200">
      Created: {fmtDateShort(item.creationDate)}
    </span>

    {#if item.dueDate}
      <span
        class="border px-2 py-1 rounded-full
          {isOverdue(item.dueDate)
            ? 'bg-red-50 text-red-700 border-red-200'
            : 'bg-blue-50 text-blue-700 border-blue-100'}"
      >
        Due: {fmtDateShort(item.dueDate)}
        {#if isOverdue(item.dueDate)} • Overdue{/if}
      </span>
    {/if}
  </div>

  {#if item.dueDate}
    <div class="mt-1 text-[11px] text-slate-500 italic">
      ({fmtFromNow(item.dueDate)})
    </div>
  {/if}

  <div class="mt-4 flex gap-2">
    <button
      onclick={downloadICS}
      class="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
    >
      📅 Save as ICS
    </button>
    <button
      onclick={shareItem}
      class="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
    >
      🔗 Share
    </button>
    <button
      onclick={del}
      class="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
    >
      🗑️ Delete
    </button>
  </div>
</article>
