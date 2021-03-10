import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';
@Component({
  tag: 'kirby-badge',
  styleUrl: 'badge.scss',
  shadow: true,
})
// tslint:disable-next-line: component-class-suffix
export class Badge implements ComponentInterface {
  @Prop() text: string;

  render() {
    return (
      <Host>
        <ion-badge>{this.text ? <span>{this.text}</span> : <slot />}</ion-badge>
      </Host>
    );
  }
}
