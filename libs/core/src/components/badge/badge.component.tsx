import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';

import { ThemeColor } from '../../helpers';
import { createClassMap, CssClassMap } from '../../helpers/css-classes-helper';
import { BadgeSize } from './badge.types';

@Component({
  tag: 'kirby-badge',
  styleUrl: 'badge.component.scss',
  shadow: true,
})
// tslint:disable-next-line: component-class-suffix
export class Badge implements ComponentInterface {
  @Prop() text: string;

  @Prop() themeColor: ThemeColor;
  @Prop() size: BadgeSize = 'md';

  private get cssClass(): CssClassMap {
    return createClassMap([this.size, this.themeColor]);
  }

  private get badgeContent() {
    if (this.size === 'sm') {
      return <span></span>;
    } else if (this.text) {
      return <span>{this.text}</span>;
    } else {
      return <slot />;
    }
  }

  render() {
    return (
      <Host class={this.cssClass}>
        <ion-badge>{this.badgeContent}</ion-badge>
      </Host>
    );
  }
}
