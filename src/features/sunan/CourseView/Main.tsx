import { render } from "preact";
import CourseView from "./components/CourseView";
import checkFeature from "@/lib/feature-cheker";

async function course_view_script() {
  const isEnable = await checkFeature((p)=> p.pages_script.course_view_page);
  if (!isEnable) return

  const container_target = document.querySelector("#page-header");

  if (!container_target) return;
  const container = document.createElement("div");
  container.classList.add("col-12", "pt-3", "pb-3");
  container_target.appendChild(container);
  render(<CourseView />, container);
}
course_view_script();
