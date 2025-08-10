import ControlZone from "./medium/control_zone";
import Dashboard_Image from "./medium/dashboard_image";
import { PopupConfigProvider } from "../contex/config";

export default function MainPopup() {
  return (
    <PopupConfigProvider>
      <ControlZone />
      <Dashboard_Image />
    </PopupConfigProvider>
  );
}
