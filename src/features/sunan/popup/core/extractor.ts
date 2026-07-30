import { log } from "@/lib/debug-log";
import prefiew_fetch, { PrefiewFetcher } from "./fetcher";

export interface PagesExtractor {
  message?: string;
  url: string;
  title: string;
  data: {
    is_unreconize?: boolean;
    is_iframeable?: boolean;
    __html?: string;
  };
}

export default async function Extractor(res: PrefiewFetcher): Promise<PagesExtractor> {
  try {
    const path = new URL(res.url).pathname;

    switch (path) {
      case "/mod/assign/view.php":
        return { data: { __html: extract_main(res.text_content) }, url: res.url, title: "Assignment Viewer" };

      case "/mod/attendance/view.php":
        return { data: { __html: await extract_attendance(res.text_content) }, url: res.url, title: "Attendance Viewer" };

      case "/mod/resource/view.php":
        return { data: { __html: extract_resoure_page(res.text_content) }, url: res.url, title: "Assignment Viewer" }
      default:
        throw Error("cant handle url");
    }
  } catch (error) {
    log("cant open url because" + error, "info");
    return {
      url: res.url,
      title: "URL",
      data: {
        is_unreconize: true,
      },
      message: "unsopperted url",
    };
  }
}

function extract_main(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  return doc.querySelector("[role='main']")?.innerHTML ?? "";
}
function extract_resoure_page(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  return doc.querySelector(".resourcecontent")?.innerHTML ?? "";
}

async function extract_attendance(html: string): Promise<string> {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  let page = doc.querySelector("[role='main']");
  let all_open_attendance = Array.from(page?.querySelectorAll<HTMLAnchorElement>(".statuscol a") ?? []);

  log(all_open_attendance);
  if (!page) return "";

  // Process sequentially to avoid DOM mutation race conditions
  for (const link of all_open_attendance) {
    try {
      const res = await prefiew_fetch(link.href);
      const parser2 = new DOMParser();
      const doc2 = parser2.parseFromString(res.text_content, "text/html");
      const form = doc2.querySelector("form[action='https://sunan.umk.ac.id/mod/attendance/attendance.php']");

      if (form) {
        page.insertBefore(form.cloneNode(true) as HTMLFormElement, page.firstChild);
      } else {
        log(`Form not found for ${link.href}`, "warn");
      }
    } catch (error) {
      log(`Can't resolve attendance form for ${link.href}: ${error}`, "warn");
    }
  }

  return page?.innerHTML ?? "";
}
