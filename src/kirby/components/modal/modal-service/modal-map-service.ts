import { Injectable } from '@angular/core';

@Injectable()
export class ModalMapService {
  private modalDismissRefs: { [uid: number]: Function } = {};
  // private modalDismissRefs = {};
  // private fun: Function;

  closeModal(uid: number, callback: Function) {
    // this.fun(callback);
    this.modalDismissRefs[uid](callback);
  }

  registerModalCloseRef(uid: number, closeModal: Function) {
    // this.fun = closeModal;
    this.modalDismissRefs[uid] = closeModal;
  }
}
