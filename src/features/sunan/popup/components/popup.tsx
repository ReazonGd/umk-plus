import { useEffect } from "preact/hooks";
import { PopupSlideContext, PopupSlidePovider } from "./popupContext";
import PreviewerContent from "./Previewer";

export default function Popup_slider() {

  return (
    <div>
      <PopupSlidePovider>
        <PreviewerContent />
        <ViewButtonInjector />
      </PopupSlidePovider>
    </div>
  );
}

function ViewButtonInjector() {
  const [_, setPopupSlide] = PopupSlideContext()

  function enhanceLinks(links: HTMLAnchorElement[]) {
    links.forEach((link) => {
      if (link.dataset.popupSlider === "true") return;
      link.dataset.popupSlider = "true";

      const viewButton = document.createElement("button");
      viewButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-right-open-icon lucide-panel-right-open"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/><path d="m10 15-3-3 3-3"/></svg>';
      viewButton.className = "pdf-view-button btn";

      viewButton.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setPopupSlide({
          is_open: true,
          title: "Test",
          url: link.href
        })
      };

      link.parentNode?.insertBefore(viewButton, link.nextSibling);
    });
  }

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      let shouldRefresh = false;

      for (const mutation of mutations) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          shouldRefresh = true;
          break;
        }
      }

      if (shouldRefresh) {
        enhanceLinks(findLinks());
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return <></>
}

function findLinks() {
  const queries: string[] = [
    "[role='main'] a[href*='/mod/assign/view.php']",
    "[role='main'] a[href*='/mod/attendance/view.php']",
    "[role='main'] a[href*='/mod/attendance/attendance.php']",
    "[role='main'] a:has(img[src*='pdf-24'])"];
  const allLink = Array.from(document.querySelectorAll<HTMLAnchorElement>(queries.join(",")));

  return allLink;
}
