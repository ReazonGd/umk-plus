declare const debug: boolean;

type debugLevel = "error" | "warn" | "info" | "log";

export function log(message: any, level: debugLevel = "info") {
  if (!debug) return;

  const timeStamp = new Date().toISOString();
  const prefix = `[${level.toUpperCase()}][${timeStamp}]`;

  switch (level) {
    case "error":
      console.error(prefix, message);
      break;
    case "warn":
      console.warn(prefix, message);
      break;
    case "info":
      console.info(prefix, message);
      break;
    default:
      console.log(prefix, message);
  }
}

export function inspect(obj: any, debug_level: debugLevel = "log") {
  if (!debug) return;

  switch (typeof obj) {
    case "object":
      log(JSON.stringify(obj), debug_level);
      break;
    case "undefined":
      log(obj, "warn");
      break;
    default:
      log(obj, debug_level);
  }
}

export function time(label: string) {
  console.time(label);
  return () => console.timeEnd(label)
}

// export default
