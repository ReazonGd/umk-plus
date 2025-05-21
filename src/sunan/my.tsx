import { render, h } from "preact";
import Dashboard from "../components/sunan/dashboard";

function bootstrap() {
  const main_container = document.querySelector(`#region-main  div[role="main"]`);
  if (main_container) {
    render(<Dashboard />, main_container);
  }
}

// note: the useState is not working properly after im remove inject script,
// i dont know why and how, but its seems work after delaying the render fn.
setTimeout(() => {
  bootstrap();
}, 100);
