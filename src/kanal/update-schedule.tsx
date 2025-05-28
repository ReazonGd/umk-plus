import { Fragment, render } from "preact";
import { useEffect, useState } from "preact/hooks";
import useLocalExtensionStorage from "../utils/useLocalExtensionStorage";
import getShedules from "../utils/get_scedule";
import toast, { Toaster } from "react-hot-toast";
import { HardDriveDownload } from "lucide-preact";
import Mlog, { Merror } from "../utils/fancy_log";

function UpdateSchedule() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [_, setSchedule] = useLocalExtensionStorage("schedule", "[]");

  async function updateHandler() {
    setLoading(true);
    try {
      const schedule = await getShedules();
      setSchedule(JSON.stringify(schedule));
      toast(
        () => (
          <span>
            <span>
              <HardDriveDownload size={16} fill="#2658a5" />
            </span>
            Jadwal berhasil di update! <a href="https://sunan.umk.ac.id/my/">kembali ke sunan</a>.
          </span>
        ),
        { duration: 10000 }
      );
      Mlog("Update finished.");
    } catch (error) {
      Merror("Update schedule failed : ", error);
      toast.error("Update jadwal gagal, periksa log konsol untuk informasi lebih lanjut.");
    }

    setLoading(false);
    setDone(true);
  }

  useEffect(() => {
    if (!done) return;

    const interval = setTimeout(() => {
      setDone(false);
    }, 5000);

    return () => {
      clearTimeout(interval);
    };
  }, [done]);

  return (
    <Fragment>
      <p onClick={updateHandler} class="btn mt-1" style={{ background: "#000", color: "#fff", cursor: "pointer", padding: "3px 20px", marginBottom: "0" }}>
        {loading ? "Memuat Jadwal..." : done ? "Update selesai" : "Update Jadwal"}
      </p>
    </Fragment>
  );
}

function bootstrap() {
  Mlog("Init update button.");
  const targetParent = document.querySelector("#page_layout > div:nth-child(2) > div > div > div > form > div > div.col-md-3");
  render(<UpdateSchedule />, targetParent);
  render(<Toaster />, document.body);
}

bootstrap();
