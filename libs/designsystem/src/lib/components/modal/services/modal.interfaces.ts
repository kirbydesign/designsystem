import { ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { KirbyAnimation } from '../../../animation/kirby-animation';

export interface OverlayEventDetail<T = any> {
  data?: T;
  role?: string;
}

export interface Overlay {
  dismiss: (data?: any) => Promise<boolean>;
  onWillDismiss: Promise<OverlayEventDetail>;
  onDidDismiss: Promise<OverlayEventDetail>;
}

export interface ModalRouteActivation {
  route: ActivatedRoute;
  isNewModal: boolean;
}

export abstract class Modal {
  didPresent: Promise<void>;
  willClose: Promise<void>;
  close: (data?: any) => Promise<void>;
  scrollToTop: (scrollDuration?: KirbyAnimation.Duration) => void;
  scrollToBottom: (scrollDuration?: KirbyAnimation.Duration) => void;
  scrollDisabled: boolean;
}

export abstract class ModalElementsAdvertiser {
  addTitle: (element: ElementRef<HTMLElement>) => void;
  removeTitle: (element: ElementRef<HTMLElement>) => void;

  addFooter: (element: ElementRef<HTMLElement>) => void;
  removeFooter: (element: ElementRef<HTMLElement>) => void;

  addPageProgress: (element: ElementRef<HTMLElement>) => void;
  removePageProgress: (element: ElementRef<HTMLElement>) => void;
}
