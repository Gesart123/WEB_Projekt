<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import CreateDialog from '$lib/components/CreateDialog.svelte';
  import Lane from '$lib/components/Lane.svelte';
  import { exportAllCSV } from '$lib/utils/csv.js';
  import { notifyDone } from '$lib/notifications.js';
  import { LANES, getItems, saveItems } from '$lib/store.js';

  let items = $state([]);
  let country = $state('Unbekannt');

  onMount(async () => {
  if (browser) {
    items = getItems();
    try {
      const res = await fetch('https://country.is/');
      const data = await res.json();
      country = data.country || 'AL'; 
    } catch (err) {
      country = 'AL';
    }
  }
});


  $effect(() => {
    if (browser && items.length > 0) {
      saveItems(items);
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
    items = [...items]; // Trigger reactivity
    if (prev !== 'done' && targetLane === 'done') notifyDone(items[idx]);
  }

  function handleDelete(item) {
    items = items.filter(i => i.id !== item.id);
  }

  function exportCSV() {
    exportAllCSV(items);
  }

  function getLaneSum(laneId) {
    return items.filter(i => i.lane === laneId).reduce((sum, i) => sum + (i.storyPoints || 0), 0);
  }
</script>

<header class="p-4 bg-gray-800 text-white flex justify-between items-center text-lg font-semibold">
  <h1>Kanban Board</h1>
  <span>Land: {country}</span>
</header>

<main  class="max-w-6xl mx-auto px-4 py-6 space-y-4 bg-gray-100 min-h-screen font-sans">
  <div class="flex items-center justify-between">
    <CreateDialog onCreate={addItem} />
    <button onclick={exportCSV} class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors">
      CSV Export
    </button>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    {#each LANES as lane}
      <div class="relative">
        <Lane {lane} {items} onDrop={handleDrop} onDelete={handleDelete} />
        <div class="text-right text-sm text-gray-600 mt-2">Sum: {getLaneSum(lane.id)}</div>
      </div>
    {/each}
  </div>
</main>