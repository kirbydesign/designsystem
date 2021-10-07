import { Component, ComponentInterface, h, Host, Prop, Watch, State } from '@stencil/core';

import { ThemeColor } from '../../helpers';

export type CssClassMap = { [className: string]: boolean };

const getClassList = (classes: string | (string | null | undefined)[] | undefined): string[] => {
  if (classes !== undefined) {
    const array = Array.isArray(classes) ? classes : classes.split(' ');
    return array
      .filter((c) => c != null)
      .map((c) => (c as string).trim())
      .filter((c) => c !== '');
  }
  return [];
};

const getClassMap = (classes: string | string[] | undefined): CssClassMap => {
  const map: CssClassMap = {};
  getClassList(classes).forEach((c) => (map[c] = true));
  return map;
};

@Component({
  tag: 'kirby-badge',
  styleUrl: 'badge.component.scss',
  shadow: true,
})
// tslint:disable-next-line: component-class-suffix
export class Badge implements ComponentInterface {
  @Prop() text: string;

  @Prop() themeColor: ThemeColor;
  @Prop() size: 'sm' | 'md' = 'md';

  private get cssClass(): CssClassMap {
    return getClassMap([this.themeColor, this.size]);
  }

  private get badgeContent() {
    if (this.size !== 'sm') {
      return this.text ? <span>{this.text}</span> : <slot />;
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
