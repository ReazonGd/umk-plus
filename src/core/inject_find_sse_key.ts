import { log } from "../lib/debug-log";

export default function injectScript() {
  log("Setting up sess-token...", "info");
  const payload = function () {
    if ((window as any).M) localStorage.setItem("umk+sess-token", (window as any).M.cfg.sesskey);

    const payloadElement = document.querySelector("img#umk-plus-payload-ss");
    if (!payloadElement) {
      console.warn("cannot find payload element");
      return;
    }
    document.body.removeChild(payloadElement);
  };
  const img = `<img id="umk-plus-payload-ss" onload="eval(atob('${btoa("(" + payload.toString() + ")();")}'))" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=">`;
  document.body.innerHTML += img;
}
