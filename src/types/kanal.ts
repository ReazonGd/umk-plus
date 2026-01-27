import { ClassData } from "./sunan";

export interface ScheduleTimes {
  start: string;
  startDate: string;
  end: string;
  endDate: string;
  room_code: string;
}

export const days: Dayname[] = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
export type Dayname = "senin" | "selasa" | "rabu" | "kamis" | "jumat" | "sabtu" | "minggu" | "none";

export interface Schedule {
  class: string;
  code: string;
  day_code: Dayname;
  dosen: string;
  name: string;
  scedule: ScheduleTimes[];
  // [{…}]
  schedule_text: string;
  sks: number;
}

export interface StudentInfo {
  name: string;
  nim: string;
  programStudi: string;
  dosenPa: string;
  semester: string;
  sks: string;
}

export interface GroupedScheduleItem {
  day_name: Dayname;
  classData: ClassData[];
}
