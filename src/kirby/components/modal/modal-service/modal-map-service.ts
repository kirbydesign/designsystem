import { Injectable } from '@angular/core';

@Injectable()
export class ModalMapService {
  private modalDismissRefs: { [uid: number]: Function } = {};

  closeModal(uid: number, callback: Function) {
    this.modalDismissRefs[uid](callback);
    delete this.modalDismissRefs[uid];
  }

  registerModalCloseRef(uid: number, closeModal: Function) {
    this.modalDismissRefs[uid] = closeModal;
  }
}
