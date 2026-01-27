import { Blocks, CalendarSync } from "lucide-preact";
import { render } from "preact";
import { Toaster } from "react-hot-toast";

function UpdateSchedule() {
  return (
    <div class="card">
      <div class="card-header" style={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <Blocks size={16} />
        <h5>UMK+</h5>
      </div>
      <div class="card-body table-border-style">
        <button class="btn text-bg-info">
            <CalendarSync size={16} />
            <p>Sinkronkan Jadwal</p>
        </button>
      </div>
    </div>
  );
}

function bootstrap() {
  const targetParent = document.querySelector("body > div.pc-container > div > div.row > div");
  if (!targetParent) return;
  const container = document.createElement("div");
  //   container.setAttribute("class", "py-2 border-0 border-dashed border-top border-secondary d-flex gap-2");
  targetParent.appendChild(container);
  container.id = "umk-plus";
  render(<UpdateSchedule />, container);
  render(<Toaster />, document.body);
}

setTimeout(bootstrap, 100);
