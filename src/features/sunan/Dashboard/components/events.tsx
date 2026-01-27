import TaskList from "@/shared/TaskList";
import { useEventContext } from "../context/EventsSunan";

export function EventsList() {
  const [tasks] = useEventContext();

  return <TaskList tasks={tasks} />;
}
