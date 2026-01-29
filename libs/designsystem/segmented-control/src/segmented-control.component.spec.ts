import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { TestHelper } from '@kirbydesign/designsystem/testing';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs';
import { SegmentItem } from './segment-item';
import { SegmentedControlComponent, SegmentedControlMode } from './segmented-control.component';

const fatFingerSize = DesignTokenHelper.fatFingerSize;

@Component({
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
class OnPushHostComponent {}

describe('SegmentedControlComponent', () => {
  let component: SegmentedControlComponent;
  const items: SegmentItem[] = [
    {
      text: 'First item',
      id: 'first',
      badge: {
        content: '2',
        themeColor: 'danger',
      },
    },
    {
      text: 'Second item',
      id: 'second',
    },
    {
      text: 'Third item',
      id: 'third',
    },
  ];

  let spectator: SpectatorHost<SegmentedControlComponent>;
  let ionSegmentElement: HTMLIonSegmentElement;

  describe('used standalone', () => {
    const createHost = createHostFactory({
      component: SegmentedControlComponent,
      imports: [TestHelper.ionicModuleForTest, ThemeColorDirective],
    });

    beforeEach(async () => {
      spectator = createHost(
        `<kirby-segmented-control [items]="items" [selectedIndex]="selectedIndex" [mode]="mode">
         </kirby-segmented-control>`,
        {
          hostProps: {
            items: items,
            selectedIndex: 1,
          },
        }
      );
      component = spectator.component;

      ionSegmentElement = spectator.queryHost<HTMLIonSegmentElement>('ion-segment');
      await TestHelper.whenReady(ionSegmentElement);
      await TestHelper.whenReady(spectator.queryHostAll('ion-segment-button'));
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have checked item as value when created', () => {
      expect(component.value).toBe(items[1]);
    });

    describe('keyboard interaction', () => {
      describe('when navigating with keyboard', () => {
        let initSelectedSegmentButton: HTMLIonSegmentButtonElement;
        beforeEach(async () => {
          initSelectedSegmentButton = spectator.queryHost<HTMLIonSegmentButtonElement>(
            'ion-segment-button.segment-button-checked'
          );
          await initSelectedSegmentButton.setFocus();
        });

        it('should focus previous item when ArrowLeft is pressed', () => {
          spectator.keyboard.pressKey('ArrowLeft', ionSegmentElement, 'keydown');

          expect(document.activeElement).toEqual(initSelectedSegmentButton.previousElementSibling);
        });

        it('should focus next item when ArrowRight is pressed', () => {
          spectator.keyboard.pressKey('ArrowRight', ionSegmentElement, 'keydown');

          expect(document.activeElement).toEqual(initSelectedSegmentButton.nextElementSibling);
        });

        it('should focus first item when Home is pressed', async () => {
          const lastSegmentButton = spectator.queryHost<HTMLIonSegmentButtonElement>(
            'ion-segment-button:last-of-type'
          );
          await lastSegmentButton.setFocus();
          expect(document.activeElement).toEqual(lastSegmentButton);

          spectator.keyboard.pressKey('Home', ionSegmentElement, 'keydown');

          const firstSegmentButton = spectator.queryHost('ion-segment-button:first-of-type');
          expect(document.activeElement).toEqual(firstSegmentButton);
        });

        it('should focus last item when End is pressed', async () => {
          const firstSegmentButton = spectator.queryHost<HTMLIonSegmentButtonElement>(
            'ion-segment-button:first-of-type'
          );
          await firstSegmentButton.setFocus();
          expect(document.activeElement).toEqual(firstSegmentButton);

          spectator.keyboard.pressKey('End', ionSegmentElement, 'keydown');

          const lastSegmentButton = spectator.queryHost('ion-segment-button:last-of-type');
          expect(document.activeElement).toEqual(lastSegmentButton);
        });

        it('should select focused item when Space is pressed', async () => {
          spectator.keyboard.pressKey('ArrowLeft', ionSegmentElement, 'keydown');
          const focusedItem = initSelectedSegmentButton.previousElementSibling;
          expect(document.activeElement).toEqual(focusedItem);

          const spaceKey = ' '; // Ionic tests for a blank space instead of 'Space'
          spectator.keyboard.pressKey(spaceKey, ionSegmentElement, 'keydown');
          // Wait for Ionic to update css classes
          await TestHelper.whenTrue(() => focusedItem.classList.contains('segment-button-checked'));

          expect(focusedItem).toHaveClass('segment-button-checked');
        });

        it('should select focused item when Enter is pressed', async () => {
          spectator.keyboard.pressKey('ArrowRight', ionSegmentElement, 'keydown');
          const focusedItem = initSelectedSegmentButton.nextElementSibling;
          expect(document.activeElement).toEqual(focusedItem);

          spectator.keyboard.pressKey('Enter', ionSegmentElement, 'keydown');
          // Wait for Ionic to update css classes
          await TestHelper.whenTrue(() => focusedItem.classList.contains('segment-button-checked'));

          expect(focusedItem).toHaveClass('segment-button-checked');
        });
      });
      describe('with checked item', () => {
        it('should have only 1 tab stop', async () => {
          const segmentButtons =
            spectator.queryHostAll<HTMLIonSegmentButtonElement>('ion-segment-button');

          const segmentButtonsWithTabStop = segmentButtons.filter(
            (button) => !button.hasAttribute('tabindex')
          );
          const segmentButtonsWithoutTabStop = segmentButtons.filter(
            (button) => button.getAttribute('tabindex') === '-1'
          );
          expect(segmentButtonsWithTabStop).toHaveLength(1);
          expect(segmentButtonsWithoutTabStop).toHaveLength(segmentButtons.length - 1);
        });

        it('should set selected segment button as tab stop', async () => {
          const selectedSegmentButton = spectator.queryHost<HTMLIonSegmentButtonElement>(
            'ion-segment-button.segment-button-checked'
          );
          expect(selectedSegmentButton).not.toHaveAttribute('tabindex');
        });

        it('should remove tab stop when focused', async () => {
          const selectedSegmentButton = spectator.queryHost<HTMLIonSegmentButtonElement>(
            'ion-segment-button.segment-button-checked'
          );
          expect(selectedSegmentButton).not.toHaveAttribute('tabindex');

          await selectedSegmentButton.setFocus();
          spectator.detectComponentChanges();

          expect(selectedSegmentButton).toHaveAttribute('tabindex', '-1');
        });

        it('should add tab stop when blurred', async () => {
          const selectedSegmentButton = spectator.queryHost<HTMLIonSegmentButtonElement>(
            'ion-segment-button.segment-button-checked'
          );
          await selectedSegmentButton.setFocus();
          spectator.detectComponentChanges();
          expect(selectedSegmentButton).toHaveAttribute('tabindex', '-1');

          selectedSegmentButton.blur();
          spectator.detectComponentChanges();

          expect(selectedSegmentButton).not.toHaveAttribute('tabindex');
        });
      });

      describe('with no checked item', () => {
        beforeEach(() => {
          spectator.setHostInput('selectedIndex', -1);
        });

        it('should have only 1 tab stop', async () => {
          const segmentButtons =
            spectator.queryHostAll<HTMLIonSegmentButtonElement>('ion-segment-button');

          const segmentButtonsWithTabStop = segmentButtons.filter(
            (button) => !button.hasAttribute('tabindex')
          );
          const segmentButtonsWithoutTabStop = segmentButtons.filter(
            (button) => button.getAttribute('tabindex') === '-1'
          );
          expect(segmentButtonsWithTabStop).toHaveLength(1);
          expect(segmentButtonsWithoutTabStop).toHaveLength(segmentButtons.length - 1);
        });

        it('should set first segment button as tab stop', async () => {
          const firstSegmentButton = spectator.queryHost<HTMLIonSegmentButtonElement>(
            'ion-segment-button:first-of-type'
          );
          expect(firstSegmentButton).not.toHaveAttribute('tabindex');
        });

        it('should remove tab stop when focused', async () => {
          const focusableSegmentButton = spectator.queryHost<HTMLIonSegmentButtonElement>(
            'ion-segment-button:not([tabindex])'
          );

          await focusableSegmentButton.setFocus();
          spectator.detectComponentChanges();

          expect(focusableSegmentButton).toHaveAttribute('tabindex', '-1');
        });

        it('should add tab stop when blurred', async () => {
          const focusableSegmentButton = spectator.queryHost<HTMLIonSegmentButtonElement>(
            'ion-segment-button:not([tabindex])'
          );
          await focusableSegmentButton.setFocus();
          spectator.detectComponentChanges();
          expect(focusableSegmentButton).toHaveAttribute('tabindex', '-1');

          focusableSegmentButton.blur();
          spectator.detectComponentChanges();

          expect(focusableSegmentButton).not.toHaveAttribute('tabindex');
        });
      });
    });

    describe('in chip mode', () => {
      it('should have ion-segment with same width as segmented control', () => {
        spectator.setHostInput('mode', SegmentedControlMode.chip);
        const ionSegment = spectator.queryHost('ion-segment') as HTMLElement;

        expect(spectator.element.offsetWidth).toEqual(ionSegment.offsetWidth);
      });
    });

    const testModes = [
      SegmentedControlMode.default,
      SegmentedControlMode.chip,
      SegmentedControlMode.compactChip,
    ];

    testModes.forEach((testMode) => {
      describe(`in '${testMode}' mode`, () => {
        beforeEach(() => {
          spectator.setHostInput('mode', testMode);
        });

        it(`should have a '${testMode}' mode when created`, () => {
          expect(component.mode).toBe(testMode);
        });

        it('should have an ion-segment control', () => {
          expect(spectator.queryHost('ion-segment')).toBeDefined();
        });

        it('should have a segment button per item', () => {
          expect(spectator.queryHostAll('ion-segment-button').length).toBe(items.length);
        });

        it('should call onSegmentSelect when ionChange event fires', () => {
          expect(component.value).toBe(items[1]);
          spyOn(component, 'onSegmentSelect');
          const changeEvent = new CustomEvent('ionChange', { detail: { value: items[0].id } });
          ionSegmentElement.dispatchEvent(changeEvent);
          expect(component.onSegmentSelect).toHaveBeenCalledWith(items[0].id);
        });

        it('should set value to event.detail.value when ionChange event fires', () => {
          expect(component.value).toBe(items[1]);
          const changeEvent = new CustomEvent('ionChange', { detail: { value: items[2].id } });
          ionSegmentElement.dispatchEvent(changeEvent);
          expect(component.value).toBe(items[2]);
        });

        it('should have touch area with minimum size equal to fat finger size', () => {
          const touchArea = window.getComputedStyle(
            spectator.element.querySelector('ion-segment-button'),
            '::after'
          );

          expect(parseInt(touchArea.height)).toBeGreaterThanOrEqual(parseInt(fatFingerSize()));
          expect(parseInt(touchArea.width)).toBeGreaterThanOrEqual(parseInt(fatFingerSize()));
        });

        describe('when updating items', () => {
          it('should not emit segmentSelect event', () => {
            const onSegmentSelectSpy = spyOn(component.segmentSelect, 'emit');

            const clonedItems = JSON.parse(JSON.stringify(items));
            spectator.setHostInput({ items: clonedItems });
            expect(onSegmentSelectSpy).not.toHaveBeenCalled();
          });

          it("should keep it's checked item when updating items with same value", async () => {
            const clonedItems = JSON.parse(JSON.stringify(items));
            spectator.setHostInput({ items: clonedItems });
            await TestHelper.whenReady(spectator.queryHostAll('ion-segment-button'));

            const expectedItem = clonedItems[1];
            const selectedSegmentButton = spectator.queryHost<HTMLIonSegmentButtonElement>(
              'ion-segment-button.segment-button-checked'
            );
            expect(selectedSegmentButton).not.toBeNull();
            expect(selectedSegmentButton.value).toBe(expectedItem.id);
            expect(selectedSegmentButton).toHaveExactTrimmedText(expectedItem.text);
          });

          it("should keep it's checked item when updating items with same value but new badge", async () => {
            const clonedItems = JSON.parse(JSON.stringify(items));
            clonedItems[0].badge = {
              content: '1',
              themeColor: 'success',
            };
            spectator.setHostInput({ items: clonedItems });
            await TestHelper.whenReady(spectator.queryHostAll('ion-segment-button'));

            const expectedItem = clonedItems[1];
            const selectedSegmentButton = spectator.queryHost<HTMLIonSegmentButtonElement>(
              'ion-segment-button.segment-button-checked'
            );
            expect(selectedSegmentButton).not.toBeNull();
            expect(selectedSegmentButton.value).toBe(expectedItem.id);
            expect(selectedSegmentButton).toHaveExactTrimmedText(expectedItem.text);
            const badge = spectator.queryHost<HTMLIonSegmentButtonElement>(
              'ion-segment-button:first-child > kirby-badge'
            );
            expect(badge).toHaveExactTrimmedText('1');
            expect(badge).toHaveClass('success');
          });
        });

        it('should set the correct value when changing the selected-index', () => {
          spectator.setHostInput('selectedIndex', 2);

          expect(component.value).toBe(items[2]);
        });

        it('should invoke the selected-index-change when changing the selected-index', () => {
          const subscriber = jasmine.createSpy('subcriber');
          spectator.output('selectedIndexChange').subscribe(subscriber);

          spectator.setHostInput('selectedIndex', 2);

          expect(subscriber).toHaveBeenCalledTimes(1);
        });

        it('should set the correct value when changing the selected-index in segment-select call-back', fakeAsync(() => {
          spectator
            .output('segmentSelect')
            .subscribe(() => spectator.setHostInput('selectedIndex', 2));

          spectator.dispatchMouseEvent('ion-segment-button:first-of-type', 'click');
          tick();

          expect(component.value).toBe(items[2]);
        }));
      });
    });
  });

  describe('SegmentedControl with ariaLabel', () => {
    const itemsWithAriaLabel: SegmentItem[] = [
      {
        text: 'First Item',
        id: 'first',
        ariaLabel: 'First item aria label',
      },
      {
        text: 'Second item',
        id: 'second',
      },
    ];

    let spectator: SpectatorHost<SegmentedControlComponent>;

    const createHost = createHostFactory({
      component: SegmentedControlComponent,
      imports: [TestHelper.ionicModuleForTest],
    });

    beforeEach(() => {
      spectator = createHost(
        `<kirby-segmented-control [items]="items">
         </kirby-segmented-control>`,
        { hostProps: { items: itemsWithAriaLabel } }
      );
    });

    it('should render aria-label on segment button with ariaLabel when defined', () => {
      const segmentButtons = spectator.queryHostAll('ion-segment-button');
      expect(segmentButtons[0].getAttribute('aria-label')).toBe(itemsWithAriaLabel[0].ariaLabel);
    });

    it('should render aria-label on segment button with text when ariaLabel undefined', () => {
      const segmentButtons = spectator.queryHostAll('ion-segment-button');
      expect(segmentButtons[1].getAttribute('aria-label')).toBe(null);
    });
  });

  describe('SegmentedControl with Badge', () => {
    const itemsWithBadge: SegmentItem[] = [
      {
        text: 'First Item',
        id: 'first',
        badge: {
          content: '1',
          themeColor: 'danger',
        },
      },
      {
        text: 'Second item',
        id: 'second',
        badge: {
          icon: 'attach',
          themeColor: 'danger',
        },
      },
      {
        text: 'Third item',
        id: 'third',
        badge: {
          content: '1',
          icon: 'attach',
          themeColor: 'danger',
        },
      },
    ];

    let spectator: SpectatorHost<SegmentedControlComponent>;

    const createHost = createHostFactory({
      component: SegmentedControlComponent,
      imports: [TestHelper.ionicModuleForTest],
    });

    beforeEach(() => {
      spectator = createHost(
        `<kirby-segmented-control [items]="items">
         </kirby-segmented-control>`,
        { hostProps: { items: itemsWithBadge } }
      );
    });

    it('should render a badge per item with badge property defined', () => {
      spectator.setHostInput({ items: itemsWithBadge });

      expect(spectator.queryHostAll('kirby-badge').length).toBe(itemsWithBadge.length);
    });

    it('should render badge with content (text-string)', () => {
      const item: SegmentItem = itemsWithBadge[0];

      const badgeElement: HTMLElement = spectator.query('kirby-badge');

      expect(badgeElement.innerText.trim).toContainText(item.badge.content);
    });

    it('should render icon in badge with correct name', () => {
      const item: SegmentItem = itemsWithBadge[1];

      const iconComponent = spectator.debugElement.query(
        By.directive(IconComponent)
      ).componentInstance;

      expect(iconComponent.name).toBe(item.badge.icon);
    });

    it('should render badge with icon if both icon and content is provided', () => {
      spectator.setHostInput({ items: [itemsWithBadge[2]] });
      const iconComponent = spectator.debugElement.query(
        By.directive(IconComponent)
      ).componentInstance;

      expect(iconComponent).toBeDefined();
    });
  });

  describe('in form', () => {
    const items: SegmentItem[] = [
      {
        text: 'First Item',
        id: 'first',
      },
      {
        text: 'Second item',
        id: 'second',
      },
      {
        text: 'Third item',
        id: 'third',
      },
    ];
    const formGroup = new FormGroup({
      segmentedControl: new FormControl(items[0]),
    });

    let spectator: SpectatorHost<SegmentedControlComponent>;

    const createHost = createHostFactory({
      component: SegmentedControlComponent,
      imports: [TestHelper.ionicModuleForTest, ReactiveFormsModule],
    });
    let ionSegmentElement: HTMLIonSegmentElement;

    beforeEach(async () => {
      spectator = createHost(
        `<form [formGroup]="formGroup">
          <kirby-segmented-control [items]="items" [formControl]="formGroup.controls.segmentedControl">
          </kirby-segmented-control>
         </form>`,
        { hostProps: { items, formGroup } }
      );

      ionSegmentElement = spectator.queryHost<HTMLIonSegmentElement>('ion-segment');
      await TestHelper.whenReady(ionSegmentElement);
      await TestHelper.whenReady(spectator.queryHostAll('ion-segment-button'));
      spectator.component.value = items[0];
    });

    it('should update form value on toggle', (done) => {
      const idToSelect = items[1].id;
      formGroup.valueChanges.pipe(first()).subscribe((value) => {
        expect(value.segmentedControl.id).toBe(idToSelect);
        done();
      });

      const changeEvent = new CustomEvent('ionChange', { detail: { value: idToSelect } });
      ionSegmentElement.dispatchEvent(changeEvent);
      spectator.detectChanges();
    });

    it('should update value on form control change', () => {
      expect(spectator.component.value.id).toBe(items[0].id);

      formGroup.controls.segmentedControl.setValue(items[1]);

      expect(spectator.component.value.id).toBe(items[1].id);
    });
  });

  describe('when inside host component with ChangeDetectionStrategy.OnPush', () => {
    const items: SegmentItem[] = [
      { text: 'First', id: 'first' },
      { text: 'Second', id: 'second' },
      { text: 'Third', id: 'third' },
    ];
    let spectator: SpectatorHost<SegmentedControlComponent, OnPushHostComponent>;
    let formControl: FormControl;
    let ionSegmentElement: HTMLIonSegmentElement;

    const createHost = createHostFactory({
      component: SegmentedControlComponent,
      host: OnPushHostComponent,
      imports: [TestHelper.ionicModuleForTest, ReactiveFormsModule],
    });

    beforeEach(async () => {
      formControl = new FormControl(items[0]);
      spectator = createHost(
        '<kirby-segmented-control [items]="items" [formControl]="formControl"></kirby-segmented-control>',
        {
          hostProps: {
            items,
            formControl,
          },
        }
      );
      ionSegmentElement = spectator.query('ion-segment');
      await TestHelper.whenReady(ionSegmentElement);
      await TestHelper.whenReady(spectator.queryAll('ion-segment-button'));
    });

    it('should update value when form control value changes', () => {
      expect(spectator.component.value).toEqual(items[0]);

      formControl.setValue(items[2]);
      spectator.detectChanges();

      expect(spectator.component.value).toEqual(items[2]);
      expect(ionSegmentElement.value).toBe(items[2].id);
    });

    it('should update disabled state when form control is disabled', () => {
      expect(ionSegmentElement.disabled).toBeFalsy();

      formControl.disable();
      spectator.detectChanges();

      expect(ionSegmentElement.disabled).toBeTruthy();
    });

    it('should update disabled state when form control is enabled', () => {
      formControl.disable();
      spectator.detectChanges();
      expect(ionSegmentElement.disabled).toBeTruthy();

      formControl.enable();
      spectator.detectChanges();

      expect(ionSegmentElement.disabled).toBeFalsy();
    });

    it('should mark component for check when value is written', () => {
      const cdr = spectator.component['cdr'];
      spyOn(cdr, 'markForCheck');

      spectator.component.writeValue(items[1]);

      expect(cdr.markForCheck).toHaveBeenCalledTimes(1);
    });

    describe('setDisabledState()', () => {
      it('should mark component for check when disabled state is set to true', () => {
        const cdr = spectator.component['cdr'];
        spyOn(cdr, 'markForCheck');

        spectator.component.setDisabledState(true);

        expect(cdr.markForCheck).toHaveBeenCalledTimes(1);
      });

      it('should mark component for check when disabled state is set to false', () => {
        const cdr = spectator.component['cdr'];
        spectator.component.setDisabledState(true);
        spyOn(cdr, 'markForCheck');

        spectator.component.setDisabledState(false);

        expect(cdr.markForCheck).toHaveBeenCalledTimes(1);
      });
    });
  });
});
