export interface ClassData {
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


export interface CourseTask {
  id: string;
  sesskey: string;
  modulename: string;
  completionstate: string;
  formElement: HTMLFormElement;
}
