export function notifyDone(item) {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    new Notification('✅ Erledigt', { body: item.title });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(p => {
      if (p === 'granted') new Notification('✅ Erledigt', { body: item.title });
    });
  }
}
