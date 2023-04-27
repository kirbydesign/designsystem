export { ModalV2RoutingComponent } from './modal-routing/modal-routing.component';
export { ModalV2Component } from './modal/modal.component';
export { ModalV2FooterComponent } from './footer/footer.component';
export { Flavor, ModalV2WrapperComponent } from './wrapper/wrapper.component';
export { ModalV2Controller, ModalV2Config } from './services/modal.controller';
export * from './kirby-modal.module';

/**
 * This export is temporary and will be removed when the sizes for the modal are defined.
 * See comment section on issue #2825 for more information.
 */
export type SizeTemp = 'md';
