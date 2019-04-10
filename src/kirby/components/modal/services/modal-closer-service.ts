import { Injectable } from '@angular/core';

@Injectable()
export class ModalCloserService {
  private modalCloseRefs: { [uid: number]: Function } = {};

  closeModal(uid: number, callback: Function): void {
    this.modalCloseRefs[uid](callback);
    delete this.modalCloseRefs[uid];
  }

  registerModalCloseRef(uid: number, closeModal: Function): void {
    this.modalCloseRefs[uid] = closeModal;
  }
}
