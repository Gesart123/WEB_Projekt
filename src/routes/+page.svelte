<script>
import { onMount } from 'svelte';
import { browser } from '$app/environment';
import { exportAllCSV } from '$lib/utils/csv.js';
import { notifyDone } from '$lib/notifications.js';
import Lane from '$lib/Components/Lane.svelte';
import CreateDialog from '$lib/Components/CreateDialog.svelte';

const LANES = ['todo', 'inprogress', 'done'];

let items = $state([]);

onMount(() => {
    if (browser) {
        items = JSON.parse(localStorage.getItem('kanban-items') || '[]');
    }
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js');
    }
});

$effect(() => {
    if (browser && items.length) {  // Skip initial empty
        localStorage.setItem('kanban-items', JSON.stringify(items));
    }
});

function addItem(item) {
    items = [item, ...items];
}

function handleDrop({ id, targetLane }) {
    const idx = items.findIndex(i => i.id === Number(id));
    if (idx === -1) return;
    const prev = items[idx].lane;
    items[idx].lane = targetLane;
    if (prev !== 'done' && targetLane === 'done') notifyDone(items[idx]);
}

function handleDelete(item) {
    items = items.filter(i => i.id !== item.id);
}

function exportCSV() {
    exportAllCSV(items);
}
</script>

    <createdialog oncreate="{addItem}">
    <button onclick="{exportCSV}" class="rounded-xl px-3 py-2 border border-slate-300 hover:bg-slate-100">
      CSV Export
    </button>
  </createdialog>
  
    {#each LANES as lane}
      <Lane lane="do" items="" ondrop={handleDrop} ondelete={handleDelete}/>
    {/each}
