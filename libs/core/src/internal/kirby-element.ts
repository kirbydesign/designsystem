import { LitElement } from 'lit';

export default class KirbyElement extends LitElement {
  static define(name: string, elementConstructor = this) {
    const currentlyRegisteredConstructor = customElements.get(name) as CustomElementConstructor;
    if (!currentlyRegisteredConstructor) {
      window.customElements.define(name, elementConstructor);
    }
  }
}
