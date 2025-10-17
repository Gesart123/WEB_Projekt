<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  export let title = 'Kanban Board';

  let country = 'Loading...';
  let countryCode = '';
  let flag = '🏳️';

  async function getCountry() {
    if (!navigator.geolocation) {
      country = 'Geolocation not supported';
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
          country = data.address?.country || 'Unknown country';

          if (country !== 'Unknown country') {
            const countryRes = await fetch(
              `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fields=cca2`
            );
            const countryData = await countryRes.json();
            countryCode = countryData?.[0]?.cca2 || '';
            if (countryCode) flag = countryCodeToFlag(countryCode);
          }
        } catch (err) {
          console.error('Error fetching country info:', err);
          country = 'Failed to fetch country';
          flag = '🏳️';
        }
      },
      (err) => {
        console.warn('Geolocation denied or error:', err);
        country = 'Permission denied';
        flag = '🚫';
      }
    );
  }

  function countryCodeToFlag(code) {
    if (!code) return '🏳️';
    return code
      .toUpperCase()
      .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
  }

  onMount(() => {
    if (browser) getCountry();
  });
</script>

<header class="p-4 bg-gray-800 text-white flex justify-between items-center text-lg font-semibold">
  <h1>{title}</h1>
  <span class="flex items-center gap-2">
    <span class="text-2xl">{flag}</span>
    <span>{country}</span>
  </span>
</header>
