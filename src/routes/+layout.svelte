<script>
  import { onMount } from 'svelte';
  import { detectCountry } from '$lib/geo.js';

  let country = '–';
  onMount(async () => { country = await detectCountry(); });
</script>

<div class="min-h-screen flex flex-col bg-slate-50 text-slate-800">
  <header class="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img src="/icons/icon-192.png" alt="Logo" class="w-8 h-8 rounded" />
        <h1 class="text-2xl font-semibold tracking-tight">Kanban Board</h1>
      </div>
    </div>
  </header>

  <slot />

  <footer class="border-t border-slate-200 py-4 mt-auto">
    <div class="max-w-6xl mx-auto px-4 text-sm text-slate-600 flex items-center justify-between">
      <span>Land: <strong>{country}</strong></span>
      <span class="opacity-70">© {new Date().getFullYear()} Kanban PWA</span>
    </div>
  </footer>
</div>
