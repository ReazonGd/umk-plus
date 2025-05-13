import { render } from "preact";
import PDFLinkEnhancer from "../components/sunan/big/pdf-viewer";

function sunan_global_script() {
  render(<PDFLinkEnhancer />, document.body);
}
sunan_global_script();
