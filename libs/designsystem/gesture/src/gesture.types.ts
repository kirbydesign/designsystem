// These types are structural clones of `Gesture`, `GestureConfig`, `GestureDetail`
// and `GestureCallback` from `@ionic/core/components`. They are owned by Kirby so
// consumers of `@kirbydesign/designsystem/gesture` never need to import from
// `@ionic/*`. Keep them in sync with Ionic on every Ionic upgrade.

export interface Gesture {
  enable(enable?: boolean): void;
  destroy(): void;
}

export interface GestureDetail {
  type: string;
  startX: number;
  startY: number;
  startTime: number;
  currentX: number;
  currentY: number;
  velocityX: number;
  velocityY: number;
  deltaX: number;
  deltaY: number;
  currentTime: number;
  event: UIEvent;
  data?: any;
}

export type GestureCallback = (detail: GestureDetail) => boolean | void;

export interface GestureConfig {
  el: Node;
  disableScroll?: boolean;
  direction?: 'x' | 'y';
  gestureName: string;
  gesturePriority?: number;
  passive?: boolean;
  maxAngle?: number;
  threshold?: number;
  blurOnStart?: boolean;
  canStart?: GestureCallback;
  onWillStart?: (detail: GestureDetail) => Promise<void>;
  onStart?: GestureCallback;
  onMove?: GestureCallback;
  onEnd?: GestureCallback;
  notCaptured?: GestureCallback;
}
