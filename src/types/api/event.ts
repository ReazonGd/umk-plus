export type EventApi = EventResponse[]

export interface EventResponse {
  error: boolean
  data: Data
}

// export interface exception {
//   message: string;
//   errorcode: string;
//   link: string;
//   moreinfourl: string;
// }

export interface Data {
  events: Event[]
  firstid: number
  lastid: number
}

export interface Event {
  id: number
  name: string
  description: string
  descriptionformat: number
  location: string
  categoryid: any
  groupid: any
  userid: number
  repeatid: any
  eventcount: any
  modulename: string
  instance: number
  eventtype: string
  timestart: number
  timeduration: number
  timesort: number
  visible: number
  timemodified: number
  icon: Icon
  course: Course
  subscription: Subscription
  canedit: boolean
  candelete: boolean
  deleteurl: string
  editurl: string
  viewurl: string
  formattedtime: string
  isactionevent: boolean
  iscourseevent: boolean
  iscategoryevent: boolean
  groupname: any
  normalisedeventtype: string
  normalisedeventtypetext: string
  url: string
  action: Action
}

export interface Icon {
  key: string
  component: string
  alttext: string
}

export interface Course {
  id: number
  fullname: string
  shortname: string
  idnumber: string
  summary: string
  summaryformat: number
  startdate: number
  enddate: number
  visible: boolean
  fullnamedisplay: string
  viewurl: string
  courseimage: string
  progress: number
  hasprogress: boolean
  isfavourite: boolean
  hidden: boolean
  showshortname: boolean
  coursecategory: string
}

export interface Subscription {
  displayeventsource: boolean
}

export interface Action {
  name: string
  url: string
  itemcount: number
  actionable: boolean
  showitemcount: boolean
}
