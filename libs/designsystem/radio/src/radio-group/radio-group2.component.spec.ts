import { createHostFactory, Spectator } from '@ngneat/spectator';

import { TestHelper } from '@kirbydesign/designsystem/testing';

import { RadioModule } from '../radio-module';
import { RadioGroupComponent } from './radio-group.component';

const ionRadioTagName = 'ion-radio';
const kirbyRadioTagName = 'kirby-radio';
const ionRadioGroupTagName = 'ion-radio-group';

fdescribe('RadioGroupComponent', () => {
  let createHost;
  createHost = createHostFactory({
    component: RadioGroupComponent,
    imports: [TestHelper.ionicModuleForTest, RadioModule],
    detectChanges: true,
  });

  describe('Default', () => {
    const defaultTemplate = `<kirby-radio-group [items]="['Bacon', 'Salami', 'Tenderloin']"></kirby-radio-group>`;

    let spectator: Spectator<RadioGroupComponent>;
    beforeEach(() => {
      spectator = createHost(defaultTemplate);
    });

    it(`should have 3 'kirby-radio' items`, () => {
      const radioElements = spectator.queryAll(ionRadioTagName);

      expect(radioElements.length).toBe(3);
    });

    it(`should have item 1 in the list selected`, async () => {
      const ionRadioGroupElement = spectator.query('ion-radio-group');
      await TestHelper.whenReady(ionRadioGroupElement);

      const [radioElementOne, radioElementTwo, radioElementThree] =
        spectator.queryAll(ionRadioTagName);

      spectator.click(radioElementOne);

      await TestHelper.whenTrue(() => isRadioChecked(radioElementOne));
      expect(isRadioChecked(radioElementOne)).toEqual(true);
      expect(isRadioChecked(radioElementTwo)).toEqual(false);
      expect(isRadioChecked(radioElementThree)).toEqual(false);
    });

    it(`should have item 2,  then item 1 in the list selected`, async () => {
      const ionRadioGroupElement = spectator.query('ion-radio-group');
      await TestHelper.whenReady(ionRadioGroupElement);

      const [radioElementOne, radioElementTwo, radioElementThree] =
        spectator.queryAll(ionRadioTagName);

      spectator.click(radioElementTwo);

      await TestHelper.whenTrue(() => isRadioChecked(radioElementTwo));
      expect(isRadioChecked(radioElementOne)).toEqual(false);
      expect(isRadioChecked(radioElementTwo)).toEqual(true);
      expect(isRadioChecked(radioElementThree)).toEqual(false);

      spectator.click(radioElementOne);

      await TestHelper.whenTrue(() => isRadioChecked(radioElementOne));
      expect(isRadioChecked(radioElementOne)).toEqual(true);
      expect(isRadioChecked(radioElementTwo)).toEqual(false);
      expect(isRadioChecked(radioElementThree)).toEqual(false);
    });
  });

  describe('States', () => {
    const stateCheckedTemplate = `<kirby-radio-group value="bacon"> <kirby-radio value="bacon" text="Checked"></kirby-radio></kirby-radio-group>`;
    const stateDisabledTemplate = `<kirby-radio-group><kirby-radio [disabled]="true" text="Disabled"></kirby-radio></kirby-radio-group>`;
    const stateHasErrorTemplate = `<kirby-radio-group [hasError]="true"><kirby-radio text="Has error"></kirby-radio></kirby-radio-group>`;

    it('should set item to checked by default', async () => {
      const spectator: Spectator<RadioGroupComponent> = createHost(stateCheckedTemplate);

      const radioElement = spectator.query(ionRadioTagName);
      await TestHelper.whenTrue(() => isRadioChecked(radioElement));

      expect(isRadioChecked(radioElement)).toEqual(true);
    });

    it('should set item to disabled by default', async () => {
      const spectator: Spectator<RadioGroupComponent> = createHost(stateDisabledTemplate);
      const ionRadioGroupElement = spectator.query('ion-radio-group');
      await TestHelper.whenReady(ionRadioGroupElement);

      const radioElement = spectator.query(ionRadioTagName);
      await TestHelper.whenTrue(() => isRadioDisabled(radioElement));

      expect(isRadioDisabled(radioElement)).toEqual(true);
    });

    it('should set item to have error by default', async () => {
      const spectator: Spectator<RadioGroupComponent> = createHost(stateHasErrorTemplate);
      const ionRadioGroupElement = spectator.query('ion-radio-group');
      await TestHelper.whenReady(ionRadioGroupElement);

      const radioElement = spectator.query(ionRadioTagName);
      const radioIcon = radioElement.shadowRoot.querySelector('[part=container]');

      await TestHelper.whenTrue(() => radioHasError(radioIcon));

      expect(isRadioDisabled(radioElement)).toEqual(false);
    });
  });

  describe('Sizes', () => {
    const sizesTemplate = `
  <kirby-radio-group>
    <kirby-radio size="xs" text="Extra Small"></kirby-radio>
    <kirby-radio size="sm" text="Small"></kirby-radio>
    <kirby-radio size="md" text="Medium (default)"></kirby-radio>
  <kirby-radio-group>`;

    let spectator: Spectator<RadioGroupComponent>;
    beforeEach(() => {
      spectator = createHost(sizesTemplate);
    });

    it('should have size xs', () => {
      const xsKirbyRadio = spectator.query(kirbyRadioTagName);

      expect(xsKirbyRadio.clientHeight).toBe(32);
    });

    it('should have size sm', () => {
      const [_, smKirbyRadio] = spectator.queryAll(kirbyRadioTagName);

      expect(smKirbyRadio.clientHeight).toBe(44);
    });

    it('should have size md', () => {
      const [_, x, mdKirbyRadio] = spectator.queryAll(kirbyRadioTagName);

      expect(mdKirbyRadio.clientHeight).toBe(56);
    });
  });

  describe('Simple data binding', () => {
    const simpleDataBindingTemplate = `
    <kirby-radio-group
  [items]="items"
  itemTextProperty="title"
  [value]="selected"
  (valueChange)="onChange($event)">
</kirby-radio-group>`;

    const items = [
      { title: 'Bacon', value: 1 },
      { title: 'Salami', value: 2 },
      { title: 'Tenderloin', value: 3 },
      { title: 'Veggie (not an option)', value: 4, disabled: true },
    ];

    let spectator: Spectator<RadioGroupComponent>;
    beforeEach(() => {
      spectator = createHost(simpleDataBindingTemplate, {
        hostProps: {
          title: 'Radio Group simple data binding',
          items,
          // selected: items[0],
        },
      });
    });

    it('should create 4 radio buttons', async () => {
      const ionRadioGroupElement = spectator.query(ionRadioGroupTagName);
      await TestHelper.whenReady(ionRadioGroupElement);

      expect(ionRadioGroupElement.children.length).toBe(4);
    });

    fit(`should set item 1 as defalt checked, with 'selected' property`, async () => {
      spectator.component.value = items[0];
      spectator.detectChanges();

      const [radioElementOne, radioElementTwo, radioElementThree, radioElementFour] =
        spectator.queryAll(ionRadioTagName);

      await TestHelper.whenTrue(() => isRadioChecked(radioElementOne));

      expect(isRadioChecked(radioElementOne)).toEqual(true);
      expect(isRadioChecked(radioElementTwo)).toEqual(false);
      expect(isRadioChecked(radioElementThree)).toEqual(false);
      expect(isRadioChecked(radioElementFour)).toEqual(false);
    });

    it(`should set item 1 as defalt checked, with 'selectedIndex' property`, async () => {
      const spectator = createHost(simpleDataBindingTemplate, {
        hostProps: {
          title: 'Radio Group simple data binding',
          items,
          selectedIndex: 0,
        },
      });

      const [radioElementOne, radioElementTwo, radioElementThree, radioElementFour] =
        spectator.queryAll(ionRadioTagName);

      await TestHelper.whenTrue(() => isRadioChecked(radioElementOne));

      expect(isRadioChecked(radioElementOne)).toEqual(true);
      expect(isRadioChecked(radioElementTwo)).toEqual(false);
      expect(isRadioChecked(radioElementThree)).toEqual(false);
      expect(isRadioChecked(radioElementFour)).toEqual(false);
    });
  });
});

/**
 * Returns true if the given radio element is checked, false otherwise.
 *
 * @param radioElement the radio element to check
 * @return true if the radio element is checked, false otherwise
 */

const isRadioChecked = (radioElement: Element): boolean =>
  radioElement.getAttribute('aria-checked') === 'true';

/**
 * Returns whether a radio element is disabled.
 *
 * @param radioElement The radio element.
 * @returns Whether the radio element is disabled.
 */
const isRadioDisabled = (radioElement: Element): boolean =>
  radioElement.classList.contains('radio-disabled');

/**
 * Returns true if the radio button is in error state
 *
 * @param radioElement - Element to check
 * @return - true if the radio button is in error state
 */

const radioHasError = (radioElement: Element): boolean =>
  getComputedStyle(radioElement).borderColor === 'rgb(255, 89, 94)'; // Returns true if the radio button is in error state
