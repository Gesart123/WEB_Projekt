export async function detectCountry() {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    return data.country_name;
  } catch {
    return 'Unbekannt';
  }
}
