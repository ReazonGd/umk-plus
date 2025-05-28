// adding form simple falidation on login foorm,
// refreshing login token after 5mins ()

import { render } from "preact";
import toast, { Toaster } from "react-hot-toast";
import LoginButton from "../components/sunan/small/login_button";

function bootstrap() {
  const popup_container = document.createElement("div");
  document.body.appendChild(popup_container);
  render(<Toaster position="top-center" reverseOrder={false} />, popup_container);

  const loginForm = document.querySelector("#login");

  const newbtn = document.createElement("div");
  newbtn.style.marginBottom = "10px";
  loginForm.replaceChild(newbtn, loginForm.querySelector('button[type="submit"]'));

  render(<LoginButton />, newbtn);

  const interval = setInterval(async () => {
    try {
      const login_page = await fetch("https://sunan.umk.ac.id/login/index.php");

      if (!login_page.ok) throw new Error("failed to fetch");
      const login_page_string = await login_page.text();
      const parser2 = new DOMParser();
      const $ = parser2.parseFromString(login_page_string, "text/html");

      const tokenElement: HTMLInputElement = document.querySelector("#login input[name=logintoken]");
      tokenElement.value = ($.querySelector("#login input[name=logintoken]") as HTMLInputElement).value;

      toast.success("login token has been refreshed");
    } catch (error) {
      toast.error("couldn't refresh login token");
    }
  }, 5 * 60 * 1000);
}

setTimeout(bootstrap, 100);
