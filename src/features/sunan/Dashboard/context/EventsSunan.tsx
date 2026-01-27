import { Dispatch, StateUpdater, useContext, useEffect, useState } from "preact/hooks";
import { createContext } from "preact";
import { EventApiResponse, RequestStatus, StatusEnum, StatusMesssageEnum } from "@/types";
import { log, time } from "@/lib/debug-log";
import toast from "react-hot-toast";
import { getEvent } from "@/core/get_event";

type EventType = [EventApiResponse.Event[], Dispatch<StateUpdater<EventApiResponse.Event[]>>, RequestStatus];
const CalenderSunan = createContext<EventType>([
  [],
  () => {},
  { message: StatusMesssageEnum.loading, status: StatusEnum.loading },
]);

export const EventsProvider = ({ children }: { children: any }) => {
  const [eventState, setEventState] = useState<EventApiResponse.Event[]>([]);
  const [statusState, setStatusState] = useState<RequestStatus>({
    message: StatusMesssageEnum.loading,
    status: StatusEnum.loading,
  });

  const init = async () => {
    const timeEnd = time("Getting calender events");
    try {
      const events = await getEvent();
      setEventState(events);
      setStatusState({ message: StatusMesssageEnum.success, status: StatusEnum.loading });
    } catch (error) {
      toast.error("Failed getting calender events. see console for details");
      setStatusState({ message: StatusMesssageEnum.failed, status: StatusEnum.failed });
      log(error, "error");
    }
    timeEnd();
  };

  useEffect(() => {
    init();
  }, []);
  return <CalenderSunan.Provider value={[eventState, setEventState, statusState]}>{children}</CalenderSunan.Provider>;
};

export const useEventContext = (): EventType => {
  const context = useContext<EventType>(CalenderSunan);
  if (!context) throw new Error("useSharedStorage must be used inside StorageProvider");
  return context;
};
