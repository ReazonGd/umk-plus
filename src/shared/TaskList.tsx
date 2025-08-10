import { PackageOpen } from "lucide-preact";
import { CalenderEvent } from "../types";
import TaskCard from "../features/sunan/CourseView/components/TaskCard";

export default function TaskList({ tasks }: { tasks: CalenderEvent[] }) {
  return (
    <div className="task-list">
      <b>{tasks.length} Task is due</b>
      {tasks.length > 0 ? (
        <div className="overflow row">
          <div className="row">
            {tasks
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
