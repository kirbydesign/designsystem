import { Injectable } from '@angular/core';

@Injectable()
export class ModalCloserService {
  private modalCloseRefs: { [uid: number]: Function } = {};

  closeModal(uid: number, data?: any): void {
    if (!this.modalCloseRefs[uid]) {
      throw Error(`No modal was registered with uid: ${uid}.`);
    }
    this.modalCloseRefs[uid](data);
    delete this.modalCloseRefs[uid];
  }

  registerModalCloseRef(uid: number, closeModal: Function): void {
    this.modalCloseRefs[uid] = closeModal;
  }
}
