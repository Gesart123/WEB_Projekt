<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import CreateDialog from '$lib/components/CreateDialog.svelte';
  import Lane from '$lib/components/Lane.svelte';
  import { exportAllCSV } from '$lib/utils/csv.js';
  import { notifyDone } from '$lib/notifications.js';  

  const LANES = ['do', 'doing', 'done', 'archiv'];

  let items = $state([]);
  let country = $state('Unbekannt');

  onMount(async () => {
    if (browser) {
      items = JSON.parse(localStorage.getItem('kanban-items') || '[]');
      const res = await fetch('https://country.is/');
      const data = await res.json();
      country = data.country || 'Unbekannt';
    }
  });

  $effect(() => {
    if (browser && items.length > 0) {
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

  function getLaneSum(lane) {
    return items.filter(i => i.lane === lane).reduce((sum, i) => sum + (i.storyPoints || 0), 0);
  }
</script>

<header class="p-4 bg-gray-800 text-white flex justify-between">
  <h1>Kanban Board</h1>
  <span>Land: {country}</span>
</header>

<main class="max-w-6xl mx-auto px-4 py-6 space-y-4">
  <div class="flex items-center justify-between">
    <CreateDialog onCreate={addItem} />
    <button onclick={exportCSV} class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
      CSV Export
    </button>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    {#each LANES as lane}
      <Lane {lane} {items} onDrop={handleDrop} onDelete={handleDelete}>
        <div class="text-right">Sum: {getLaneSum(lane)}</div>
      </Lane>
    {/each}
  </div>
</main>

<style>
  /* Elegantes Design: Dunkelgrau, saubere Abstände, sans-serif */
  :global(body) { font-family: Arial, sans-serif; background: #f0f0f0; }
  header { font-size: 1.2rem; }
  button { transition: background 0.2s; }
</style>