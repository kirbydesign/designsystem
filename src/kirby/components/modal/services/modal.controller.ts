import { Injectable, ViewContainerRef } from '@angular/core';
import { isObservable, Observable, of } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

import { IModalController } from './modal.controller.interface';
import { ModalHelper } from './modal.helper';
import { AlertHelper } from './alert.helper';
import { ActionSheetHelper } from './action-sheet.helper';
import { ComponentProps, ModalConfig } from '../modal-wrapper/config/modal-config';
import { ActionSheetConfig } from '../action-sheet/config/action-sheet-config';
import { AlertConfig } from '../alert/config/alert-config';
import { ActionSheetItem } from '@kirbydesign/designsystem/modal';

@Injectable()
export class ModalController implements IModalController {
  private modals: { close: (data?: any) => {} }[] = [];

  constructor(
    private modalHelper: ModalHelper,
    private actionSheetHelper: ActionSheetHelper,
    private alertHelper: AlertHelper
  ) {}

  public showModal(
    config: ModalConfig,
    vcRef: ViewContainerRef = null,
    onCloseModal?: (data?: any) => void
  ): void {
    const modalCloseEvent: Promise<any> = this.modalHelper.showModalWindow(
      config,
      vcRef,
      this.register.bind(this)
    );
    modalCloseEvent.then((data) => {
      this.forgetTopmost();
      if (onCloseModal) {
        // Since Ionic wraps the return value in an object, which contains data as a property, we need to return data.data
        // We don't expect this on native, hence we return just data
        onCloseModal(typeof data === 'object' && 'data' in data ? data.data : data);
      }
    });
  }

  public showActionSheet(
    config: ActionSheetConfig,
    vcRef: ViewContainerRef = null,
    onCloseModal?: (data?: any) => void
  ): void {
    this.actionSheetHelper.showActionSheet(config, vcRef, this.register.bind(this)).then((data) => {
      this.forgetTopmost();
      if (onCloseModal) {
        onCloseModal(typeof data === 'object' && 'data' in data ? data.data : data);
      }
    });
  }

  public showAlert(config: AlertConfig, onCloseModal?: (result?: boolean) => void) {
    this.alertHelper.showAlert(config).then((result) => {
      if (onCloseModal) {
        onCloseModal(result);
      }
    });
  }

  public register(modal: { close: (data?: any) => {} }): void {
    this.modals.push(modal);
  }

  public hideTopmost(data?: any): void {
    const modal = this.modals[this.modals.length - 1];
    if (!modal) {
      throw new Error('No modal windows are currently registered');
    }
    modal.close(data);
  }

  private forgetTopmost(): void {
    this.modals.pop();
  }

  public hideAll(): void {
    this.modals.forEach((modal) => modal.close());
  }

  /**
   * Exposes RxJs-operators to work with modals, drawers and alerts from Observables.
   */
  public operators = {
    /**
     * An RxJs-operator that can display a modal, or a drawer (depending upon configuration)
     *
     * - It passes the input of pipe to [ComponentProps] of the modal
     * - It outputs based on the response (callback) from the modal (based on user interaction)
     * - It completes the output Observable, when the user interacted with (discarded the) modal
     *
     * Example usage:
     * ```ts
     * const obs$ = ... // some observable is constructed.
     * obs$.pipe(
     *     map((value) => ({ data: value })),
     *     modalController.operators.showModal(config)
     *  )
     *  .subscribe((res) => console.log('The response from the modal is:', res);
     * ```
     *
     * @param config the configuration (or Observable of configuration) to pass to the modal
     */
    showModal: (config: ModalConfig | Observable<ModalConfig>) => (
      source: Observable<ComponentProps>
    ) => {
      const controller = this;

      const config$ = isObservable(config) ? config : of(config);
      return new Observable((observer) => {
        return source.pipe(withLatestFrom(config$)).subscribe({
          next([componentProps, config]) {
            const clonedConfig = { ...config };
            clonedConfig.componentProps = { ...config.componentProps, ...componentProps };
            controller.showModal(clonedConfig, null, (data) => {
              observer.next(data);
              observer.complete();
            });
          },
          error(err) {
            observer.error(err);
          },
          complete() {
            // Intentionally left empty, closing the modal also completes the stream
          },
        });
      });
    },

    /**
     * An RxJs-operator that can display an action sheet.
     *
     * - It determines the actions to display, based on the input of [ActionItem]s (array)
     * - It outputs based on the response (callback) from the action sheet (based on the selected action)
     * - It completes the output Observable, when the user has made a selection (or discarded the) action sheet
     *
     * Example usage:
     * ```ts
     * const obs$ = ... // some observable is constructed.
     * obs$.pipe(
     *     map((value) => { ... }), // map to an array of ActionSheetItems
     *     modalController.operators.showActionSheet(config)
     *  )
     *  .subscribe((res) => console.log('The response from the action sheet is:', res);
     * ```
     *
     * @param config the configuration (or Observable of configuration) to pass to the action sheet
     */
    showActionSheet: (config: ActionSheetConfig | Observable<ActionSheetConfig>) => (
      source: Observable<ActionSheetItem[]>
    ) => {
      const controller = this;

      const config$ = isObservable(config) ? config : of(config);
      return new Observable((observer) => {
        return source.pipe(withLatestFrom(config$)).subscribe({
          next([items, config]) {
            const clonedConfig = { ...config, items: [] };
            clonedConfig.items = [...config.items, ...items];
            controller.showActionSheet(clonedConfig, null, (data) => {
              observer.next(data);
              observer.complete();
            });
          },
          error(err) {
            observer.error(err);
          },
          complete() {
            // Intentionally left empty, closing the action sheet also completes the stream
          },
        });
      });
    },

    /**
     * An RxJs-operator that can display an alert.
     *
     * - It outputs based on the response (callback) from the action sheet (based on the selected action)
     * - It completes the output Observable, when the user has made a selection (or discarded the) alert
     *
     * Example usage:
     * ```ts
     * const obs$ = ... // some observable is constructed.
     * obs$.pipe(
     *     modalController.operators.showAlert(config)
     *  )
     *  .subscribe((res) => console.log('The response from the alert is:', res);
     * ```
     *
     * @param config the configuration (or Observable of configuration) to pass to the alert
     */
    showAlert: (config: AlertConfig | Observable<AlertConfig>) => (source: Observable<any>) => {
      const controller = this;

      const config$ = isObservable(config) ? config : of(config);
      return new Observable((observer) => {
        return source.pipe(withLatestFrom(config$)).subscribe({
          next([_, config]) {
            controller.showAlert(config, (data) => {
              observer.next(data);
              observer.complete();
            });
          },
          error(err) {
            observer.error(err);
          },
          complete() {
            // Intentionally left empty, closing the alert also completes the stream
          },
        });
      });
    },
  };
}
