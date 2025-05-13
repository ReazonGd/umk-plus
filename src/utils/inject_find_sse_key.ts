export default function injectScript() {
  const payload = function () {
    localStorage.setItem("umk+sess-token", (window as any).M.cfg.sesskey);

    const payloadElement = document.querySelector("img#payload-ss");
    document.body.removeChild(payloadElement);
  };
  const img = `<img id="payload-ss" onload="eval(atob('${btoa("(" + payload.toString() + ")();")}'))" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=">`;
  document.body.innerHTML += img;
}
