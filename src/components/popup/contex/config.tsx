import { useContext } from "preact/hooks";
import useLocalExtensionStorage from "../../../utils/hooks/useLocalExtensionStorage";
import { createContext } from "preact";
import { JSXInternal } from "preact/src/jsx";
import useConfig from "../../../utils/hooks/useConfig";
import { ExtensionConfig } from "../../../type";

const StorageContext = createContext<[ExtensionConfig | null, (prev: ExtensionConfig) => void]>([null, () => {}]);

export const PopupConfigProvider = ({ children }: { children: any }) => {
  const config = useConfig();
  return <StorageContext.Provider value={config}>{children}</StorageContext.Provider>;
};

export const useConfigContext = (): [ExtensionConfig | null, (prev: ExtensionConfig) => void] => {
  const context = useContext<[ExtensionConfig | null, (prev: ExtensionConfig) => void]>(StorageContext);
  if (!context) throw new Error("useSharedStorage must be used inside StorageProvider");
  return context;
};
