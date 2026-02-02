import { log } from "@/lib/debug-log";
import { MatkulDetail } from "@/types/krs";
import { render } from "preact";
import toast, { Toaster } from "react-hot-toast";

function autoclick() {
  try {
    // weird one. idk how it work.
    const saved_scedule: MatkulDetail[] = JSON.parse(JSON.parse(localStorage.getItem("mykrs") ?? "[]"));
    if (!saved_scedule.length) return;

    const allOptions = Array.from(document.querySelectorAll("table tr")).filter((s) => s.querySelector("input"));
    const savedClasses: string[] = [];

    console.log(saved_scedule);
    for (const makul of saved_scedule) {
      savedClasses.push(`${makul.kode}${makul.kelas}`);
    }
    log(savedClasses);
    // saved_scedule.forEach((makul) => {
    // });

    for (const savedClass of savedClasses) {
      for (const optionElement of allOptions) {
        const kode = optionElement.querySelector("td:nth-child(2)")?.textContent.trim();
        const kelas = optionElement.querySelector("td:nth-child(3)")?.textContent.trim();

        if (savedClass === `${kode}${kelas}`) {
          optionElement.querySelector("input")?.click();
          break;
        }
      }
    }

    toast.success("aoutomation complete!");
  } catch (error) {
    log(error, "error");
  }
}

function bootstap() {
  const container = document.createElement("div");
  document.body.append(container);

  autoclick();
  render(<Toaster position="top-right" reverseOrder={false} />, container);
}

setTimeout(bootstap, 100);
