<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import Header from '$lib/components/Header.svelte';
  import CreateDialog from '$lib/components/CreateDialog.svelte';
  import Lane from '$lib/components/Lane.svelte';
  import { exportAllCSV } from '$lib/utils/csv.js';
  import { notifyDone } from '$lib/notifications.js';
  import { LANES, getItems, saveItems } from '$lib/store.js';

  let items = $state([]);

  onMount(() => {
    if (browser) {
      items = getItems();
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
    items = [...items];
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

<Header title="Kanban Board" />

<main class="max-w-6xl mx-auto px-4 py-6 space-y-4 bg-gray-100 min-h-screen font-sans">
  <div class="flex items-center justify-between">
    <CreateDialog onCreate={addItem} />
    <button on:click={exportCSV} class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors">
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
