import { Component } from '@angular/core';

export interface ModalContent {
  title: string;
  titleHorizontalAlignment?: 'left' | 'center';
  closeIcon?: 'close' | 'arrow';
  dim?: number;
  component: any;
}
