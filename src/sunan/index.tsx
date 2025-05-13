import { render } from "preact";
import { HelloSunan } from "../components/sunan/hello_sunan";
import injectScript from "../utils/inject_find_sse_key";

function bootstrap() {
  injectScript();
  const selector = document.querySelector("#page-header");
  const div = document.createElement("div");
  div.classList.add("col-12", "pt-3", "pb-3");
  selector.appendChild(div);
  if (selector) {
    render(<HelloSunan />, div);
  }
}

bootstrap();
