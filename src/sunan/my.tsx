import { render } from "preact";
import Dashboard from "../components/sunan/dashboard";
import injectScript from "../utils/inject_find_sse_key";

function bootstrap() {
  injectScript();
  const main_container = document.querySelector(`#region-main  div[role="main"]`);
  if (main_container) {
    render(<Dashboard />, main_container);
  }
}

bootstrap();
