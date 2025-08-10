import { render } from "preact";
import { HelloSunan } from "./HelloSunan";

function bootstrap() {
  const selector = document.querySelector("#page-header");
  if (!selector) return;

  const div = document.createElement("div");
  div.classList.add("col-12", "pt-3", "pb-3");

  selector.appendChild(div);
  if (selector) {
    render(<HelloSunan />, div);
  }
}

bootstrap();
