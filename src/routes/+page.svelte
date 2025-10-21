<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import Header from '$lib/components/Header.svelte';
  import CreateDialog from '$lib/components/CreateDialog.svelte';
  import Lane from '$lib/components/Lane.svelte';
  import { exportAllCSV } from '$lib/utils/csv.js';
  import { notifyDone, enableNotifications } from '$lib/notifications.js';
  import { LANES, getItems, saveItems } from '$lib/store.js';
  

  let items = $state([]);

  onMount(() => {
    if (browser) {
      items = getItems();

      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
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
    const idx = items.findIndex((i) => i.id === Number(id));
    if (idx === -1) return;
    const prev = items[idx].lane;
    items[idx].lane = targetLane;
    items = [...items];

    if (prev !== 'done' && targetLane === 'done') {
      notifyDone(items[idx]);
    }
  }

  function handleDelete(item) {
    items = items.filter((i) => i.id !== item.id);
  }

  function exportCSV() {
    exportAllCSV(items);
  }

  function getLaneSum(laneId) {
    return items
      .filter((i) => i.lane === laneId)
      .reduce((sum, i) => sum + (i.storyPoints || 0), 0);
  }
</script>

<Header title="Kanban Board" />

<main class="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 font-sans">
  <div
    class="sticky top-0 left-0 z-40 backdrop-blur bg-white/90 border-b border-slate-200 shadow-sm flex items-center justify-between px-6 py-3"
  >
    <CreateDialog onCreate={addItem} />
    <button
      onclick={enableNotifications}
      class="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 hover:shadow transition-all"
    >
      🔔 Enable Notifications
    </button>
    <button
      onclick={exportCSV}
      class="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 hover:shadow transition-all"
    >
      ⬇️ Export CSV
    </button>
  </div>

  <section class="max-w-7xl mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold text-blue-700 mb-4 tracking-tight">
      Project Overview
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
      {#each LANES as lane}
        <div
          class="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-150"
        >
          <div
            class="flex justify-between items-center px-4 py-2.5 bg-blue-50 border-b border-blue-100 rounded-t-2xl"
          >
            <h2 class="text-sm font-semibold text-blue-700 uppercase tracking-wide">
              {lane.title}
            </h2>
            <span class="text-xs text-blue-600 font-medium">
              SP: {getLaneSum(lane.id)}
            </span>
          </div>

          <div class="p-3 flex-1 overflow-y-auto min-h-[250px]">
            <Lane {lane} {items} onDrop={handleDrop} onDelete={handleDelete} />
          </div>
        </div>
      {/each}
    </div>
  </section>
</main>
