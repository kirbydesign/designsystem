export interface ToastConfig {
  message: string;
  messageType: MessageType;
  durationInMs?: number;
  animated?: boolean;
}

/**
 * 'danger' is deprecated. Use alert for critical events
 */
export type MessageType = 'success' | 'warning' | 'danger';
