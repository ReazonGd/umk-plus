export enum localExtensionStorageName {
  dashboard_image = "image-stat",
  schedule = "schedule",
  saved_calender = "saved-calender-data",
  enable_notif = "enable-notif",
  is_after_login = "is-after-login",
  config = "config",
  studentInfo = "student-info"
}
export interface ExtensionConfig {
  pages_script: {
    login_page: boolean;
    my_page: boolean;
    course_view_page: boolean;
    pdf_preview: boolean;
    auto_update_scedule: boolean;
  };
  scedule: {
    last_update: string;
  };
  isReady: boolean;
}