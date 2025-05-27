import { render, h } from "preact";
import MainPopup from "./components/popup/main";

function bootstrap() {
  const root = document.querySelector(".root");
  render(<MainPopup />, root);
}

setTimeout(() => {
  bootstrap();
}, 100);
