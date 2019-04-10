import { Injectable } from '@angular/core';

@Injectable()
export class ModalMapService {
  private modalDismissRefs: { [uid: number]: Function } = {};

  closeModal(uid: number, callback: Function): void {
    this.modalDismissRefs[uid](callback);
    delete this.modalDismissRefs[uid];
  }

  registerModalCloseRef(uid: number, closeModal: Function): void {
    this.modalDismissRefs[uid] = closeModal;
  }
}
