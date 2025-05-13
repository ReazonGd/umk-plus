import { Fragment, render } from "preact";
import { useEffect, useState } from "preact/hooks";
import useLocalExtensionStorage from "../utils/useLocalExtensionStorage";
import getShedules from "../utils/get_scedule";
import toast, { Toaster } from "react-hot-toast";

function UpdateSchedule() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [_, setSchedule] = useLocalExtensionStorage("schedule", "[]");

  async function updateHandler() {
    setLoading(true);
    const schedule = await getShedules();
    setSchedule(JSON.stringify(schedule));
    toast.success("Jadwal berhasil diupdate");
    setLoading(false);
    setSuccess(true);
  }

  useEffect(() => {
    if (!success) return;

    const interval = setTimeout(() => {
      setSuccess(false);
    }, 5000);

    return () => {
      clearTimeout(interval);
    };
  }, [success]);

  return (
    <Fragment>
      <p onClick={updateHandler} class="btn mt-1" style={{ background: "#000", color: "#fff", cursor: "pointer", padding: "3px 20px", marginBottom: "0" }}>
        {loading ? "Memuat Jadwal..." : success ? "Jadwal Terupdate" : "Update Jadwal"}
      </p>
    </Fragment>
  );
}

function bootstrap() {
  const targetParent = document.querySelector("#page_layout > div:nth-child(2) > div > div > div > form > div > div.col-md-3");
  render(<UpdateSchedule />, targetParent);
  render(<Toaster />, document.body);
}

bootstrap();
