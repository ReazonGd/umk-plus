export interface SunanMonthlyCalendar {
  error: boolean
  data: SunanMonthlyCalendarData
}

export interface SunanMonthlyCalendarData {
  url: string
  courseid: number
  categoryid: number
  weeks: Week[]
  daynames: Dayname[]
  view: string
  date: Date
  periodname: string
  includenavigation: boolean
  initialeventsloaded: boolean
  previousperiod: Previousperiod
  previousperiodlink: string
  previousperiodname: string
  nextperiod: Nextperiod
  nextperiodname: string
  nextperiodlink: string
  larrow: string
  rarrow: string
  defaulteventcontext: number
}

export interface Week {
  prepadding: number[]
  postpadding: number[]
  days: Day[]
}

export interface Day {
  seconds: number
  minutes: number
  hours: number
  mday: number
  wday: number
  year: number
  yday: number
  istoday: boolean
  isweekend: boolean
  timestamp: number
  neweventtimestamp: number
  viewdaylink: string
  viewdaylinktitle?: string
  events: Event[]
  hasevents: boolean
  calendareventtypes: string[]
  previousperiod: number
  nextperiod: number
  navigation: string
  haslastdayofevent: boolean
  popovertitle: string
}

export interface Event {
  id: number
  name: string
  description: string
  descriptionformat: number
  location: string
  categoryid: any
  groupid: any
  userid?: number
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
  islastday: boolean
  popupname: string
  draggable: boolean
  mindaytimestamp?: number
  mindayerror?: string
  maxdaytimestamp?: number
  maxdayerror?: string
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

export interface Dayname {
  dayno: number
  shortname: string
  fullname: string
}

export interface Date {
  seconds: number
  minutes: number
  hours: number
  mday: number
  wday: number
  mon: number
  year: number
  yday: number
  weekday: string
  month: string
  timestamp: number
}

export interface Previousperiod {
  seconds: number
  minutes: number
  hours: number
  mday: number
  wday: number
  mon: number
  year: number
  yday: number
  weekday: string
  month: string
  timestamp: number
}

export interface Nextperiod {
  seconds: number
  minutes: number
  hours: number
  mday: number
  wday: number
  mon: number
  year: number
  yday: number
  weekday: string
  month: string
  timestamp: number
}
