import { log } from "@/lib/debug-log";
import { useEffect, useState } from "preact/hooks";
import toast from "react-hot-toast";
import useLocalStorage from "@/hooks/useLocalStorage";
import Accordion from "@/shared/accordion";
import { MatkulDetail } from "@/types/krs";
import { fetchMatkulDetail, getKrsOption } from "../script/getKrsoption";

export default function DisplayScedule() {
  const [schedules_saved, setSchedules_saved] = useLocalStorage<string>("mykrs", "[]");
  const [schedules, setSchedules] = useState<MatkulDetail[]>(JSON.parse(schedules_saved) || []);
  const [Krsoption] = useState(getKrsOption());

  useEffect(() => {
    setSchedules_saved(JSON.stringify(schedules));
  }, [schedules]);

  const addMakul = (matkul: MatkulDetail) => {
    setSchedules((prev) => {
      if (prev.find((s) => s.kode === matkul.kode)) {
        return prev;
      }

      const new_scedule = [...prev, matkul];
      let allow = true;

      const byDay: Record<string, { start: number; end: number }[]> = {};

      new_scedule.forEach((item) => {
        item.schedule.forEach((schedule) => {
          const [start, end] = schedule.time.split("-").map((w) => {
            const [jam, menit] = w.split(":").map(Number);

            return jam * 60 + menit;
          });
          if (!byDay[schedule.day]) byDay[schedule.day] = [];
          byDay[schedule.day].push({ end, start });
        });
      });

      for (const day in byDay) {
        const times = byDay[day];

        times.sort((a, b) => a.start - b.start);
        for (let i = 0; i < times.length - 1; i++) {
          if (times[i].start < times[i + 1].end && times[i + 1].start < times[i].end) {
            allow = false;
            toast.error(`Mata kuliah ${matkul.mataKuliah} bentrok!`);
          }
        }
      }
      if (!allow) {
        return prev;
      }

      toast.success(`Menambahkan mata kuliah ${matkul.mataKuliah}`);
      return new_scedule;
    });
  };
  const removeMakul = (kode: string) => {
    setSchedules((prev) => prev.filter((s) => !(s.kode === kode)));
    toast.success(`Berhasil menghapus!`);
  };

  return (
    <Accordion title="Schedule Maker UMK ">
      <table class="table table-bordered" width="100%" style="font-size: 11px; color: black">
        <tbody style="vertical-align: top; text-align: center; padding: .3rem .5rem;">
          <tr class="bg bg-primary text-white" style="padding: .3rem .5rem;">
            <th rowspan={2} style="vertical-align: middle; width: 2%">
              No.
            </th>
            <th rowspan={2} style="vertical-align: middle;">
              Kelas
            </th>
            <th colspan={2} rowspan={1}>
              Matakuliah
            </th>
            <th rowspan={2} style="vertical-align: middle;">
              Dosen
            </th>
            <th rowspan={2} style="vertical-align: middle;">
              SKS
            </th>
            {/* <!-- <th rowspan={2} style="width: 5%;">Ke</th> --> */}
            <th colspan={7} style="width: 10%;">
              Jadwal
            </th>
            <th rowspan={2} style="vertical-align: middle;">
              Aksi
            </th>
          </tr>
          <tr style="padding: .3rem .5rem;" class="bg bg-primary text-white">
            <th style="width: 2px;">Kode</th>
            <th>Nama</th>
            <th>Sn</th>
            <th>Sl</th>
            <th>Rb</th>
            <th>Km</th>
            <th>Jm</th>
            <th>Sb</th>
            <th>Mg</th>
          </tr>
          {schedules.length === 0 && (
            <tr>
              <td colspan={14} style="padding: 1rem; text-align: center;">
                Belum ada mata kuliah yang ditambahkan
              </td>
            </tr>
          )}
          {schedules.map((schedule, index) => (
            <>
              <tr>
                <td>{index + 1}</td>
                <td>{schedule.kelas}</td>
                <td>{schedule.kode}</td>
                <td>{schedule.mataKuliah}</td>
                <td>
                  {schedule.dosen} <br />
                </td>
                <td>{schedule.SKS}</td>
                {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map((day) => {
                  let daySchedules = schedule.schedule.filter((s) => s.day === day);
                  if (daySchedules.length === 0) {
                    return <td></td>;
                  } else {
                    return (
                      <td>
                        {daySchedules.map((ds, idx) => (
                          <>
                            {ds.time} {ds.room}
                          </>
                        ))}
                      </td>
                    );
                  }
                })}
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      removeMakul(schedule.kode);
                    }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            </>
          ))}
          {schedules.length > 0 && (
            <tr>
              <td colSpan={5}>Total SKS</td>
              <td>{schedules.map((e) => Number(e.SKS)).reduce((a, b) => a + b, 0)}</td>
              <td colSpan={7}></td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    setSchedules([]);
                  }}
                >
                  Reset
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {Krsoption.map((semester) => (
        <Accordion title={semester.semester}>
          {semester.options.map((matkul) => {
            const [_, setIsFirstLoad] = useState(true);
            const [copy, setCopy] = useState(matkul.detail);

            const hondlefistopen = async (isOpen: boolean) => {
              if (!isOpen) return;
              setIsFirstLoad((prev) => {
                if (!prev) return false;
                copy.forEach(async (detail) => {
                  fetchMatkulDetail(detail.id).then((schedule) => {
                    if (schedule) {
                      setCopy((prev2) => {
                        const newcopy = prev2.map((d) => {
                          if (d.id === detail.id) {
                            return { ...d, schedule };
                          }
                          return d;
                        });
                        return newcopy;
                      });
                    }
                  });
                });
                return false;
              });
            };
            return (
              <Accordion title={`${matkul.kode} - ${matkul.mataKuliah}`} onChangeOpen={hondlefistopen}>
                <table class="table table-bordered" width="100%" style="font-size: 11px; color: black">
                  <thead>
                    <tr>
                      <th>Kelas</th>
                      <th>Dosen</th>
                      <th>SKS</th>
                      <th>Jadwal</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {copy.map((detail) => {
                      return (
                        <tr>
                          <td>{detail.kelas}</td>
                          <td>{detail.dosen}</td>
                          <td>{detail.SKS}</td>
                          <td>{detail.schedule.map((v) => `${v.day} ${v.time}(${v.room})`).join(", ")}</td>
                          <td>
                            {!schedules.find((v) => v.kode === detail.kode) ? (
                              <button
                                className={`btn btn-sm btn-primary`}
                                disabled={detail.schedule.length === 0}
                                onClick={() => {
                                  addMakul(detail);
                                }}
                              >
                                pilih
                              </button>
                            ) : (
                              <button
                                className={`btn btn-sm btn-anger`}
                                onClick={() => {
                                  removeMakul(detail.kode);
                                }}
                              >
                                batalkan
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Accordion>
            );
          })}
        </Accordion>
      ))}
    </Accordion>
  );
}
