import { render } from "preact";
import DisplayScedule from "./components/DisplayScedule";
import { Toaster } from "react-hot-toast";

function Root() {
  return (
    <>
      <DisplayScedule />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

function bootsrap() {
  const tardet_div = document.querySelector("body > div.pc-container > div.pc-content > .row");
  if (!tardet_div) return;

  const new_continer = document.createElement("div");
  new_continer.setAttribute("class", "col-sm-12");
  render(<Root />, new_continer);
  tardet_div.prepend(new_continer);
}

setTimeout(bootsrap, 100);
