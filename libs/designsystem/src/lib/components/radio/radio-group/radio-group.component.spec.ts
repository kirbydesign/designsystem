import { IonRadioGroup } from '@ionic/angular';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

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

    const dataScenarios = [
      {
        description: 'plain text',
        items: textItems,
        selected: textItems[defaultSelectedIndex],
      },
      {
        description: 'data items with default property names',
        items: dataItems,
        selected: dataItems[defaultSelectedIndex],
      },
    ];

    dataScenarios.forEach((dataScenario) => {
      describe(`when bound to ${dataScenario.description}`, () => {
        const templateScenarios = [
          {
            description: 'by default',
            template: `<kirby-radio-group [(value)]="selected" [items]="items"></kirby-radio-group>`,
          },
          {
            description: 'with slotted radios',
            template: `<kirby-radio-group [(value)]="selected">
                         <kirby-radio *ngFor="let item of items" [value]="item" [text]="item.text || item"></kirby-radio>
                       </kirby-radio-group>`,
          },
          {
            description: 'with item template',
            template: `<kirby-radio-group [(value)]="selected" [items]="items">
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
          describe(templateScenario.description, () => {
            let spectator: SpectatorHost<
              RadioGroupComponent,
              {
                items: string[] | defaultDataType[];
                selected: string | defaultDataType;
              }
            >;

            beforeEach(async () => {
              spectator = createHost(templateScenario.template, {
                hostProps: {
                  items: dataScenario.items,
                  selected: dataScenario.selected,
                },
              });

              ionRadioGroup = spectator.query(IonRadioGroup);
              const ionRadioGroupElement = spectator.query('ion-radio-group');
              await TestHelper.whenReady(ionRadioGroupElement);
              radios = spectator.queryAll(RadioComponent);
              ionRadioElements = spectator.queryAll('ion-radio');
            });

            it('should render all items', () => {
              expect(radios).toHaveLength(3);
              expect(ionRadioElements).toHaveLength(3);
            });

            if (templateScenario.description === 'by default') {
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

            if (templateScenario.description === 'with item template') {
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
                dataScenario.description !== 'plain text' &&
                templateScenario.description !== 'with slotted radios'
              ) {
                describe('when data items has disabled property', () => {
                  beforeEach(() => {
                    const itemsWithDisabledProperty = dataItems.map((item) => ({ ...item }));
                    itemsWithDisabledProperty[1].disabled = false;
                    itemsWithDisabledProperty[2].disabled = true;

                    spectator.setHostInput('items', itemsWithDisabledProperty);
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
          });
        });

        describe('when configured with selected index', () => {
          const templateScenarios = ['by default', 'with slotted radios'];

          templateScenarios.forEach((templateScenario) => {
            describe(templateScenario, () => {
              let spectator: SpectatorHost<
                RadioGroupComponent,
                { items: string[] | defaultDataType[]; selectedIndex: number }
              >;

              describe('through template one-time string initialization', () => {
                it('should set the value to the corresponding data item', () => {
                  const template =
                    templateScenario === 'by default'
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
                beforeEach(async () => {
                  const template =
                    templateScenario === 'by default'
                      ? `<kirby-radio-group
                          [items]="items"
                          [selectedIndex]="selectedIndex">
                        </kirby-radio-group>`
                      : `<kirby-radio-group [selectedIndex]="selectedIndex">
                           <kirby-radio *ngFor="let item of items" [value]="item" [text]="item.text || item"></kirby-radio>
                         </kirby-radio-group>`;
                  spectator = createHost(template, {
                    hostProps: {
                      items: dataScenario.items,
                      selectedIndex: defaultSelectedIndex,
                    },
                  });
                });

                it('should set the value to the corresponding data item', () => {
                  expect(spectator.component.value).toEqual(
                    dataScenario.items[defaultSelectedIndex]
                  );
                });

                describe('when changing selected index', () => {
                  const newSelectedIndex = 2;

                  beforeEach(async () => {
                    const ionRadioGroupElement = spectator.query('ion-radio-group');
                    await TestHelper.whenReady(ionRadioGroupElement);
                    radios = spectator.queryAll(RadioComponent);
                    ionRadioElements = spectator.queryAll('ion-radio');
                  });

                  it('should have correct new selected item', async () => {
                    spectator.setInput('selectedIndex', newSelectedIndex);
                    // Wait for radio checked attribute to be updated;
                    await TestHelper.whenTrue(() => radioChecked(2));

                    expect(spectator.component.value).toEqual(dataScenario.items[newSelectedIndex]);
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

              if (templateScenario === 'by default') {
                describe('through input properties', () => {
                  it('should set the value to the corresponding data item', () => {
                    spectator = createHost('<kirby-radio-group></kirby-radio-group>', {
                      props: { selectedIndex: defaultSelectedIndex, items: dataScenario.items },
                    });

                    expect(spectator.component.value).toEqual(
                      dataScenario.items[defaultSelectedIndex]
                    );
                  });
                });
              }
            });
          });
        });
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
