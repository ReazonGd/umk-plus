import { useEffect, useState } from "preact/hooks";
import { CourseTask } from "../../../type";

export default function CourseProgress() {
  const [progress, setProgress] = useState(0);
  const [courseTask, setCourseTask] = useState<CourseTask[]>([]);

  const updateTask = () => {
    const allTask: CourseTask[] = [];
    const allTaskElement = document.querySelectorAll(".togglecompletion");
    allTaskElement.forEach((form: any) => {
      allTask.push({
        id: (form.id as HTMLInputElement).value,
        sesskey: (form.sesskey as HTMLInputElement).value,
        modulename: (form.modulename as HTMLInputElement).value,
        completionstate: (form.completionstate as HTMLInputElement).value,
        formElement: form,
      });
    });
    setCourseTask(allTask);
    const completedTask = allTask.filter((e) => e.completionstate == "0");

    setProgress(Math.floor((completedTask.length / allTask.length) * 100));
    return allTask;
  };

  const chekup_all = async () => {
    for (const task of courseTask) {
      if (task.completionstate == "0") continue;
      const btn = task.formElement.querySelector("button");

      btn.click();
    }
    updateTask();
  };

  useEffect(() => {
    const t = updateTask();
    t.forEach((e) => {
      const element = e.formElement.querySelector('[name="completionstate"]');
      const observer = new MutationObserver((mutations) => {
        updateTask();
      });
      const config = { attributes: true, childList: false, subtree: false };
      observer.observe(element, config);
    });
  }, []);
  return (
    <div className="course-progress">
      <div className="row" style={{ height: "100%" }}>
        <div className="row">
          <h4>
            {courseTask.filter((e) => e.completionstate == "0").length}/{courseTask.length}
          </h4>
          <div className="column gap-0  ">
            <p>Course</p>
            <p>Task</p>
          </div>
        </div>
        <div className="row">
          <button onClick={chekup_all}>Chek All</button>
        </div>
      </div>
      <div className="progress" style={{ "--progress-width": `${progress}%` }}>
        <div className="progress-bar"></div>
      </div>
    </div>
  );
}
