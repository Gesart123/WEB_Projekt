<script>
  import Card from './Card.svelte';

  let { lane, items, onDrop, onDelete, header } = $props();
  const filteredItems = $derived(items.filter(i => i.lane === lane.id));

  function handleDragOver(e) { e.preventDefault(); }
  function handleDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    onDrop({ id, targetLane: lane.id });
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="p-4 bg-white rounded shadow" ondragover={handleDragOver} ondrop={handleDrop}>
  <h2 class="font-bold mb-2">{lane.title}</h2>
  {#each filteredItems as item (item.id)}
    <Card {item} onDelete={onDelete} />
  {/each}
</div>