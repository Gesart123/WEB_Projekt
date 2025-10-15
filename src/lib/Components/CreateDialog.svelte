<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let open = false;

  function submit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const now = new Date();
    const item = {
      id: Date.now(),
      title: fd.get('title'),
      description: fd.get('description'),
      creationDate: now.toISOString(),
      dueDate: fd.get('dueDate'),
      storyPoints: Number(fd.get('storyPoints') || 0),
      priority: fd.get('priority'),
      lane: 'do'
    };
    dispatch('create', item);
    e.target.reset();
    open = false;
  }
</script>

<button onclick={() => (open = true)} class="rounded-xl px-3 py-2 bg-slate-900 text-white">
  Neues Issue
</button>

{#if open}
  <dialog open class="rounded-2xl shadow-2xl w-[min(92vw,560px)]">
    <form class="p-4 space-y-3" onsubmit={submit}>
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold">Neues Issue</h2>
        <button type="button" class="border px-2 py-1 rounded" onclick={() => (open = false)}>×</button>
      </div>

      <input
        name="title"
        required
        placeholder="Titel"
        class="w-full border rounded px-3 py-2"
      />
      <textarea
        name="description"
        placeholder="Beschreibung"
        class="w-full border rounded px-3 py-2"
      ></textarea>

      <div class="grid grid-cols-3 gap-2">
        <input type="date" name="dueDate" class="border rounded px-3 py-2" />
        <input type="number" name="storyPoints" min="0" step="1" value="1" class="border rounded px-3 py-2" />
        <select name="priority" class="border rounded px-3 py-2">
          <option value="low">Niedrig</option>
          <option value="medium" selected>Mittel</option>
          <option value="high">Hoch</option>
        </select>
      </div>

      <div class="flex justify-end gap-2 pt-2">
        <button type="button" class="border px-3 py-2 rounded" onclick={() => (open = false)}>Abbrechen</button>
        <button class="bg-slate-900 text-white px-3 py-2 rounded">Anlegen</button>
      </div>
    </form>
  </dialog>
{/if}
