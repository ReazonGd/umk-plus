import { Fragment } from "preact/jsx-runtime";
import { classData, Schedule } from "../../../type";

export default function ScheduleCard({ classData, schedule }: { classData: classData; schedule: Schedule[] }) {
  const schedule_time = schedule.find((e) => e.code + e.class === classData.code);

  return (
    <div className="column schedule-card">
      <div className="column class-info gap-0">
        <div className="class-code">{classData.code}</div>
        <a href={classData.viewurl} className="class-name line-clamp">{classData.fullname}</a>
      </div>
      {schedule_time && (
        <Fragment>
          <div className="row-line"></div>
          {schedule_time?.scedule.map((schedule, k) => (
            <div className="row" style={{ justifyContent: "space-between" }}>
              <p className="room-code">{schedule.room_code}</p>
              <div className="schedule row">
                <div className="from">{schedule.start}</div>
                {">"}
                <div className="to">{schedule.end}</div>
              </div>
            </div>
          ))}
        </Fragment>
      )}
    </div>
  );
}
