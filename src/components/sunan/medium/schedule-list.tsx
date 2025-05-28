import { useEffect, useState } from "preact/hooks";
import { classData, Dayname, days, Schedule } from "../../../type";
import ScheduleCard from "../small/shcedule-card";
import useLocalExtensionStorage from "../../../utils/useLocalExtensionStorage";
import { Fragment } from "preact/jsx-runtime";
import { Import } from "lucide-preact";
import { getClassList } from "../../../utils/get_classlist";
import { sortScheduleAndClasses } from "../../../utils/grouping_course";

export default function ScheduleList({ classList }: { classList: classData[] }) {
  const currentDate = new Date();
  const day = days[currentDate.getDay()];

  const [curent_day_class_list, set_curent_day_class_list] = useState<classData[]>([]);
  const [schedule, setSchedules] = useState<Schedule[]>([]);
  const [schedule_storage] = useLocalExtensionStorage("schedule", "[]");
  const [day_choice, set_day_choice] = useState("");

  useEffect(() => {
    const scedules: Schedule[] = JSON.parse(schedule_storage);

    setSchedules(scedules);
  }, [schedule_storage]);

  useEffect(() => {
    const currentDayIndex = days.indexOf(day);
    const reorderedDays = [...days.slice(currentDayIndex), ...days.slice(0, currentDayIndex)];
    set_day_choice(reorderedDays[0]);
  }, []);

  useEffect(() => {
    if (!schedule) return;

    const groubedItem = sortScheduleAndClasses(day_choice as Dayname, schedule, classList);
    switch (day_choice) {
      case "other":
        set_curent_day_class_list(groubedItem.find((e) => e.day_name == "none").classData);
        break;
      case "senin":
      case "selasa":
      case "rabu":
      case "kamis":
      case "jumat":
      case "sabtu":
        set_curent_day_class_list(groubedItem.find((e) => e.day_name == day_choice).classData);
        break;
      default:
        set_curent_day_class_list(classList);
        break;
    }
  }, [classList, day_choice, schedule]);
  return (
    <div className="schedule-list" style={{ position: "relative" }}>
      {schedule.length === 0 ? (
        <div className="no-schedule">
          <Import size={24} />
          <p>
            Import your schedule first at <a href="https://kanal.umk.ac.id/mahasiswa/jadwalkuliah">Here.</a>
          </p>
        </div>
      ) : (
        <Fragment>
          <div className="days-selection row">
            <p className={`day-choice ${day_choice === "All" ? "active" : ""}`} onClick={() => set_day_choice("All")}>
              All
            </p>
            <div className="column-line"></div>
            {["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "other"].map((e, key) => (
              <p key={key} className={`day-choice ${day_choice === e ? "active" : ""}`} onClick={() => set_day_choice(e)}>
                {e}
              </p>
            ))}
          </div>
          <div className="overflow column schedule-list-container">
            {curent_day_class_list.map((e, key) => (
              <ScheduleCard classData={e} schedule={schedule} />
            ))}

            <div style={{ height: "100px", width: "100%" }}></div>
          </div>
          <div className="gradient-bottom" style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "50px", background: "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgb(255, 255, 255))", zIndex: 1000 }}></div>
        </Fragment>
      )}
    </div>
  );
}
