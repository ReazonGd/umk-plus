import { useContext, useEffect, useState } from "preact/hooks";
import { createContext } from "preact";
import { ClassData} from "@/types";
import { log, time } from "@/lib/debug-log";
import toast from "react-hot-toast";
import { getClassList } from "@/core/get_classlist";

type ClassListContextType = [ClassData[], (prev: ClassData[]) => void];
const ClassListSunan = createContext<ClassListContextType>([[], () => {}]);

export const ClassListProvider = ({ children }: { children: any }) => {
  const calenderState = useState<ClassData[]>([]);

  const init = async () => {
    const timeEnd = time("Getting class list");
    try {
      const classList = await getClassList();
      calenderState[1](classList);
    } catch (error) {
      toast.error("Failed getting class list. see console for details");
      log(error, "error");
    }
    timeEnd();
  };

  useEffect(() => {
    init();
  }, []);
  return <ClassListSunan.Provider value={calenderState}>{children}</ClassListSunan.Provider>;
};

export const useClassListContext = (): ClassListContextType => {
  const context = useContext<ClassListContextType>(ClassListSunan);
  if (!context) throw new Error("useSharedStorage must be used inside StorageProvider");
  return context;
};
