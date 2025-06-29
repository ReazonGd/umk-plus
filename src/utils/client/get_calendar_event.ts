import { CalenderEvent, localExtensionStorageName } from "../../type";
import extensionStorage from "../localExtensionStorage";

export interface exception {
  message: string;
  errorcode: string;
  link: string;
  moreinfourl: string;
}

// let M = (global as any).sesskey;
export async function getCalender(): Promise<CalenderEvent[]> {
  const M = localStorage.getItem("umk+sess-token");

  const responses = await fetch("/lib/ajax/service.php?sesskey=" + M + "&info=core_calendar_get_action_events_by_timesort", {
    method: "POST",
    body: JSON.stringify([
      {
        index: 0,
        methodname: "core_calendar_get_action_events_by_timesort",
        args: {
          limitnum: 6,
          limittononsuspendedevents: true,
          timesortfrom: 0,
        },
      },
    ]),
  });

  const [body]: { error: boolean; exception?: exception; data: { events: CalenderEvent[] } }[] = await responses.json();

  if (body.error) {
    throw new Error("misrequest");
  }

  // let data = body.data.events;
  // console.log(data, body);

  const data = body.data.events
    .map((v: CalenderEvent) => ({
      ...v,
      // view_url: v.description ? new DOMParser().parseFromString(v.description, "text/html").querySelector("a")?.href ?? "" : "",
      view_url: `https://sunan.umk.ac.id/mod/${v.modulename}/view.php?id=${v.instance}`,
      remaining_time: formatRemainingTime(new Date(v.timestart * 1000)),
    }))
    .sort((a, b) => a.timestart - b.timestart);

  setCalenderEvent2Storage(data);
  return data;
}

function formatRemainingTime(date: Date): string {
  const now = new Date();

  const diff = date.getTime() - now.getTime();

  if (diff <= 0) return "Time has passed";

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} Day`;
  } else if (hours > 0) {
    return `${hours} Hour`;
  } else if (minutes > 0) {
    return `${minutes} minute`;
  } else {
    return `${seconds} secon`;
  }
}

export async function setCalenderEvent2Storage(data: CalenderEvent[]) {
  return await extensionStorage.set(localExtensionStorageName.saved_calender, JSON.stringify(data));
}
