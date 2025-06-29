import { useState, useEffect } from "preact/hooks";
import extensionStorage from "../localExtensionStorage";

export default function useLocalExtensionStorage(key: string, initialUseStateValue: string, initialStorageValue?: string) {
  const [value, setValue] = useState<string>(initialUseStateValue);

  useEffect(() => {
    // Get initial value from storage
    extensionStorage.get(key).then((result: string) => {
      if (result !== undefined) {
        setValue(result);
      } else {
        setValue(initialStorageValue ?? initialUseStateValue);
      }
    });

    // Listen for changes
    const handleChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes[key]) {
        setValue(changes[key].newValue);
      }
    };

    extensionStorage.setListener(handleChange);

    return () => {
      extensionStorage.removeListener(handleChange);
    };
  }, [key]);

  const updateValue = async (newValue: string) => {
    try {
      await extensionStorage.set(key, newValue);
      setValue(newValue);
    } catch (error) {
      console.error("Error updating storage:", error);
    }
  };

  return [value, updateValue] as const;
}
