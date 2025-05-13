import { CalenderEvent } from "../../../type";

export default function TaskCard({ task }: { task: CalenderEvent }) {
  const date = new Date(task.timestart * 1000);
  return (
    <div className="column task-card">
      <div className="column gap-0">
        <a className="title line-clamp" href={task.view_url || task.viewurl}>
          {task.name}
        </a>
        <p className="class-name line-clamp">{task.course.fullname}</p>
      </div>
      <div className="row-line"></div>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <p className="remaining-time">{task.remaining_time}</p>
        <p className="date time row">
          {date.toLocaleDateString("id", { day: "2-digit", month: "short" }).toString()}

          {date.toLocaleTimeString("id", { hour: "2-digit", minute: "2-digit" }).replace(".", ":")}
        </p>
      </div>
    </div>
  );
}
