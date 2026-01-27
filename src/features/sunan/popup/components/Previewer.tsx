import { useEffect, useState } from "preact/hooks";
import prefiew_fetch from "../core/fetcher";
import { PopupSlideContext } from "./popupContext";
import Extractor, { PagesExtractor } from "../core/extractor";
import { PanelRight } from "lucide-preact";

export default function PreviewerContent() {
  const [popupSlide, setPopupSlide] = PopupSlideContext()
  const [res, setRes] = useState<PagesExtractor>({data:{}, url: "", title: "Not open anything"})
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
    if (res.url === popupSlide.url) return;
    setLoading(true)
    prefiew_fetch(popupSlide.url).then(Extractor).then(setRes).catch().finally(()=> setLoading(false))
  }, [popupSlide])

  useEffect(()=> {
    setPopupSlide((v) => ({...v, title: res.title}))
  }, [res])

  if (loading) return <div>sedang memproses...</div>
  if (!res.url) return <div>Click <PanelRight size={16} color="#454545" /> icon to open.</div>
  if (res.data.is_unreconize)  return <div>Sorry, we cant display it for now</div>;
  if (res.data.is_iframeable)  return <iframe src={res.url} width="100%" height="100%"></iframe>;
  if (res.data.__html)  return <div dangerouslySetInnerHTML={{__html: res.data.__html}}></div>;
}
