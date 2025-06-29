import { Copy, LogOut, ScanBarcode } from "lucide-preact";
import { useEffect, useState } from "preact/hooks";
import toast from "react-hot-toast";
import Mlog from "../../../utils/fancy_log";

export default function StatInfo() {
  const [name, setName] = useState("asds");
  const [nim, setNIM] = useState("asd");

  useEffect(() => {
    const nama_nim_element = document.querySelector(".page-header-headings > h1").textContent;
    const [nim, ...nama] = nama_nim_element.split(" ");

    toast(`Selamat datang!  ${nama.join(" ")}!`, {
      icon: "👏",
    });
    setName(() => nama.join(" "));
    setNIM(() => nim);

    document.querySelector("#page-header .card").classList.add("d-none");
  }, []);

  const logoutHandler = () => {
    const logout_element = document.querySelector("#action-menu-1-menu > a:nth-child(7)");
    if (logout_element) {
      (logout_element as HTMLAnchorElement).click();
    }
  };

  const copyNIMHandler = () => {
    navigator.clipboard.writeText(nim);
    toast.success("NIM has Copied");
  };

  const scanBarcodeHandler = () => {};

  return (
    <div className="info row" style={{ justifyContent: "space-between" }}>
      <div className="name row">
        <p>{name}</p>
        <LogOut size={16} onClick={logoutHandler} />
      </div>
      <div className="nim row">
        <p>{nim}</p>
        <Copy size={16} onClick={copyNIMHandler} />
        <ScanBarcode size={16} onClick={scanBarcodeHandler} />
      </div>
    </div>
  );
}
