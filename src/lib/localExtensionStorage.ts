const app = chrome || window.browser;

const extensionStorage = {
  get(key: string): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      app.storage.local.get([key], (result: any) => {
        resolve(result?.[key]);
        return;
      });
    });
  },

  async set(key: string, value: string) {
    await app.storage.local.set({ [key]: value });
  },

  setListener(cb: (changes: { [key: string]: chrome.storage.StorageChange }) => void) {
    app.storage.onChanged.addListener(cb);
  },

  removeListener(cb: (changes: { [key: string]: chrome.storage.StorageChange }) => void) {
    app.storage.onChanged.removeListener(cb);
  },
};

export default extensionStorage;
