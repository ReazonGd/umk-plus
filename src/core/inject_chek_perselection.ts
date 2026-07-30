import toast from "react-hot-toast";

export default function inject_check_per_selection() {
  Array.from(document.querySelectorAll('li[id^="section-"].section'))
    .filter((pred) => pred.querySelector("form"))
    .forEach((el) => {
      let isAllDone = true;

      const check_for_all_done = () => {
        isAllDone = true;
        el.querySelectorAll("form").forEach((form) => {
          const isDone = form.completionstate.value == "0";
          if (!isDone) isAllDone = false;
        });

        if (isAllDone) {
          checkAllButton.classList.add("active");
        } else {
          checkAllButton.classList.remove("active");
        }
      };

      // Create observer for each form
      el.querySelectorAll("form").forEach((form) => {
        const completionInput = form.querySelector("input[name='completionstate']");
        if (!completionInput) return;

        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === "attributes" && mutation.attributeName === "value") {
              check_for_all_done();
            }
          });
        });

        // Start observing the input for value changes
        observer.observe(completionInput, {
          attributes: true,
          attributeFilter: ["value"],
        });
      });

      const container = el.querySelector("div.content");
      const checkAllButton = document.createElement("button");
      checkAllButton.innerHTML = "centang semua ✅";
      checkAllButton.className = "pdf-view-button m-l-3";
      checkAllButton.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        el.querySelectorAll("form").forEach((form) => {
          const isDone = form.completionstate.value == "0";
          if (isDone) return;
          form.querySelector("button")?.click();
        });
        toast.success(`Checked ${container?.querySelector("a")?.textContent} section`);
        check_for_all_done();
      };

      check_for_all_done();

      if (container) {
        container.insertBefore(checkAllButton,container.querySelector(".summary")!);
      }
    });
}
