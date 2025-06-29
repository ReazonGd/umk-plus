import { classData } from "../../type";
import convert_class_to_code from "../convert_class_to_code";

export interface exception {
  message: string;
  errorcode: string;
  link: string;
  moreinfourl: string;
}

// let M = (global as any).sesskey;
export async function getClassList() {
  const M = localStorage.getItem("umk+sess-token");

  const responses = await fetch("/lib/ajax/service.php?sesskey=" + M + "&info=core_course_get_enrolled_courses_by_timeline_classification", {
    method: "POST",
    body: JSON.stringify([
      {
        index: 0,
        methodname: "core_course_get_enrolled_courses_by_timeline_classification",
        args: {
          classification: "all",
          customfieldname: "",
          customfieldvalue: "",
          limit: 0,
          offset: 0,
          sort: "fullname",
        },
      },
    ]),
  });

  const [body]: { error: boolean; exception?: exception; data: { courses: classData[] } }[] = await responses.json();

  if (body.error) {
    throw new Error("misrequest");
  }

  let data = body.data.courses;

  data = data.map((v) => {
    v.code = convert_class_to_code(v.fullname);

    return v;
  });

  return data;
}
