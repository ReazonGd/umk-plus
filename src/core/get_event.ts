import { EventApiResponse, } from "../types";

export interface exception {
  message: string;
  errorcode: string;
  link: string;
  moreinfourl: string;
}

// let M = (global as any).sesskey;
export async function getEvent(): Promise<EventApiResponse.Event[]> {
  const M = localStorage.getItem("umk+sess-token");

  const responses = await fetch("/lib/ajax/service.php?sesskey=" + M + "&info=core_calendar_get_action_events_by_timesort", {
    method: "POST",
    body: JSON.stringify([{
      index: 0,
      methodname: "core_calendar_get_action_events_by_timesort",
      args: {
        timesortfrom: Math.floor(Date.now() / 1000),
        timesortto: 9999999999,   
        limitnum: 50,   // maximum is in 50
        limittononsuspendedevents: true
      }
    }])
  });

  const [body]: EventApiResponse.EventApi = await responses.json();

  if (body.error) {
    throw new Error("misrequest");
  }

  const data = body.data.events
    .sort((a, b) => a.timestart - b.timestart);

  return data;
}