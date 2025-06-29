import { localExtensionStorageName } from "../../../type";
import Mlog from "../../../utils/fancy_log";
import useLocalExtensionStorage from "../../../utils/hooks/useLocalExtensionStorage";

export default function ONOFF() {
  const [enable_notif, setEnable_notif] = useLocalExtensionStorage(localExtensionStorageName.enable_notif, "false");

  const toogle_handle = () => {
    const is_active = enable_notif === "true";
    setEnable_notif(String(!is_active));
  };
  return (
    <div className="on-of">
      <h1>UMK+ Notif</h1>
      <div className="container-button" onClick={toogle_handle}>
        <div className={`button ${enable_notif === "true" ? "active" : ""}`}>ON</div>
        <div className={`button ${!(enable_notif === "true") ? "active" : ""}`}>OFF</div>
      </div>
    </div>
  );
}
