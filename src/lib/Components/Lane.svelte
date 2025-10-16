<script>
  import Card from './Card.svelte';
  import { createEventDispatcher } from 'svelte';
  export let lane;
  export let items = [];
  const dispatch = createEventDispatcher();

  $: list = items.filter(i => i.lane === lane.id);
  $: totalSP = list.reduce((sum, it) => sum + (Number(it.storyPoints) || 0), 0);

  function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    dispatch('dropped', { id, targetLane: lane.id });
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
  on:dragover|preventDefault
  on:drop={drop}
  class="bg-white rounded-2xl shadow-sm border border-slate-200 p-3 flex flex-col min-h-[300px]"
>
  <div class="flex items-center justify-between mb-2">
    <h3 class="font-semibold">{lane.title}</h3>
    <span class="text-xs px-2 py-1 rounded-full bg-slate-100 border">SP: <strong>{totalSP}</strong></span>
  </div>

  <div class="space-y-3 flex-1">
    {#each list as it (it.id)}
      <Card {it} ondelete={(e) => dispatch('delete', e.detail)} />
    {/each}
  </div>
</section>
