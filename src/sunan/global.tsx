import { render } from "preact";
import PDFLinkEnhancer from "../components/sunan/big/pdf-viewer";
import injectScript from "../utils/inject_find_sse_key";

function sunan_global_script() {
  injectScript();
  render(<PDFLinkEnhancer />, document.body);
}
sunan_global_script();
