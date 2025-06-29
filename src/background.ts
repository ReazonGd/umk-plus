import { CalenderEvent, localExtensionStorageName } from "./type";
import Mlog from "./utils/fancy_log";
import extensionStorage from "./utils/localExtensionStorage";

/**
CANCELED


Notif types:
- Due Notif: 1h, overdue. 
*/

const app = chrome || browser;

async function show_notif(title: string, message: string) {
  const notif_preference = await extensionStorage.get(localExtensionStorageName.enable_notif);
  if (notif_preference === String(false)) return;
  await app.notifications.create({
    message,
    title,
    type: "basic",
    iconUrl: "/assets/icons/128.png",
  });
}

async function clearAlaram() {
  return await app.alarms.clearAll();
}

async function predictAlaram() {
  const saved_calenderEvent = await extensionStorage.get(localExtensionStorageName.saved_calender);
  if (!saved_calenderEvent) return;
  const calende_event: CalenderEvent[] = JSON.parse(saved_calenderEvent);
  if (calende_event.length < 1) return;
}

app.runtime.onStartup.addListener(() => {
  // show_notif("umk+", "hello world");
});
