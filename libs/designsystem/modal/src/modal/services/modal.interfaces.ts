import { AfterViewInit, Component, ElementRef, OnDestroy, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { KirbyAnimation } from '@kirbydesign/designsystem/helpers';
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
export enum ModalElementType {
  PAGE_PROGRESS,
  FOOTER,
  TITLE,
}

export abstract class ModalElementsAdvertiser {
  addModalElement: (type: ModalElementType, elementRef: ElementRef<HTMLElement>) => void;
  removeModalElement: (type: ModalElementType, elementRef: ElementRef<HTMLElement>) => void;
}

@Component({ template: '' })
export abstract class ModalElementComponent implements AfterViewInit, OnDestroy {
  private get isContainedInModal() {
    return this.modalElementsAdvertiser !== null;
  }

  constructor(
    private modalElementType: ModalElementType,
    private elementRef: ElementRef<HTMLElement>,
    @Optional() private modalElementsAdvertiser: ModalElementsAdvertiser
  ) {}

  ngAfterViewInit() {
    if (this.isContainedInModal) {
      this.modalElementsAdvertiser.addModalElement(this.modalElementType, this.elementRef);
    }
  }

  ngOnDestroy() {
    if (this.isContainedInModal) {
      this.modalElementsAdvertiser.removeModalElement(this.modalElementType, this.elementRef);
    }
  }
}
