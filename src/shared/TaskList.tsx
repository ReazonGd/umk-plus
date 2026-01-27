import { PackageOpen } from "lucide-preact";
import { EventApiResponse } from "../types";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks }: { tasks: EventApiResponse.Event[] }) {
  return (
    <div className="task-list">
      <b>{tasks.length} Task is due</b>
      {tasks.length > 0 ? (
        <div className="overflow row">
          <div className="row">
            {tasks
              // .filter((e) => formatRemainingTime(new Date(e.timestart * 1000)) != 'Time has passed')
              .sort(({ timestart: a }, { timestart: b }) => a - b)
              .map((task) => (
                <TaskCard task={task} />
              ))}
          </div>
        </div>
      ) : (
        <div className="no-task">
          <PackageOpen size={24} />
          <p>No task is due</p>
        </div>
      )}
    </div>
  );
}
