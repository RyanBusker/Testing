// global.d.ts
declare global {
    interface Window {
      webkitSpeechRecognition: any; // Or use a more specific type if needed
    }
  }
  
export {};
  