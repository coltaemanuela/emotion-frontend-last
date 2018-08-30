declare var module: NodeModule;

interface NodeModule {
  id: string;
}


declare interface MediaRecorderErrorEvent extends Event {
  name: string;
}

declare interface MediaRecorderDataAvailableEvent extends Event {
  data : any;
}

interface MediaRecorderEventMap {
  'dataavailable': MediaRecorderDataAvailableEvent;
  'error': MediaRecorderErrorEvent ;
  'pause': Event;
  'resume': Event;
  'start': Event;
  'stop': Event;
  'warning': MediaRecorderErrorEvent ;
}


declare class MediaRecorder extends EventTarget {
  

  // readonly mimeType: string;
  readonly MimeType: 'audio/wav';  // 'audio/vnd.wav';
  readonly state: 'inactive' | 'recording' | 'paused';
  readonly stream: MediaStream;
  ignoreMutedMedia: boolean;
  videoBitsPerSecond: number;
  // audioBitsPerSecond: 16000//number;
  audioBitsPerSecond: 1000000; // 1 Mbps
  bitsPerSecond: 1000000;
  bitsPerSample:16;
  
  ondataavailable: (event : MediaRecorderDataAvailableEvent) => void;
  onerror: (event: MediaRecorderErrorEvent) => void;
  onpause: () => void;
  onresume: () => void;
  onstart: () => void;
  onstop: () => void;

  constructor(stream: MediaStream);

  start();

  stop();

  resume();

  pause();

  isTypeSupported(type: string): boolean;

  requestData();

  addEventListener<K extends keyof MediaRecorderEventMap>(type: K, listener: (this: MediaStream, ev: MediaRecorderEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;

  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;

  removeEventListener<K extends keyof MediaRecorderEventMap>(type: K, listener: (this: MediaStream, ev: MediaRecorderEventMap[K]) => any, options?: boolean | EventListenerOptions): void;

  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
