import Stat from "./Stat";
import ScheduleList from "./ScheduleList";
import Style from "@/shared/style";
import { Toaster } from "react-hot-toast";
import { ClassListProvider } from "../context/ClassListSunan";
import { EventsProvider } from "../context/EventsSunan";
import { EventsList } from "./events";

export default function Dashboard() {
  return (
    <div className="dashboard" id="umk-plus">
      <EventsProvider>
        <ClassListProvider>
          <Toaster />
          <Style />
          <Stat />
          <div className="task-n-schedule column">
            <EventsList />
            <ScheduleList />
          </div>
        </ClassListProvider>
      </EventsProvider>
    </div>
  );
}
