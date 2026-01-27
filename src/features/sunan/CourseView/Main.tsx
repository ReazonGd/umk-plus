import { render } from "preact";
import CourseView from "./components/CourseView";
import checkFeature from "@/lib/feature-cheker";
import { log } from "@/lib/debug-log";

async function course_view_script() {
  const isEnable = await checkFeature((p) => p.pages_script.course_view_page);
  if (!isEnable) return;
  log("Course view is enabled.");

  const container_target = document.querySelector("#page-header");

  if (!container_target) return;
  const container = document.createElement("div");
  container.classList.add("col-12", "pt-3", "pb-3");
  container_target.appendChild(container);
  render(<CourseView />, container);
}

setTimeout(course_view_script, 100);
