import { formatRemainingTime } from "@/lib/format_time";
import { generateGoogleCalendarLink } from "@/lib/google-calendar-link";
import { EventApiResponse, GoogleCalendarEventParams } from "@/types";
import { SquareArrowOutUpRight } from "lucide-preact";

export default function TaskCard({ task }: { task: EventApiResponse.Event }) {
  const date = new Date(task.timestart * 1000);
  const link = task.url || task.viewurl;

  const googleCalendarData: GoogleCalendarEventParams = {
    startDate: new Date(),
    title: `${task.name} - ${task.course.fullname}`,
    description: task.description,
    endDate: date,
  };
  return (
    <div className="column task-card">
      <div className="column gap-0">
        <h2 className="title line-clamp">{task.name}</h2>
        <p className="class-name line-clamp">{task.course.fullname}</p>
      </div>
      <div className="row" style={{ alignItems: "center" }}>
        <SquareArrowOutUpRight size={16} onClick={() => window.open(link)}></SquareArrowOutUpRight>
        <a href={generateGoogleCalendarLink(googleCalendarData)}>
          <img
            width="16px"
            height="16px"
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTU5IDBDNjEuNzYxNCAwIDY0IDIuMjM4NTggNjQgNVY0OUg0OVY2NEg1QzIuMjM4NTggNjQgMCA2MS43NjE0IDAgNTlWNUMwIDIuMjM4NTggMi4yMzg1OCAwIDUgMEg1OVoiIGZpbGw9IiM0Mjg1RjQiLz4KPHJlY3QgeD0iMTUiIHk9IjE1IiB3aWR0aD0iMzQiIGhlaWdodD0iMzQiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik00OSAwSDU5QzYxLjc2MTQgMCA2NCAyLjIzODU4IDY0IDVWMTVINDlWMFoiIGZpbGw9IiMxOTY3RDIiLz4KPHBhdGggZD0iTTE1IDY0TDUgNjRDMi4yMzg1OCA2NCAxLjk1NzAzZS0wNyA2MS43NjE0IDQuMzcxMTRlLTA3IDU5TDEuMzExMzRlLTA2IDQ5TDE1IDQ5TDE1IDY0WiIgZmlsbD0iIzE4ODAzOCIvPgo8cmVjdCB4PSIxNSIgeT0iNDkiIHdpZHRoPSIzNCIgaGVpZ2h0PSIxNSIgZmlsbD0iIzM0QTg1MyIvPgo8cmVjdCB4PSI2NCIgeT0iMTUiIHdpZHRoPSIzNCIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNjQgMTUpIiBmaWxsPSIjRkJCQzA0Ii8+CjxwYXRoIGQ9Ik00OSA0OUg2NEw0OSA2NFY0OVoiIGZpbGw9IiNGNzJBMjUiLz4KPHBhdGggZD0iTTI5LjU5MDkgNDIuMDExNFYyMy4yNjE0SDMyLjc3MjdWNDIuMDExNEgyOS41OTA5Wk0yMS44MDY4IDM0LjIyNzNWMzEuMDQ1NUg0MC41NTY4VjM0LjIyNzNIMjEuODA2OFoiIGZpbGw9IiM0QjdDQkMiLz4KPC9zdmc+Cg=="
            alt=""
          />
        </a>

        {/* for popup */}
        <a href={link}></a>
      </div>
      <div className="row-line"></div>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <p className="remaining-time">{formatRemainingTime(new Date(task.timestart * 1000))}</p>
        <p className="date time row">
          {date.toLocaleDateString("id", { day: "2-digit", month: "short" }).toString()}{" "}
          {date.toLocaleTimeString("id", { hour: "2-digit", minute: "2-digit" }).replace(".", ":")}
        </p>
      </div>
    </div>
  );
}
