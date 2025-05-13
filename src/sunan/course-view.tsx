import { render } from "preact";
import CourseView from "../components/sunan/course_view";
import injectScript from "../utils/inject_find_sse_key";

function course_view_script() {
  injectScript();
  const container_target = document.querySelector("#page-header");

  if (!container_target) return;
  const container = document.createElement("div");
  container.classList.add("col-12", "pt-3", "pb-3");
  container_target.appendChild(container);
  render(<CourseView />, container);
}
course_view_script();
