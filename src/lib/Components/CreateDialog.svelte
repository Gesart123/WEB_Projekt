<script>
  let { onCreate } = $props();
  let open = $state(false);

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
    if (!item.title) return alert('Titel erforderlich');
    onCreate(item);
    e.target.reset();
    open = false;
  }
</script>

<button onclick={() => open = true} class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
  Neues Issue
</button>

{#if open}
  <dialog open class="p-6 bg-white rounded shadow-lg max-w-md">
    <form onsubmit={submit} class="space-y-4">
      <input name="title" required placeholder="Titel" class="w-full p-2 border rounded" />
      <textarea name="description" placeholder="Beschreibung" class="w-full p-2 border rounded"></textarea>
      <input type="date" name="dueDate" class="p-2 border rounded" />
      <input type="number" name="storyPoints" min="0" value="1" class="p-2 border rounded" />
      <select name="priority" class="p-2 border rounded">
        <option value="low">Niedrig</option>
        <option value="medium">Mittel</option>
        <option value="high">Hoch</option>
      </select>
      <div class="flex justify-end gap-2">
        <button type="button" onclick={() => open = false} class="px-4 py-2 bg-gray-200 rounded">Abbrechen</button>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Anlegen</button>
      </div>
    </form>
  </dialog>
{/if}

<style>
  dialog { border: none; }
</style>