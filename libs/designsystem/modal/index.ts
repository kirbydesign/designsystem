export * from './src/index';

/**
 * The exports below are not included in the entry exports of the modal module by design. This is to
 * make it possible for other kirby comoonents to use these exports, but prevent them from being exposed to the
 * implementer of the kirby library.
 */
// export {
//   ModalElementComponent,
//   ModalElementsAdvertiser,
//   ModalElementType,
// } from './src/modal/services/modal.interfaces';
// export { ModalNavigationService } from './src/modal/services/modal-navigation.service';
