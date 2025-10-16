<script>
  let { lane, items, onDrop, onDelete, children } = $props();  // children für Sum
  const filteredItems = $derived(items.filter(i => i.lane === lane));

  function handleDragOver(e) { e.preventDefault(); }
  function handleDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    onDrop({ id, targetLane: lane });
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="p-4 bg-white rounded shadow" ondragover={handleDragOver} ondrop={handleDrop}>
  <h2 class="font-bold mb-2">{lane.toUpperCase()}</h2>
  {@html children} 
  {#each filteredItems as item (item.id)}
    <Item {item} onDelete={onDelete} />
  {/each}
</div>