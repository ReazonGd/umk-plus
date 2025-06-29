import { render } from "preact";
import PDFLinkEnhancer from "../components/sunan/big/pdf-viewer";
import injectScript from "../utils/client/inject_find_sse_key";
import extensionStorage from "../utils/localExtensionStorage";
import { ExtensionConfig, localExtensionStorageName } from "../type";
import { init_storage } from "../utils/hooks/useConfig";

async function sunan_global_script() {
  injectScript();

  const config = await extensionStorage.get(localExtensionStorageName.config);
  if (!config) init_storage();
  if (!(JSON.parse(config) as ExtensionConfig).pages_script.pdf_preview) return;

  render(<PDFLinkEnhancer />, document.body);
}
sunan_global_script();
