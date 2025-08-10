import { ExtensionConfig, localExtensionStorageName } from "@/types";
import extensionStorage from "./localExtensionStorage";
import { default_config, init_storage } from "@/hooks/useConfig";

export default async function checkFeature(cb: (config: ExtensionConfig) => boolean) {
  const storage = await extensionStorage.get(localExtensionStorageName.config);

  let config: ExtensionConfig;

  if (!storage) {
    init_storage();
    config = default_config;
  } else {
    config = JSON.parse(storage);
  }

  return cb(config);
}
