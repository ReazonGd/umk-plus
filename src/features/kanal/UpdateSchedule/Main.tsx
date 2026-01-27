import { render } from "preact";
import { Toaster } from "react-hot-toast";
import UpdateSchedule from "./components/UpdateSchedule";


function bootstrap() {
  const targetParent = document.querySelector("#page_layout > div:nth-child(2) > div > div > div");
  if (!targetParent) return;
  const container = document.createElement("div");
  container.setAttribute("class", "py-2 border-0 border-dashed border-top border-secondary d-flex gap-2");
  targetParent.appendChild(container);
  container.id = "umk-plus"
  render(<UpdateSchedule />, container);
  render(<Toaster />, document.body);
}

bootstrap();
