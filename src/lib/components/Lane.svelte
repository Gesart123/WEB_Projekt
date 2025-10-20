<script>
  import Card from "./Card.svelte";

  let { lane, items, onDrop, onDelete } = $props();
  const filteredItems = $derived(items.filter(i => i.lane === lane.id));

  let dragOver = $state(false);

  function handleDragOver(e) {
    e.preventDefault();
    dragOver = true;
  }

  function handleDragLeave() {
    dragOver = false;
  }

  function handleDrop(e) {
    e.preventDefault();
    dragOver = false;
    const id = e.dataTransfer.getData("text/plain");
    onDrop({ id, targetLane: lane.id });
  }
</script>

<!-- Lane Container -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="flex flex-col bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm transition-all duration-150
  {dragOver ? 'bg-blue-50 border-blue-300 shadow-md scale-[1.01]' : 'hover:shadow-md'}"
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
>
  <!-- Lane Title -->
  <h2
    class="font-semibold text-blue-700 text-sm uppercase tracking-wide mb-3 border-b border-blue-100 pb-1"
  >
    {lane.title}
  </h2>

  <!-- Items -->
  <div class="flex flex-col gap-3">
    {#if filteredItems.length > 0}
      {#each filteredItems as item (item.id)}
        <Card {item} onDelete={onDelete} />
      {/each}
    {:else}
      <p class="text-center text-slate-400 text-sm py-4 italic">
        No items here yet
      </p>
    {/if}
  </div>
</div>
