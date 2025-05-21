import { useState, useEffect } from "preact/hooks";
import { getCalender } from "../../utils/get_calendar_event";
import Stat from "./big/stat";
import ScheduleList from "./medium/schedule-list";
import TaskList from "./medium/tasklist";
import Style from "./other/style";
import { classData } from "../../type";
import { getClassList } from "../../utils/get_classlist";
import { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [classList, setClassList] = useState<classData[]>([]);

  const updateTask = () => {
    getCalender().then((data) => {
      setTasks(data);
    });
  };
  useEffect(() => {
    updateTask();

    getClassList().then((data) => {
      setClassList(() => [...data]);
    });

    const interval = setInterval(() => {
      updateTask();
    }, 1000 * 60 * 30);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="dashboard" id="umk-plus">
      <Toaster />
      <Style />
      <Stat classList={classList} tasks={tasks} />
      <div className="task-n-schedule column">
        <TaskList tasks={tasks} />
        <ScheduleList classList={classList} />
      </div>
    </div>
  );
}
