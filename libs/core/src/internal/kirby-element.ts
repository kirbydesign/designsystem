import { LitElement } from 'lit';

export default class KirbyElement extends LitElement {
  static define(name: string = this.tagName, elementConstructor = this) {
    const currentlyRegisteredConstructor = customElements.get(name) as CustomElementConstructor;
    if (!currentlyRegisteredConstructor) {
      window.customElements.define(name, elementConstructor);
    }
  }

  static tagName?: string;
}
