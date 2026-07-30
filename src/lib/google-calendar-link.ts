import { GoogleCalendarEventParams } from "@/types";

/**
 * Format Date ke format Google Calendar:
 * YYYYMMDDTHHmmssZ
 */
function formatGoogleDate(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

/**
 * Generate Google Calendar event link
 */
export function generateGoogleCalendarLink({
  title,
  description = "",
  location = "",
  startDate,
  endDate,
  timezone,
}: GoogleCalendarEventParams): string {
  // default durasi 1 jam kalau endDate tidak ada
  const finalEndDate =
    endDate ??
    new Date(startDate.getTime() + 60 * 60 * 1000);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details: description,
    location,
    dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(finalEndDate)}`,
  });

  if (timezone) {
    params.set("ctz", timezone);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Buka Google Calendar di tab baru
 */
export function openGoogleCalendarEvent(
  params: GoogleCalendarEventParams
) {
  const url = generateGoogleCalendarLink(params);

  window.open(url, "_blank", "noopener,noreferrer");
}