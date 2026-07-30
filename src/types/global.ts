export enum StatusEnum {
    loading = "loading",
    success = "success",
    failed = "failed"
}
export enum StatusMesssageEnum {
    loading = "request on process, please wait",
    success = "request success!",
    failed = "request is failed."
}

export interface RequestStatus{
    status: StatusEnum
    message: StatusMesssageEnum | string,
}

export type GoogleCalendarEventParams = {
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  timezone?: string;
};
