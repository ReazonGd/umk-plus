import { Dispatch, StateUpdater, useContext, useEffect, useState } from "preact/hooks";
import { createContext } from "preact";
import { PanelRight } from "lucide-preact";
import useMobile from "@/hooks/useMobile";

type UsedData = {
  is_open: boolean;
  url: string;
  title: string;
};
type Types = [UsedData, Dispatch<StateUpdater<UsedData>>];
const popupSlide = createContext<Types>([{ is_open: false, url: "", title: "" }, () => {}]);
export const PopupSlidePovider = ({ children }: { children: any }) => {
  const [data, setData] = useState<UsedData>({ is_open: false, url: "", title: "" });
  const isMobile = useMobile(900);

  useEffect(() => {
    const el = document.getElementById("page-wrapper");
    if (!el) return;
    if (data.is_open) el.style.maxWidth = "60%";
    else el.style.maxWidth = "";
  }, [data]);

  return (
    <popupSlide.Provider value={[data, setData]}>
      <div id="plus-popup">
        <div
          style={{
            position: "fixed",
            top: "70px",
            right: data.is_open ? "0" : isMobile ? "-100%" : "-40%",
            width: isMobile ? "100%" : "40%",
            height: "calc(100% - 70px)",
            boxShadow: "-2px 0 5px rgba(0,0,0,0.3)",
            transition: "right 0.3s ease",
            zIndex: "9999",
            overflowY: "auto",
            display: "flex",
          }}
        >
          <div
            style={{
              background: "#fff",
              gap: "10px",
              padding: "10px",
              border: "0px solid #AAAAAA",
              borderRight: "2px",
            }}
          >
            <div
              style={{ padding: "7px", background: "#E4E4E4" }}
              onClick={() => setData((p) => ({ ...p, is_open: !p.is_open }))}
            >
              <PanelRight size={16} color="#454545" />
            </div>
          </div>
          <div
            style={{
              background: "#f8f9fa",
              width: "100%",
              // borderRadius: "5px",
              height: "100%",
              overflow: "auto",
            }}
          >
            <div
              style={{
                background: "#fff",
                gap: "10px",
              }}
            >
              <div
                style={{ padding: "7px", fontWeight: 700 }}
                onClick={() => setData((p) => ({ ...p, is_open: !p.is_open }))}
              >
                {data.title}
              </div>
            </div>
            <div style={{ padding: "20px", height: "100%" }}>{children}</div>
          </div>
        </div>
      </div>
    </popupSlide.Provider>
  );
};

export const PopupSlideContext = (): Types => {
  const context = useContext<Types>(popupSlide);
  if (!context) throw new Error("useSharedStorage must be used inside StorageProvider");
  return context;
};
