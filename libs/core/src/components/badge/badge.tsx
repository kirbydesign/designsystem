import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core';
@Component({
  tag: 'kirby-badge',
  styleUrl: 'badge.scss',
  shadow: true,
})
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
