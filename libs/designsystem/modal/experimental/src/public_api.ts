export { ModalRoutingExperimentalComponent } from './modal-routing/modal-routing.component';
export { ModalExperimentalComponent } from './modal/modal.component';
export { ModalFooterExperimentalComponent } from './footer/footer.component';
export { ModalWrapperExperimentalComponent } from './wrapper/wrapper.component';
export {
  // This export (ModalExperimentalController) will cause an error in the mock providers for testing-jest & testing-jasmine. When this error occurs, fix the import manually.
  ModalExperimentalController,
  ModalExperimentalConfig,
} from './services/modal.controller';

export { KirbyModalModule } from './kirby-modal.module';

/**
 * This export is temporary and will be removed when the sizes for the modal are defined.
 * See comment section on issue #2825 for more information.
 */
export type SizeTemp = 'md';
