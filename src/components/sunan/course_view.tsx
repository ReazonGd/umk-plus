import { useEffect, useState } from "preact/hooks";
import { CalenderEvent } from "../../type";
import Style from "./other/style";
import CourseDetailCard from "./small/course-detail-card";
import CourseProgress from "./small/course-progress";
import { getCalender } from "../../utils/client/get_calendar_event";
import TaskList from "./medium/tasklist";
import inject_check_per_selection from "../../utils/client/inject_chek_perselection";
import { Toaster } from "react-hot-toast";
import convert_class_to_code from "../../utils/convert_class_to_code";

export default function CourseView() {
  const [calenderEvent, setCalenderEvent] = useState<CalenderEvent[]>([]);

  useEffect(() => {
    inject_check_per_selection();
    getCalender().then((e) => {
      const course_title = document.querySelector("#page-header > div:nth-child(1) > div > div > div.d-flex.align-items-center > div.mr-auto > div > div > h1")?.textContent ?? "";
      const course_code = convert_class_to_code(course_title);
      setCalenderEvent(e.filter((e) => convert_class_to_code(e.course.fullname) == course_code));
    });
  }, []);
  return (
    <div className="course-view" id="umk-plus">
      <Style />
      <div className="detail-n-progress">
        <CourseDetailCard />
        <CourseProgress />
      </div>
      <TaskList tasks={calenderEvent} />
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}
