import { browser } from '$app/environment';

export async function enableNotifications() {
  if (!browser || !('Notification' in window)) {
    console.warn('Notifications not supported in this browser.');
    return;
  }

  try {
    const result = await Notification.requestPermission();
    console.log('Permission:', result);

    if (result === 'granted') {
      new Notification('✅ Notifications enabled', {
        body: 'You’ll now get updates when tasks move to Done.',
        silent: false,
      });
    } else if (result === 'denied') {
      alert('Notifications are blocked. Please allow them in your browser settings.');
    }
  } catch (err) {
    console.error('Notification permission error:', err);
  }
}

export function notifyDone(item) {
  if (!browser || !('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  new Notification(`✅ ${item.title} moved to Done`, {
    body: item.description || 'Task completed!',
    silent: false,
  });
}
