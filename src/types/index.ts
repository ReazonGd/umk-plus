export interface Course {
  name: string;
  id: number;
  material: Material[];
  taskCompleate: number;
  taskCount: number;
}

export interface Material {
  elementID: string;
  title: string;
  htmlContent: string;
  content: string;
  // isRead: boolean,
  attachment: MaterialAttachment[];
}

export enum MaterialAttachmentColor {
  muted = "#535353",
  red = "#e10c0c",
  orange = "#e1560c",
  green = "#4ce10c",
  blue = "#0cb3e1",
  purple = "#e10c85",
}

export interface MaterialAttachmentGrades {
  weight: number;
  grade: number;
  percentage: number;
  impact: number;
  name: string;
  feedback: string;
  id: number;
}

export interface MaterialAttachment {
  id: number;
  elementID: string;
  type: string;
  isChecked: boolean;
  isFile: boolean;
  content: string;
  url: string;
  name: string;
  color: MaterialAttachmentColor;
  grades?: MaterialAttachmentGrades;
}

export interface ScheduleTimes {
  start: string;
  startDate: string;
  end: string;
  endDate: string;
  room_code: string;
}

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
export interface ExtensionStorageScheme {
  schedules?: Schedule[];
  my_image?: string;
}

export interface classData {
  id: number;
  fullname: string;
  shortname: string;
  idnumber?: string;
  summary?: string;
  summaryformat: number;
  startdate: number;
  enddate?: number;
  visible: true;
  fullnamedisplay: string;
  viewurl: string;
  courseimage: string;
  progress: number;
  hasprogress: boolean;
  isfavourite: boolean;
  hidden: boolean;
  timeaccess: string;
  showshortname: boolean;
  coursecategory: string;
  code: string;
}

export interface GroupedScheduleItem {
  day_name: Dayname;
  classData: classData[];
}

export interface CalenderEvent {
  id: number;
  name: string;
  description: string;
  format: number;
  courseid: number;
  groupid: number;
  userid: number;
  repeatid: number;
  modulename: string;
  instance: number;
  eventtype: string;
  timestart: number;
  timeduration: number;
  visible: number;
  uuid: string;
  sequence: number;
  timemodified: number;
  startdate: number;
  enddate: number;
  course: CalenderCourse;
  subscription: CalenderSubscription;
  remaining_time?: string;
  canedit: boolean;
  candelete: boolean;
  deleteurl: string;
  editurl: string;
  viewurl: string;
  formattedtime: string;
  isactionevent: boolean;
  iscourseevent: boolean;
  iscategoryevent: boolean;
  groupname: string | null;
  normalisedeventtype: string;
  normalisedeventtypetext: string;
  url: string;
  action: CalenderAction;
  view_url: string;
}

export interface CalenderCourse {
  id: number;
  fullname: string;
  shortname: string;
  category: number;
  coursecategory: string;
}

export interface CalenderSubscription {
  displayeventsource: boolean;
}

export interface CalenderAction {
  name: string;
  url: string;
  itemcount: number;
  actionable: boolean;
  showitemcount: boolean;
}

export const days: Dayname[] = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];

export interface CourseTask {
  id: string;
  sesskey: string;
  modulename: string;
  completionstate: string;
  formElement: HTMLFormElement;
}

export enum localExtensionStorageName {
  dashboard_image = "image-stat",
  schedule = "schedule",
  saved_calender = "saved-calender-data",
  enable_notif = "enable-notif",
  is_after_login = "is-after-login",
  config = "config",
}

export interface ExtensionConfig {
  pages_script: {
    login_page: boolean;
    my_page: boolean;
    course_view_page: boolean;
    pdf_preview: boolean;
  };
  scedule: {
    last_update: string;
  };
  isReady: boolean;
}
