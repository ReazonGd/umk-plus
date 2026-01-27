export function formatRemainingTime(date: Date): string {
  const now = new Date();

  const diff = date.getTime() - now.getTime();

  if (diff <= 0) return "Time has passed";

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} Day`;
  } else if (hours > 0) {
    return `${hours} Hour`;
  } else if (minutes > 0) {
    return `${minutes} minute`;
  } else {
    return `${seconds} secon`;
  }
}