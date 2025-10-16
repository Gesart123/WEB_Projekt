<script>
  import Card from './Card.svelte';

  const { lane, items, onDelete, onDrop } = props();

  const list = $derived(items.filter(i => i.lane === lane.id));
  const totalSP = $derived(list.reduce((s, i) => s + (Number(i.storyPoints) || 0), 0));

  function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    onDrop?.({ id, targetLane: lane.id });
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
  ondragover={(e) => e.preventDefault()}
  ondrop={drop}
  class="bg-white rounded-2xl shadow-sm border border-slate-200 p-3 flex flex-col min-h-[300px]"
>
  <div class="flex items-center justify-between mb-2">
    <h3 class="font-semibold">{lane.title}</h3>
    <span class="text-xs px-2 py-1 rounded-full bg-slate-100 border">
      SP: <strong>{totalSP}</strong>
    </span>
  </div>

  <div class="space-y-3 flex-1">
    {#each list as it (it.id)}
      <Card {it} onDelete={(e) => onDelete?.(e.detail)} />
    {/each}
  </div>
</section>
