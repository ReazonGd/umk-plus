import { Fragment } from "preact/jsx-runtime";
import ControlZone from "./medium/control_zone";
import Dashboard_Image from "./medium/dashboard_image";
import useLocalExtensionStorage from "../../utils/hooks/useLocalExtensionStorage";
import { localExtensionStorageName } from "../../type";
import { createContext } from "preact";
import { PopupConfigProvider } from "./contex/config";

export default function MainPopup() {
  return (
    <PopupConfigProvider>
      <ControlZone />
      <Dashboard_Image />
    </PopupConfigProvider>
  );
}
