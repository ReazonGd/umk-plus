import { render } from "preact";
import checkFeature from "@/lib/feature-cheker";
import { log } from "@/lib/debug-log";
import Popup_slider from "./components/popup";


export default async function pupup_sunan() {
  const isEnable = await checkFeature((p) => p.pages_script.pdf_preview);
  if (!isEnable) return;
  log("popup is enabled.");

  const container_target = document.body;

  if (!container_target) return;
  const container = document.createElement("div");
  container.classList.add("col-12", "pt-3", "pb-3");
  container_target.appendChild(container);
  render(<Popup_slider />, container);
}

setTimeout(pupup_sunan, 100);
