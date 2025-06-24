export {};

declare global {
  interface Window {
    electronAPI: {
      readConfig: () => Promise<any>;
      saveConfig: (data: any) => Promise<void>;
    };
  }
}
