/**
 * This function wil extrac from https://kanal.umk.ac.id/mahasiswa/jadwalkuliah
 */

import { StudentInfo } from "@/types";

export default function getStudentInfo(): StudentInfo {
  const scheme: { [key: string]: string } = {
    dosenPa: "#page_layout > div:nth-child(2) > div > div > div > div.row > div:nth-child(2) > div > div:nth-child(1) > div.col-8 > b",
    name: "#page_layout > div:nth-child(2) > div > div > div > div.row > div:nth-child(1) > div > div:nth-child(1) > div.col-8 > b",
    nim: "#page_layout > div:nth-child(2) > div > div > div > div.row > div:nth-child(1) > div > div:nth-child(2) > div.col-8 > b",
    programStudi: "#page_layout > div:nth-child(2) > div > div > div > div.row > div:nth-child(1) > div > div:nth-child(3) > div.col-8 > b",
    semester: "#page_layout > div:nth-child(2) > div > div > div > div.row > div:nth-child(2) > div > div:nth-child(2) > div.col-8 > b",
    sks: "#page_layout > div:nth-child(2) > div > div > div > div.row > div:nth-child(2) > div > div:nth-child(3) > div.col-8 > b",
  };

  let result: { [key: string]: string } = {};
  Object.keys(scheme).forEach((val) => {
    result[val] = document.querySelector(scheme[val])?.textContent ?? "Not found";
  });

  return {
    name: result.name,
    nim: result.nim,
    programStudi: result.programStudi,
    dosenPa: result.dosenPa,
    semester: result.semester,
    sks: result.sks,
  };
}
