import { LitElement } from 'lit';

export default class KirbyElement extends LitElement {
  static define(name = this.tagName, elementConstructor = this) {
    if (!name) {
      console.error(
        'Custom element name is missing. Please ensure class inheriting from `KirbyElement` has static the `tagName` property set to a valid custom element name.'
      );
    }
    const currentlyRegisteredConstructor = customElements.get(name) as CustomElementConstructor;
    if (!currentlyRegisteredConstructor) {
      window.customElements.define(name, elementConstructor);
    }
  }

  static tagName?: string;
}
