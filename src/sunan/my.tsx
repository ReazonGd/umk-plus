import { render, h } from "preact";
import Dashboard from "../components/sunan/dashboard";
import extensionStorage from "../utils/localExtensionStorage";
import { ExtensionConfig, localExtensionStorageName } from "../type";
import { init_storage } from "../utils/hooks/useConfig";

async function bootstrap() {
  const config = await extensionStorage.get(localExtensionStorageName.config);
  if (!config) init_storage();
  if (!(JSON.parse(config) as ExtensionConfig).pages_script.my_page) return;

  const main_container = document.querySelector(`#region-main  div[role="main"]`);
  if (main_container) {
    render(<Dashboard />, main_container);
  }
}

// note: the useState is not working properly after im remove inject script,
// i dont know why and how, but its seems work after delaying the render fn.
setTimeout(() => {
  bootstrap();
}, 100);
