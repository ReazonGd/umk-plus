export interface MatkulDetail {
  SKS: string;
  kode: string;
  kelas: string;
  dosen: string;
  kategori: string;
  mataKuliah: string;
  id: string;
  schedule: MatkulDetailSchedule[];
}

export interface MatkulDetailSchedule {
  day: string;
  time: string;
  room: string;
}

export interface SemesterOption {
  semester: string;
  options: MatkulOption[];
}

export interface MatkulOption {
  kode: string;
  mataKuliah: string;
  detail: MatkulDetail[];
}
