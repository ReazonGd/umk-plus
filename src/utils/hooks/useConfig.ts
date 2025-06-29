import { useEffect, useState } from "preact/hooks";
import { ExtensionConfig, localExtensionStorageName } from "../../type";
import useLocalExtensionStorage from "./useLocalExtensionStorage";
import extensionStorage from "../localExtensionStorage";

export const default_config = {
  pages_script: {
    course_view_page: true,
    login_page: true,
    my_page: true,
  },
  scedule: {
    last_update: "",
  },
  isReady: false,
} as ExtensionConfig;

export default function useConfig(): [ExtensionConfig | null, (new_cfg: ExtensionConfig) => void] {
  const default_str_cfg = JSON.stringify(default_config);
  const [string_cfg, set_cfg] = useLocalExtensionStorage(localExtensionStorageName.config, default_str_cfg, default_str_cfg);

  const [config, set_config] = useState<ExtensionConfig>(null);

  //   useEffect(())
  useEffect(() => {
    set_config(JSON.parse(string_cfg));
  }, [string_cfg]);
  const update = (new_cfg: ExtensionConfig) => {
    set_cfg(JSON.stringify(new_cfg));
  };

  return [config, update];
}

export function init_storage() {
  const default_str_cfg = JSON.stringify(default_config);
  extensionStorage.set(localExtensionStorageName.config, default_str_cfg);
}
