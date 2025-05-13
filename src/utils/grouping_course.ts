import { days, GroupedScheduleItem, classData, Schedule, Dayname } from "../type";

export function sortScheduleAndClasses(day: Dayname, schedule: Schedule[], classList: classData[]): GroupedScheduleItem[] {
  const currentDayIndex = days.indexOf(day);
  const reorderedDays = [...days.slice(currentDayIndex), ...days.slice(0, currentDayIndex)];
  const classMap = new Map(classList.map((cls) => [cls.code, cls]));

  const groupedClasses: GroupedScheduleItem[] = reorderedDays.map((day) => {
    const daySchedule = schedule.filter((item) => item.day_code === day);

    const dayClasses = daySchedule.map((schedItem) => classMap.get(schedItem.code + schedItem.class)).filter((cls): cls is classData => cls !== undefined);
    return {
      day_name: day,
      classData: dayClasses,
    };
  });

  const classesWithoutCode = classList.filter((cls) => !cls.code);
  if (classesWithoutCode.length > 0) {
    groupedClasses.push({
      classData: classesWithoutCode,
      day_name: "none",
    });
    // groupedClasses[groupedClasses.length - 1].classData.push(...classesWithoutCode);
  }

  return groupedClasses;
}
