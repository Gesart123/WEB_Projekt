<script>
  import { onMount } from "svelte";

  let country = "";
  let countryCode = "";
  let status = "Detecting location...";

  async function getCountry() {
    if (!navigator.geolocation) {
      status = "Geolocation not supported";
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          country = data.address?.country || "Unknown country";

          if (country && country !== "Unknown country") {
            const countryRes = await fetch(
              `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fields=cca2`
            );
            const countryData = await countryRes.json();
            countryCode = countryData[0]?.cca2 || "";
            status = "";
          } else {
            status = "Unknown country";
          }
        } catch (err) {
          status = "Error loading location";
          console.error(err);
        }
      },
      () => {
        status = "Location permission denied";
      }
    );
  }

  onMount(() => {
    getCountry();
  });
</script>

<header
  class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md p-4 flex items-center justify-between rounded-b-2xl"
>
  <h1 class="text-xl font-semibold tracking-wide flex items-center gap-2">
    <span class="text-2xl">🗂️</span> My Kanban App
  </h1>

  <div class="flex items-center gap-3 text-sm">
    {#if countryCode && country && !status}
      <div class="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
        <img
          src={`https://flagsapi.com/${countryCode}/flat/32.png`}
          alt={`${country} flag`}
          class="w-6 h-6 rounded-full shadow-sm border border-white/30"
        />
        <span class="font-medium text-white drop-shadow-sm">{country}</span>
      </div>
    {:else}
      <div class="flex items-center gap-2 text-white/80 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
        <span>📍 {status}</span>
      </div>
    {/if}
  </div>
</header>
