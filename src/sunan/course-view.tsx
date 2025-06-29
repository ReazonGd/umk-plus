import { render } from "preact";
import CourseView from "../components/sunan/course_view";
import { ExtensionConfig, localExtensionStorageName } from "../type";
import extensionStorage from "../utils/localExtensionStorage";
import { init_storage } from "../utils/hooks/useConfig";

async function course_view_script() {
  const config = await extensionStorage.get(localExtensionStorageName.config);
  if (!config) init_storage();
  if (!(JSON.parse(config) as ExtensionConfig).pages_script.course_view_page) return;

  const container_target = document.querySelector("#page-header");

  if (!container_target) return;
  const container = document.createElement("div");
  container.classList.add("col-12", "pt-3", "pb-3");
  container_target.appendChild(container);
  render(<CourseView />, container);
}
course_view_script();
