import { IonRadioGroup } from '@ionic/angular';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { Observable, of } from 'rxjs';

import { TestHelper } from '../../../testing/test-helper';
import { ListItemTemplateDirective } from '../../list/list.directive';
import { RadioComponent } from '../radio.component';

import { RadioGroupComponent } from './radio-group.component';

describe('RadioGroupComponent', () => {
  const createHost = createHostFactory({
    component: RadioGroupComponent,
    declarations: [RadioComponent, ListItemTemplateDirective],
    imports: [TestHelper.ionicModuleForTest],
  });

  describe('with plain binding', () => {
    type defaultDataType = { text: string; value: number; disabled?: boolean };

    let ionRadioGroup: IonRadioGroup;
    let ionRadioElements: HTMLIonRadioElement[];
    let radios: RadioComponent[];

    function radioChecked(index: number): boolean {
      return ionRadioElements[index].getAttribute('aria-checked') === 'true';
    }

    const defaultSelectedIndex = 1;

    const textItems: string[] = ['Larry', 'Curly', 'Moe'];

    const dataItems: defaultDataType[] = [
      { text: 'Larry', value: 1 },
      { text: 'Curly', value: 2 },
      { text: 'Moe', value: 3 },
    ];

    const enum DataScenarioTypes {
      TEXT = 'plain text',
      DATA = 'data items with default property names',
      ASYNC_DATA = 'async data items with default property names',
    }

    const enum TemplateScenarioTypes {
      DEFAULT = 'default item template',
      CUSTOM = 'custom item template',
      SLOTTED = 'slotted radios',
    }

    const dataScenarios = [
      {
        type: DataScenarioTypes.TEXT,
        items: textItems,
        selected: textItems[defaultSelectedIndex],
      },
      {
        type: DataScenarioTypes.DATA,
        items: dataItems,
        selected: dataItems[defaultSelectedIndex],
      },
      {
        type: DataScenarioTypes.ASYNC_DATA,
        items: dataItems,
        selected: dataItems[defaultSelectedIndex],
      },
    ];

    dataScenarios.forEach((dataScenario) => {
      describe(`when bound to ${dataScenario.type}`, () => {
        const itemsTemplateVar =
          dataScenario.type === DataScenarioTypes.ASYNC_DATA ? 'items$ | async' : 'items';
        const templateScenarios = [
          {
            type: TemplateScenarioTypes.DEFAULT,
            template: `<kirby-radio-group [(value)]="selected" [items]="${itemsTemplateVar}"></kirby-radio-group>`,
          },
          {
            type: TemplateScenarioTypes.SLOTTED,
            template: `<kirby-radio-group [(value)]="selected">
                         <kirby-radio *ngFor="let item of ${itemsTemplateVar}" [value]="item" [text]="item.text || item"></kirby-radio>
                       </kirby-radio-group>`,
          },
          {
            type: TemplateScenarioTypes.CUSTOM,
            template: `<kirby-radio-group [(value)]="selected" [items]="${itemsTemplateVar}">
                         <div style="display: flex; flex-direction: row;"
                           *kirbyListItemTemplate="let item; let selected = selected; let index = index"
                           [attr.is-selected]="selected"
                           [attr.index]="index"
                           class="item-template">
                           <kirby-radio
                             [value]="item"
                             [text]="item.text"
                             [disabled]="item.disabled">
                           </kirby-radio>
                           <p class="selected">{{selected}}</p>
                           <p class="index">{{index}}</p>
                         </div>
                       </kirby-radio-group>`,
          },
        ];
        templateScenarios.forEach((templateScenario) => {
          describe(`with ${templateScenario.type}`, () => {
            let spectator: SpectatorHost<
              RadioGroupComponent,
              {
                items: string[] | defaultDataType[];
                items$: Observable<string[] | defaultDataType[]>;
                selected: string | defaultDataType;
              }
            >;

            describe('and no pre-selected item', () => {
              beforeEach(async () => {
                spectator = createHost(templateScenario.template, {
                  hostProps: {
                    items: dataScenario.items,
                    items$: of(null),
                    selected: null,
                  },
                });

                // Set items$ observable after creation, to ensure async rendering:
                spectator.setHostInput('items$', of(dataScenario.items));

                ionRadioGroup = spectator.query(IonRadioGroup);
                const ionRadioGroupElement = spectator.query('ion-radio-group');
                await TestHelper.whenReady(ionRadioGroupElement);

                radios = spectator.queryAll(RadioComponent);
                ionRadioElements = spectator.queryAll('ion-radio');
                expect(radios).toHaveLength(dataScenario.items.length);
                expect(ionRadioElements).toHaveLength(dataScenario.items.length);
                await TestHelper.whenReady(ionRadioElements);
              });

              describe('selection', () => {
                beforeEach(async () => {
                  // Assert initial state:
                  expect(ionRadioGroup.value).toBeNull();
                  // Assert initial state of radios:
                  expect(radioChecked(0)).toBeFalse();
                  expect(radioChecked(1)).toBeFalse();
                  expect(radioChecked(2)).toBeFalse();
                });

                it('should not set the value of ion-radio-group', () => {
                  expect(ionRadioGroup.value).toBeNull();
                });

                it('should not have any selected radio', () => {
                  expect(radioChecked(0)).toBeFalse();
                  expect(radioChecked(1)).toBeFalse();
                  expect(radioChecked(2)).toBeFalse();
                });

                it('should not have selected index', () => {
                  expect(spectator.component.selectedIndex).toBe(-1);
                });

                it('should set the value to the corresponding data item when clicking a radio item', () => {
                  spectator.click(ionRadioElements[0]);
                  expect(spectator.component.value).toEqual(dataScenario.items[0]);
                });

                it('should update the bound field when clicking a radio item', () => {
                  spectator.click(ionRadioElements[0]);
                  expect(spectator.hostComponent.selected).toEqual(dataScenario.items[0]);
                });

                it('should emit change event when clicking a radio item', () => {
                  const onChangeSpy = spyOn(spectator.component.valueChange, 'emit');
                  spectator.click(ionRadioElements[0]);
                  expect(onChangeSpy).toHaveBeenCalledTimes(1);
                  expect(onChangeSpy).toHaveBeenCalledWith(dataScenario.items[0]);
                });

                it('should update the value of ion-radio-group when the bound field is updated', async () => {
                  spectator.setHostInput('selected', dataScenario.items[2]);
                  expect(ionRadioGroup.value).toEqual(dataScenario.items[2]);
                });

                it('should update the selected radio when the bound field is updated', async () => {
                  spectator.setHostInput('selected', dataScenario.items[2]);
                  // Wait for radio checked attribute to be updated;
                  await TestHelper.whenTrue(() => radioChecked(2));

                  expect(radioChecked(0)).toBeFalse();
                  expect(radioChecked(1)).toBeFalse();
                  expect(radioChecked(2)).toBeTrue();
                });

                it('should not emit change event when the bound field is updated', async () => {
                  const onChangeSpy = spyOn(spectator.component.valueChange, 'emit');
                  spectator.setHostInput('selected', dataScenario.items[2]);
                  expect(onChangeSpy).not.toHaveBeenCalled();
                });
              });

              describe('focus', () => {
                it('should focus the first radio when none is selected', async () => {
                  const firstRadio = ionRadioElements[0];
                  // Wait for tabindex to be rendered:
                  await TestHelper.whenTrue(() => firstRadio.tabIndex === 0);

                  spectator.component.focus();

                  expect(document.activeElement).toEqual(firstRadio);
                });
              });
            });

            describe('and pre-selected item', () => {
              beforeEach(async () => {
                spectator = createHost(templateScenario.template, {
                  hostProps: {
                    items: dataScenario.items,
                    items$: of(null),
                    selected: dataScenario.selected,
                  },
                });

                // Set items$ observable after creation, to ensure async rendering:
                spectator.setHostInput('items$', of(dataScenario.items));

                ionRadioGroup = spectator.query(IonRadioGroup);
                const ionRadioGroupElement = spectator.query('ion-radio-group');
                await TestHelper.whenReady(ionRadioGroupElement);

                radios = spectator.queryAll(RadioComponent);
                ionRadioElements = spectator.queryAll('ion-radio');
                expect(radios).toHaveLength(dataScenario.items.length);
                expect(ionRadioElements).toHaveLength(dataScenario.items.length);
                await TestHelper.whenReady(ionRadioElements);
              });

              it('should render all items', () => {
                expect(radios).toHaveLength(3);
                expect(ionRadioElements).toHaveLength(3);
              });

              if (templateScenario.type === TemplateScenarioTypes.DEFAULT) {
                it('should set the text of each radio to the corresponding text item / item´s `text` property', () => {
                  expect(radios[0].text).toEqual('Larry');
                  expect(radios[1].text).toEqual('Curly');
                  expect(radios[2].text).toEqual('Moe');
                });

                it('should set the value of each radio to the corresponding data item', () => {
                  expect(radios[0].value).toEqual(dataScenario.items[0]);
                  expect(radios[1].value).toEqual(dataScenario.items[1]);
                  expect(radios[2].value).toEqual(dataScenario.items[2]);
                });
              }

              if (templateScenario.type === TemplateScenarioTypes.CUSTOM) {
                it('should set template variable `selected` for each item', () => {
                  const templateWrappers = spectator.queryAll('div.item-template');
                  expect(templateWrappers[0]).toHaveAttribute('is-selected', 'false');
                  expect(templateWrappers[1]).toHaveAttribute('is-selected', 'true');
                  expect(templateWrappers[2]).toHaveAttribute('is-selected', 'false');
                });

                it('should set template variable `index` for each item', () => {
                  const templateWrappers = spectator.queryAll('div.item-template');
                  expect(templateWrappers[0]).toHaveAttribute('index', '0');
                  expect(templateWrappers[1]).toHaveAttribute('index', '1');
                  expect(templateWrappers[2]).toHaveAttribute('index', '2');
                });
              }

              describe('selection', () => {
                beforeEach(async () => {
                  // Assert initial state:
                  expect(ionRadioGroup.value).toBe(dataScenario.selected);
                  // Assert initial state of radios:
                  expect(radioChecked(0)).toBeFalse();
                  expect(radioChecked(1)).toBeTrue();
                  expect(radioChecked(2)).toBeFalse();
                });

                it('should set the value of ion-radio-group to the corresponding selected data item', () => {
                  expect(ionRadioGroup.value).toBe(dataScenario.selected);
                });

                it('should have selected radio corresponding to the selected data item', () => {
                  expect(radioChecked(0)).toBeFalse();
                  expect(radioChecked(1)).toBeTrue();
                  expect(radioChecked(2)).toBeFalse();
                });

                it('should have selected index corresponding to the selected data item', () => {
                  expect(spectator.component.selectedIndex).toBe(defaultSelectedIndex);
                });

                it('should set the value to the corresponding data item when clicking a radio item', () => {
                  spectator.click(ionRadioElements[0]);
                  expect(spectator.component.value).toEqual(dataScenario.items[0]);
                });

                it('should update the bound field when clicking a radio item', () => {
                  spectator.click(ionRadioElements[0]);
                  expect(spectator.hostComponent.selected).toEqual(dataScenario.items[0]);
                });

                it('should emit change event when clicking a radio item', () => {
                  const onChangeSpy = spyOn(spectator.component.valueChange, 'emit');
                  spectator.click(ionRadioElements[0]);
                  expect(onChangeSpy).toHaveBeenCalledTimes(1);
                  expect(onChangeSpy).toHaveBeenCalledWith(dataScenario.items[0]);
                });

                it('should update the value of ion-radio-group when the bound field is updated', async () => {
                  spectator.setHostInput('selected', dataScenario.items[2]);
                  expect(ionRadioGroup.value).toEqual(dataScenario.items[2]);
                });

                it('should update the selected radio when the bound field is updated', async () => {
                  spectator.setHostInput('selected', dataScenario.items[2]);
                  // Wait for radio checked attribute to be updated;
                  await TestHelper.whenTrue(() => radioChecked(2));

                  expect(radioChecked(0)).toBeFalse();
                  expect(radioChecked(1)).toBeFalse();
                  expect(radioChecked(2)).toBeTrue();
                });

                it('should not emit change event when the bound field is updated', async () => {
                  const onChangeSpy = spyOn(spectator.component.valueChange, 'emit');
                  spectator.setHostInput('selected', dataScenario.items[2]);
                  expect(onChangeSpy).not.toHaveBeenCalled();
                });
              });

              describe('enablement', () => {
                it('should not disable the radio items by default', () => {
                  radios.forEach((each) => expect(each.disabled).toBeUndefined());
                });

                it('should disable the radio items when the kirby-radio-group is disabled', () => {
                  spectator.setInput('disabled', true);
                  radios.forEach((each) => expect(each.disabled).toBeTrue());
                });

                it('should re-enable the radio items when the kirby-radio-group is enabled', () => {
                  spectator.setInput('disabled', true);
                  radios.forEach((each) => expect(each.disabled).toBeTrue());

                  spectator.setInput('disabled', false);
                  radios.forEach((each) => expect(each.disabled).toBeUndefined());
                });

                it('should disable the radio items if items are set after the kirby-radio-group is disabled', async () => {
                  spectator.setHostInput('items', null);
                  spectator.setInput('disabled', true);
                  await TestHelper.waitForTimeout(); // Wait a tick

                  spectator.setHostInput('items', dataScenario.items);
                  await TestHelper.waitForTimeout(); // Wait a tick

                  radios = spectator.queryAll(RadioComponent);
                  radios.forEach((each) => expect(each.disabled).toBeTrue());
                });

                if (
                  dataScenario.type !== DataScenarioTypes.TEXT &&
                  templateScenario.type !== TemplateScenarioTypes.SLOTTED
                ) {
                  describe('when data items has disabled property', () => {
                    beforeEach(() => {
                      const itemsWithDisabledProperty = dataItems.map((item) => ({ ...item }));
                      itemsWithDisabledProperty[1].disabled = false;
                      itemsWithDisabledProperty[2].disabled = true;

                      spectator.setHostInput('items', itemsWithDisabledProperty);
                      spectator.setHostInput('items$', of(itemsWithDisabledProperty));
                      radios = spectator.queryAll(RadioComponent);
                    });

                    it('should disable radio when the corresponding data item´s `disabled` property is true', () => {
                      expect(radios[0].disabled).toBeUndefined();
                      expect(radios[1].disabled).toBeFalse();
                      expect(radios[2].disabled).toBeTrue();
                    });

                    it('should disable the radio items when the kirby-radio-group is disabled', () => {
                      spectator.setInput('disabled', true);
                      radios.forEach((each) => expect(each.disabled).toBeTrue());
                    });

                    it('should only re-enable the radio items if the corresponding data item is not disabled when the kirby-radio-group is enabled', () => {
                      spectator.setInput('disabled', true);
                      radios.forEach((each) => expect(each.disabled).toBeTrue());

                      spectator.setInput('disabled', false);
                      expect(radios[0].disabled).toBeUndefined();
                      expect(radios[1].disabled).toBeFalse();
                      expect(radios[2].disabled).toBeTrue();
                    });
                  });
                }
              });

              describe('focus', () => {
                it('should focus the selected radio', async () => {
                  const selectedRadio = ionRadioElements[defaultSelectedIndex];
                  expect(selectedRadio.getAttribute('aria-checked')).toEqual('true');
                  // Wait for tabindex to be rendered:
                  await TestHelper.whenTrue(() => selectedRadio.tabIndex === 0);

                  spectator.component.focus();

                  expect(document.activeElement).toEqual(selectedRadio);
                });
              });

              describe('hasError', () => {
                it('should not have error state by default', () => {
                  expect(spectator.component.hasError).toBeFalse;
                  expect(spectator.element.classList).not.toContain('error');
                });

                it('should apply class `error` when hasError=true', () => {
                  spectator.setInput('hasError', true);
                  spectator.detectChanges();

                  expect(spectator.element.classList).toContain('error');
                });
              });

              describe('when updating items', () => {
                describe('by shifting items down', () => {
                  it('should have selected index corresponding to the selected data item', () => {
                    const newItems =
                      dataScenario.type === DataScenarioTypes.TEXT
                        ? ['New Guy'].concat(textItems)
                        : [{ text: 'New Guy', value: 10 }].concat(dataItems);

                    spectator.setHostInput('items', newItems);
                    spectator.setHostInput('items$', of(newItems));

                    expect(spectator.component.selectedIndex).toBe(defaultSelectedIndex + 1);
                  });
                });

                describe('by shifting items up', () => {
                  it('should have selected index corresponding to the selected data item', () => {
                    const newItems = dataScenario.items.slice(1);
                    spectator.setHostInput('items', newItems);
                    spectator.setHostInput('items$', of(newItems));

                    expect(spectator.component.selectedIndex).toBe(defaultSelectedIndex - 1);
                  });
                });

                describe('by removing items', () => {
                  it('should reset value and selected index', () => {
                    spectator.setHostInput('items', null);
                    spectator.setHostInput('items$', of(null));

                    expect(spectator.component.value).toBe(null);
                    expect(spectator.component.selectedIndex).toBe(-1);
                  });
                });

                if (dataScenario.type !== DataScenarioTypes.TEXT) {
                  describe('by replacing items with new instances', () => {
                    it('should reset value and selected index', () => {
                      const newItems = dataItems.map((item) => ({
                        ...item,
                        value: item.value + 10,
                      }));
                      spectator.setHostInput('items', newItems);
                      spectator.setHostInput('items$', of(newItems));

                      expect(spectator.component.value).toBe(null);
                      expect(spectator.component.selectedIndex).toBe(-1);
                    });
                  });
                }
              });
            });
          });
        });

        if (dataScenario.type !== DataScenarioTypes.ASYNC_DATA) {
          describe('and configured with selected index', () => {
            const templateScenarios = [
              TemplateScenarioTypes.DEFAULT,
              TemplateScenarioTypes.SLOTTED,
            ];

            templateScenarios.forEach((templateScenario) => {
              describe(`with ${templateScenario}`, () => {
                let spectator: SpectatorHost<
                  RadioGroupComponent,
                  { items: string[] | defaultDataType[]; selectedIndex: number }
                >;

                describe('through template one-time string initialization', () => {
                  it('should set the value to the corresponding data item', () => {
                    const template =
                      templateScenario === TemplateScenarioTypes.DEFAULT
                        ? `<kirby-radio-group
                          [items]="items"
                          selectedIndex="${defaultSelectedIndex}">
                        </kirby-radio-group>`
                        : `<kirby-radio-group selectedIndex="${defaultSelectedIndex}">
                           <kirby-radio *ngFor="let item of items" [value]="item" [text]="item.text || item"></kirby-radio>
                         </kirby-radio-group>`;
                    spectator = createHost(template, {
                      hostProps: {
                        items: dataScenario.items,
                        selectedIndex: null,
                      },
                    });

                    expect(spectator.component.value).toEqual(
                      dataScenario.items[defaultSelectedIndex]
                    );
                  });
                });

                describe('through template property binding', () => {
                  const template =
                    templateScenario === TemplateScenarioTypes.DEFAULT
                      ? `<kirby-radio-group
                      [items]="items"
                      [selectedIndex]="selectedIndex">
                    </kirby-radio-group>`
                      : `<kirby-radio-group [selectedIndex]="selectedIndex">
                       <kirby-radio *ngFor="let item of items" [value]="item" [text]="item.text || item"></kirby-radio>
                     </kirby-radio-group>`;
                  const createHostFromScenario = (
                    items = dataScenario.items,
                    selectedIndex = defaultSelectedIndex
                  ) =>
                    createHost(template, {
                      hostProps: {
                        items,
                        selectedIndex,
                      },
                    });

                  it('should set the value to the corresponding data item', async () => {
                    spectator = createHostFromScenario();

                    expect(spectator.component.value).toEqual(
                      dataScenario.items[defaultSelectedIndex]
                    );
                  });

                  it('set the value to the corresponding data item when setting items after selected index', () => {
                    spectator = createHostFromScenario(null, defaultSelectedIndex);
                    expect(spectator.component.value).toBeNull();

                    spectator.setHostInput('items', dataScenario.items);

                    expect(spectator.component.value).toEqual(
                      dataScenario.items[defaultSelectedIndex]
                    );
                  });

                  it('set the value to the corresponding data item when setting selected index after items', () => {
                    spectator = createHostFromScenario(dataScenario.items, null);
                    expect(spectator.component.value).toBeNull();

                    spectator.setHostInput('selectedIndex', defaultSelectedIndex);

                    expect(spectator.component.value).toEqual(
                      dataScenario.items[defaultSelectedIndex]
                    );
                  });

                  describe('when changing selected index', () => {
                    const newSelectedIndex = 2;

                    beforeEach(async () => {
                      spectator = createHostFromScenario();
                      const ionRadioGroupElement = spectator.query('ion-radio-group');
                      await TestHelper.whenReady(ionRadioGroupElement);
                      radios = spectator.queryAll(RadioComponent);
                      ionRadioElements = spectator.queryAll('ion-radio');
                    });

                    it('should have correct new selected item', async () => {
                      spectator.setInput('selectedIndex', newSelectedIndex);
                      // Wait for radio checked attribute to be updated;
                      await TestHelper.whenTrue(() => radioChecked(2));

                      expect(spectator.component.value).toEqual(
                        dataScenario.items[newSelectedIndex]
                      );
                      expect(radioChecked(0)).toBeFalse();
                      expect(radioChecked(1)).toBeFalse();
                      expect(radioChecked(2)).toBeTrue();
                    });

                    it('should not emit change event', () => {
                      const onChangeSpy = spyOn(spectator.component.valueChange, 'emit');

                      spectator.setInput('selectedIndex', newSelectedIndex);

                      expect(onChangeSpy).not.toHaveBeenCalled();
                    });
                  });
                });

                if (templateScenario === TemplateScenarioTypes.DEFAULT) {
                  describe('through input properties', () => {
                    it('should set the value to the corresponding data item', () => {
                      spectator = createHost('<kirby-radio-group></kirby-radio-group>', {
                        props: { selectedIndex: defaultSelectedIndex, items: dataScenario.items },
                      });

                      expect(spectator.component.value).toEqual(
                        dataScenario.items[defaultSelectedIndex]
                      );
                    });

                    it('set the value to the corresponding data item when setting items after selected index', () => {
                      spectator = createHost('<kirby-radio-group></kirby-radio-group>');
                      spectator.setInput('selectedIndex', defaultSelectedIndex);
                      spectator.setInput('items', dataScenario.items);

                      expect(spectator.component.value).toEqual(
                        dataScenario.items[defaultSelectedIndex]
                      );
                    });

                    it('set the value to the corresponding data item when setting selected index after items', () => {
                      spectator = createHost('<kirby-radio-group></kirby-radio-group>');
                      spectator.setInput('items', dataScenario.items);
                      spectator.setInput('selectedIndex', defaultSelectedIndex);

                      expect(spectator.component.value).toEqual(
                        dataScenario.items[defaultSelectedIndex]
                      );
                    });
                  });
                }
              });
            });
          });
        }
      });
    });

    describe('when bound to data items with custom property names', () => {
      type customDataType = { title: string; value: number; isNotSelectable?: boolean };

      let spectator: SpectatorHost<RadioGroupComponent, { items: customDataType[] }>;

      const customDataItems = [
        { title: 'Larry', value: 1 },
        { title: 'Curly', value: 2, isNotSelectable: false },
        { title: 'Moe', value: 3, isNotSelectable: true },
      ];

      beforeEach(async () => {
        spectator = createHost(
          `<kirby-radio-group
            [items]="items"
            itemTextProperty="title"
            itemDisabledProperty="isNotSelectable">
           </kirby-radio-group>`,
          {
            hostProps: {
              items: customDataItems,
            },
          }
        );

        ionRadioGroup = spectator.query(IonRadioGroup);
        const ionRadioGroupElement = spectator.query('ion-radio-group');
        await TestHelper.whenReady(ionRadioGroupElement);
        radios = spectator.queryAll(RadioComponent);
      });

      it('should set the text of each radio to the corresponding data item´s `title` property', () => {
        expect(radios[0].text).toEqual('Larry');
        expect(radios[1].text).toEqual('Curly');
        expect(radios[2].text).toEqual('Moe');
      });

      it('should set the value of each radio to the corresponding data item', () => {
        expect(radios[0].value).toEqual(customDataItems[0]);
        expect(radios[1].value).toEqual(customDataItems[1]);
        expect(radios[2].value).toEqual(customDataItems[2]);
      });

      it('should disable radio when the corresponding data item´s `isNotSelectable` property is true', () => {
        expect(radios[0].disabled).toBeUndefined();
        expect(radios[1].disabled).toBeFalse();
        expect(radios[2].disabled).toBeTrue();
      });
    });
  });
});
