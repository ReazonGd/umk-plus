import { useState } from "preact/hooks";
import { JSXInternal } from "preact/src/jsx";

export default function Accordion({
  children,
  title,
  onChangeOpen,
}: {
  title: string;
  onChangeOpen?: (isOpen: boolean) => void;
} & JSXInternal.HTMLAttributes<HTMLDivElement>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="bg-white"
      style={{ height: isOpen ? "auto" : "57px", transition: "all 0.3s ease", overflow: "hidden" }}
    >
      <div
        className="fw-bold"
        style={{
          border: "#dbe0e5 solid 1px",
          borderRadius: "4px",
          padding: "16px 20px",
          marginBottom: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          color: "#000",
        }}
        onClick={() =>
          setIsOpen((prev) => {
            onChangeOpen?.(!prev);
            return !prev;
          })
        }
      >
        <b>{title}</b>
        <div
          style={{
            transition: "rotate 0.3s ease",
            rotate: isOpen ? "180deg" : "0deg",
            background: "white",
            width: "20px",
            height: "20px",
            backgroundImage:
              "url(data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxNiAxNicgZmlsbD0nIzM5NDY1Zic+PHBhdGggZmlsbC1ydWxlPSdldmVub2RkJyBkPSdNMS42NDYgNC42NDZhLjUuNSAwIDAgMSAuNzA4IDBMOCAxMC4yOTNsNS42NDYtNS42NDdhLjUuNSAwIDAgMSAuNzA4LjcwOGwtNiA2YS41LjUgMCAwIDEtLjcwOCAwbC02LTZhLjUuNSAwIDAgMSAwLS43MDh6Jy8+PC9zdmc+)",
          }}
        ></div>
      </div>
      <div style={{ display: isOpen ? "block" : "none", padding: "20px" }}>{children}</div>
    </div>
  );
}
