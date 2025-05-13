import { BookMarked, Hash, UserSquare2 } from "lucide-preact";
import { Schedule } from "../../../type";
import { useEffect, useState } from "preact/hooks";
import useLocalExtensionStorage from "../../../utils/useLocalExtensionStorage";
import { Fragment } from "preact/jsx-runtime";
import convert_class_to_code from "../../../utils/convert_class_to_code";

export default function CourseDetailCard() {
  const [scheduleStorage] = useLocalExtensionStorage("schedule", "");
  const [schedule, setSchedule] = useState<Schedule | null>(null);

  useEffect(() => {
    if (!scheduleStorage) return;
    const course_title = document.querySelector("#page-header > div:nth-child(1) > div > div > div.d-flex.align-items-center > div.mr-auto > div > div > h1")?.textContent ?? "";
    const course_code = convert_class_to_code(course_title);

    if (!course_code) return;
    const courseSchedule = JSON.parse(scheduleStorage).find((e: Schedule) => e.code + e.class == course_code);
    setSchedule(courseSchedule);
  }, [scheduleStorage]);

  return (
    <div className="course-detail column">
      <b>Course Detail</b>
      {schedule ? (
        <Fragment>
          <table>
            <tr>
              <td className="row">
                <Hash size={16} />
                <span>Course Code</span>
              </td>
              <td>{schedule.code}</td>
            </tr>
            <tr>
              <td className="row">
                <BookMarked size={16} />
                <span> SKS</span>
              </td>
              <td>{schedule.sks}</td>
            </tr>
            <tr>
              <td className="row">
                <UserSquare2 size={16} />
                <span>Dosen</span>
              </td>
              <td>{schedule.dosen}</td>
            </tr>
          </table>
          <div className="row-line"></div>
          {(schedule.scedule || []).map((item) => (
            <div className="row" style={{ justifyContent: "space-between" }}>
              <p>{item.room_code}</p>
              <p>
                {item.start} {">"} {item.end}
              </p>
            </div>
          ))}
        </Fragment>
      ) : (
        <p>No Information Found</p>
      )}
    </div>
  );
}
