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
    if (!item.title) return alert('Title is required');
    onCreate(item);
    e.target.reset();
    open = false;
  }
</script>

<!-- Button -->
<button
  onclick={() => open = true}
  class="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 hover:shadow transition-all"
>
  ➕ New Issue
</button>

<!-- Modal -->
{#if open}
  <div class="top-70 left-140 fixed inset-0 bg-black/20 flex items-center justify-center z-50">
    <dialog
      open
      class="p-6 bg-white rounded-2xl shadow-xl w-full max-w-md border border-blue-100"
    >
      <h3 class="text-lg font-semibold text-blue-700 mb-4">Create New Issue</h3>

      <form onsubmit={submit} class="space-y-3">
        <input
          name="title"
          required
          placeholder="Enter title..."
          class="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="description"
          placeholder="Description (optional)"
          rows="3"
          class="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>

        <div class="flex gap-2">
          <input
            type="date"
            name="dueDate"
            class="flex-1 p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            name="storyPoints"
            min="0"
            value="1"
            class="w-24 p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <select
          name="priority"
          class="w-full p-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-400"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <div class="flex justify-end gap-2 pt-3">
          <button
            type="button"
            onclick={() => open = false}
            class="px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            Create
          </button>
        </div>
      </form>
    </dialog>
  </div>
{/if}
