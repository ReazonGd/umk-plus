import { render } from "preact";
import injectScript from "@/utils/inject_find_sse_key";
import PDFLinkEnhancer from "./PDFViewer";
import checkFeature from "@/lib/feature-cheker";

async function sunan_global_script() {
  injectScript();

  const isPDFPreviewEnable = await checkFeature((p) => p.pages_script.pdf_preview);
  if (isPDFPreviewEnable) render(<PDFLinkEnhancer />, document.body);
}
sunan_global_script();
