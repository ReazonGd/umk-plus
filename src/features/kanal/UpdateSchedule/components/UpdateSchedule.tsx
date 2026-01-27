import useLocalExtensionStorage from "@/hooks/useLocalExtensionStorage";
import { inspect, log, time } from "@/lib/debug-log";
import { localExtensionStorageName, StudentInfo } from "@/types";
import getShedules from "@/core/get_scedule";
import getStudentInfo from "@/core/get_student_info";
import { useEffect, useState } from "preact/hooks";
import { Fragment } from "preact/jsx-runtime";
import toast from "react-hot-toast";
import { Blocks } from "lucide-preact";

export default function UpdateSchedule() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Update");
  const [_, setSchedule] = useLocalExtensionStorage(localExtensionStorageName.schedule, "[]");
  const [studentInfo, setStudentInfo, studentStorageLoading] = useLocalExtensionStorage(localExtensionStorageName.studentInfo, "{}");

  async function updateHandler(studentInfo?: StudentInfo) {
    if (loading) return;
    setMessage("Memproses...");
    setLoading(true);
    log("Updating schedule")
    const time_log = time("update finished");
    try {
      const schedule = await getShedules();
      setStudentInfo(JSON.stringify(studentInfo ?? getStudentInfo()));
      setSchedule(JSON.stringify(schedule));
      toast(
        () => (
          <span>
            Jadwal berhasil di update! <a href="https://sunan.umk.ac.id/my/">kembali ke sunan</a>.
          </span>
        ),
        { duration: 10000 }
      );
    } catch (error) {
      log("Update schedule failed : ", "error");
      inspect(error, "error");
      toast.error("Update jadwal gagal, periksa log konsol untuk informasi lebih lanjut.");
    }
    time_log();
    setMessage("Jadwal Terupdate");
    setLoading(false);
  }

  useEffect(() => {
    if (studentStorageLoading) return;

    const info = JSON.parse(studentInfo) as StudentInfo;
    const newStudentInfo = getStudentInfo()
    //    console.log(studentInfo, newStudentInfo);
    if (!info.semester || info.semester !== newStudentInfo.semester) {
      updateHandler(newStudentInfo);
      return;
    };
    setMessage("Jadwal Terupdate");
  }, [studentInfo]);

  return (
    <Fragment>
      <button className="btn bg-info text-white">
        <Blocks size={16} />
      </button>
      <button onClick={() => updateHandler()} className="btn btn-primary">
        {message}
      </button>
      <a href={"https://portalkawe.umk.ac.id/mahasiswa/jadwal_ketrampilan"} className="btn btn-primary">
        Update Jadwal Kawe
      </a>
    </Fragment>
  );
}
