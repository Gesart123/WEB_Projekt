<script>
  import { onMount } from "svelte";

  let country = "";
  let countryCode = "";

  async function getCountry() {
    if (!navigator.geolocation) {
      country = "Geolocation nicht unterstützt";
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
          country = data.address?.country || "Unbekanntes Land";

          if (country !== "Unbekanntes Land") {
            const countryRes = await fetch(
              `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fields=cca2`
            );
            const countryData = await countryRes.json();
            countryCode = countryData[0]?.cca2 || "";
          }
        } catch (err) {
          country = "Fehler beim Laden";
          console.error(err);
        }
      },
      () => {
        country = "Berechtigung verweigert";
      }
    );
  }

  onMount(() => {
    getCountry();
  });
</script>

<header class="w-full bg-white shadow-md p-4 flex items-center justify-between">
  <h1 class="text-xl font-semibold text-gray-800">🌍 My Kanban App</h1>

  <div class="flex items-center gap-3 text-gray-700 text-sm">
    {#if countryCode && country && country !== "Unbekanntes Land" && country !== "Fehler beim Laden" && country !== "Berechtigung verweigert"}
      <img
        src={`https://flagsapi.com/${countryCode}/flat/32.png`}
        alt={`${country} flag`}
        class="w-8 h-8 rounded shadow-sm"
      />
      <span class="font-medium">{country}</span>
    {:else}
      <div class="flex items-center gap-2 text-gray-500">
        <span>📍 {country || "Lädt..."}</span>
      </div>
    {/if}
  </div>
</header>
