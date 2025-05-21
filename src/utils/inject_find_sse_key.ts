export default function injectScript() {
  const payload = function () {
    if ((window as any).M) localStorage.setItem("umk+sess-token", (window as any).M.cfg.sesskey);

    const payloadElement = document.querySelector("img#umk-plus-payload-ss");
    document.body.removeChild(payloadElement);
  };
  const img = `<img id="umk-plus-payload-ss" onload="eval(atob('${btoa("(" + payload.toString() + ")();")}'))" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=">`;
  document.body.innerHTML += img;
}
