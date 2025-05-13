import { useState, useEffect } from "preact/hooks";

const browser = window.browser || chrome;

export default function useLocalExtensionStorage<T>(key: string, initialUseStateValue: T, initialStorageValue?: T) {
  const [value, setValue] = useState<T>(initialUseStateValue);

  useEffect(() => {
    // Get initial value from storage
    browser.storage.local.get([key], (result) => {
      if (result[key] !== undefined) {
        setValue(result[key]);
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

    browser.storage.onChanged.addListener(handleChange);

    return () => {
      browser.storage.onChanged.removeListener(handleChange);
    };
  }, [key]);

  const updateValue = async (newValue: T) => {
    try {
      await browser.storage.local.set({ [key]: newValue });
      setValue(newValue);
    } catch (error) {
      console.error("Error updating storage:", error);
    }
  };

  return [value, updateValue] as const;
}
