<script>
  import Card from './Card.svelte';
 
  let { lane, items, onDrop, onDelete } = $props();
  const filteredItems = $derived(items.filter(i => i.lane === lane.id));
 
  let dragOver = $state(false);
 
  function handleDragOver(e) {
    e.preventDefault();
    dragOver = true;
  }
 
  function handleDragLeave(e) {
    dragOver = false;
  }
 
  function handleDrop(e) {
    e.preventDefault();
    dragOver = false;
    const id = e.dataTransfer.getData('text/plain');
    onDrop({ id, targetLane: lane.id });
  }
</script>
 
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="p-4 bg-white rounded-lg shadow-md min-h-[200px] transition-colors {dragOver ? 'bg-blue-50 ring-2 ring-blue-300' : ''}"
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
>
  <h2 class="font-bold mb-2">{lane.title}</h2>
  <div class="space-y-3">
    {#each filteredItems as item (item.id)}
      <Card {item} onDelete={onDelete} />
    {/each}
  </div>
</div>
 