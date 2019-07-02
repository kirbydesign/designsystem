export interface ToastConfig {
  message: string;
  messageType: MessageType;
  durationInMs?: number;
}

export type MessageType = 'success' | 'warning' | 'danger';
