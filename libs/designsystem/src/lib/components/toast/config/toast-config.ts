export interface ToastConfig {
  message: string;
  messageType: MessageType;
  durationInMs?: number;
  animated?: boolean;
}

export type MessageType = 'success' | 'warning';
