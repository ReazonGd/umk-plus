import { log } from "@/lib/debug-log";
import { DetailMatkulResponse } from "@/types/api/krs";
import { MatkulDetail, MatkulOption, SemesterOption } from "@/types/krs";
import toast from "react-hot-toast";

export function getKrsOption(): SemesterOption[] {
  return Array.from(document.querySelectorAll("#accordionExample > div > div .accordion-item")).map(
    (semesterContainer) => {
      const matkulGrub: MatkulOption[] = [];
      const MatkulDetail: MatkulDetail[] = Array.from(semesterContainer.querySelectorAll("table > tbody > tr")).map(
        (matkulRow) => {
          const id = matkulRow.querySelector("td:nth-child(8) a")?.getAttribute("data-id")?.trim() || "";
          return {
            mataKuliah: matkulRow.querySelector("td:nth-child(4)")?.textContent?.trim() || "",
            kode: matkulRow.querySelector("td:nth-child(2)")?.textContent?.trim() || "",
            kelas: matkulRow.querySelector("td:nth-child(3)")?.textContent?.trim() || "",
            dosen: matkulRow.querySelector("td:nth-child(7) li")?.textContent?.trim() || "",
            kategori: matkulRow.querySelector("td:nth-child(5)")?.textContent?.trim() || "",
            SKS: matkulRow.querySelector("td:nth-child(6)")?.textContent?.trim() || "",
            schedule: [],
            id
          };
        },
      );

      MatkulDetail.forEach((matkul) => {
        const existingOption = matkulGrub.find((option) => option.kode === matkul.kode);
        if (existingOption) {
          existingOption.detail.push(matkul);
        } else {
          matkulGrub.push({
            kode: matkul.kode,
            mataKuliah: matkul.mataKuliah,
            detail: [matkul],
          });
        }
      });
      return {
        semester: semesterContainer.querySelector("h2.accordion-header > button")?.textContent?.trim() || "",
        options: matkulGrub,
      };
    },
  );
}

export async function fetchMatkulDetail(id: string): Promise<MatkulDetail["schedule"] | undefined> {
  try {
    const body = new FormData();
    body.append("id", id);
    const scheduleRequest = await fetch("https://krs.umk.ac.id/detailmakul", {
      method: "POST",
      body,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    if (!scheduleRequest.ok) {
      throw new Error(`Failed to fetch schedule data: ${scheduleRequest.statusText}`);
    }

    const scheduleData = (await scheduleRequest.json()).data as DetailMatkulResponse;

    // parsing into html to extract schedule
    const scheduleParse = new DOMParser().parseFromString(`<table>${scheduleData.jadwal}</table>`, "text/html");
    const scheduleRows = Array.from(scheduleParse.querySelectorAll("tr")).map((tr) =>
      Array.from(tr.querySelectorAll("td")).map((td) => td.textContent?.trim() || ""),
    );
    const schedule = scheduleRows.map((row) => ({
      day: row[1],
      time: row[2],
      room: row[3],
    }));

    return schedule;
  } catch (error) {
    log(error, "error");
    toast.error("Gagal mengambil data jadwal");
  }
}
// export function add(callback: (data: ScheduleData) => void, savedData: ScheduleData[] = []) {
//   const all_target_container = document.querySelectorAll("table > tbody > tr");

//   all_target_container.forEach((container) => {
//     const new_button = document.createElement("button");
//     new_button.innerText = "Pilih";
//     new_button.style.marginTop = "8px";
//     new_button.className = "btn btn-sm btn-primary";

//     new_button.addEventListener("click", async () => {
//       try {
//         const id = container.querySelector("td:nth-child(8) a")?.getAttribute("data-id")?.trim() || "";
//         const body = new FormData();
//         body.append("id", id);
//         const scheduleRequest = await fetch("https://krs.umk.ac.id/detailmakul", {
//           method: "POST",
//           body,
//           headers: {
//             "X-Requested-With": "XMLHttpRequest",
//           },
//         });

//         if (!scheduleRequest.ok) {
//           throw new Error(`Failed to fetch schedule data: ${scheduleRequest.statusText}`);
//         }

//         const scheduleData = (await scheduleRequest.json()).data as DetailMatkulResponse;

//         // parsing into html to extract schedule
//         const scheduleParse = new DOMParser().parseFromString(`<table>${scheduleData.jadwal}</table>`, "text/html");
//         const scheduleRows = Array.from(scheduleParse.querySelectorAll("tr")).map((tr) =>
//           Array.from(tr.querySelectorAll("td")).map((td) => td.textContent?.trim() || ""),
//         );
//         const schedule = scheduleRows.map((row) => ({
//           day: row[1],
//           time: row[2],
//           room: row[3],
//         }));

//         callback({
//           class: scheduleData.kelas_makul,
//           code: scheduleData.kode_makul,
//           course: scheduleData.nama_makul,
//           dosen: container.querySelector("td:nth-child(7) li")?.textContent.trim() || "",
//           sks: parseInt(scheduleData.teori_makul) + parseInt(scheduleData.praktikum_makul),
//           schedule,
//         });
//       } catch (error) {
//         log(error, "error");
//         toast.error("Gagal mengambil data jadwal");
//       }
//     });

//     container.querySelector("td:nth-child(8) > center")?.appendChild(new_button);
//   });
// }

// <tr>
//   \r\n{" "}
//   <td>
//     \r\n <center>1.</center>\r\n{" "}
//   </td>
//   \r\n{" "}
//   <td>
//     \r\n <center>Senin</center>\r\n{" "}
//   </td>
//   \r\n{" "}
//   <td>
//     \r\n <center>07:10 - 09:40</center>\r\n{" "}
//   </td>
//   \r\n{" "}
//   <td>
//     \r\n <center>J.5.09</center>\r\n{" "}
//   </td>
//   \r\n{" "}
// </tr>;
