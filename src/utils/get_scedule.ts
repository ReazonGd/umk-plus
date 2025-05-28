import { Dayname, Schedule } from "../type";
import Mlog from "./fancy_log";

export default function getShedules() {
  return new Promise<Schedule[]>(async (resolve) => {
    // const htmlString = await (await fetch("https://kanal.umk.ac.id/mahasiswa/jadwalkuliah")).text();
    // const parser = new DOMParser();
    // const doc = parser.parseFromString(htmlString, "text/html");
    let scedules: Schedule[] = [];
    document.querySelectorAll("#page_layout > div:nth-child(3) > div > div > div > div > table > tbody > tr").forEach((e, i) => {
      if (i < 2) return;
      let res: Schedule = {
        class: e.children[1].textContent.trim(),
        code: e.children[2].textContent.trim(),
        name: e.children[3].textContent.trim(),
        dosen: e.children[4].textContent.trim(),
        sks: Number(e.children[5].textContent.trim()),
        day_code: "senin",
        schedule_text: "",
        scedule: [],
      };

      for (let i = 6; i <= 12; i++) {
        let t = e.children[i].textContent.replace(/\s+/g, " ").replace(/\n/g, "").trim();
        if (!t) continue;
        res.schedule_text = t;
        const pattern = /(\d{2}:\d{2})-(\d{2}:\d{2}) \((.*?)\)/g;
        const matches = Array.from(t.matchAll(pattern));
        res.scedule = matches
          .map((match) => ({
            start: match[1],
            startDate: parseTime(match[1]),
            end: match[2],
            endDate: parseTime(match[2]),
            room_code: match[3],
          }))
          .sort((a, b) => {
            const [h1, m1] = a.start.split(":").map(Number);
            const [h2, m2] = b.start.split(":").map(Number);

            return h1 * 60 + m1 - (h2 * 60 + m2);
          });

        let dayname = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"];
        res.day_code = dayname[i - 6] as Dayname;
      }
      scedules.push(res);
    });

    const kw = await kw_scedule();
    kw.forEach((v) => scedules.push(v));
    scedules = scedules.sort((a, b) => {
      const [h1, m1] = a.scedule[0].start.split(":").map(Number);
      const [h2, m2] = b.scedule[0].start.split(":").map(Number);

      return h1 * 60 + m1 - (h2 * 60 + m2);
    });
    resolve(scedules);
  });
}

function parseTime(timeStr: string) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
}
async function kw_scedule(): Promise<Schedule[]> {
  Mlog("Fetching KW schedule...");
  const kw_page = await fetch("https://kanal.umk.ac.id/mahasiswa/jadwalketrampilan");

  if (!kw_page.ok) throw new Error("failed to fetch");
  const kw_page_string = await kw_page.text();
  const parser2 = new DOMParser();
  const doc = parser2.parseFromString(kw_page_string, "text/html");

  const table_body = doc.querySelector("table#datatable tbody");

  const scedules: Schedule[] = [];

  if (table_body.querySelector(".dataTables_empty")) {
    // table is empty

    return scedules;
  }

  const class_list = table_body.querySelectorAll("tr");

  class_list.forEach((row) => {
    const scedule: Schedule = {
      class: "",
      code: row.children[2].textContent.trim(),
      day_code: row.children[4].textContent.trim().toLocaleLowerCase() as Dayname,
      dosen: row.children[3].textContent.trim(),
      name: row.children[1].textContent.trim(),
      scedule: [],
      schedule_text: row.children[6].textContent.trim(),
      sks: 0,
    };
    const pattern = /(\d{2}:\d{2}) - (\d{2}:\d{2})/g;
    const matches = Array.from(scedule.schedule_text.matchAll(pattern));
    scedule.scedule = matches.map((match) => ({
      start: match[1],
      startDate: parseTime(match[1]),
      end: match[2],
      endDate: parseTime(match[2]),
      room_code: row.children[5].textContent.trim(),
    }));

    scedules.push(scedule);
  });

  return scedules;
}
