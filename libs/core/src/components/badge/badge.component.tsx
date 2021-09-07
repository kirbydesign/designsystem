import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';

import { ThemeColor } from '../../helpers';
@Component({
  tag: 'kirby-badge',
  styleUrl: 'badge.component.scss',
  shadow: true,
})
// tslint:disable-next-line: component-class-suffix
export class Badge implements ComponentInterface {
  @Prop() text: string;
  @Prop() themeColor: ThemeColor;

  render() {
    return (
      <Host class={this.themeColor}>
        <ion-badge>{this.text ? <span>{this.text}</span> : <slot />}</ion-badge>
      </Host>
    );
  }
}
