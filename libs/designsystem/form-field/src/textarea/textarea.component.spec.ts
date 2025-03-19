import { fakeAsync, tick } from '@angular/core/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { TestHelper } from '@kirbydesign/designsystem/testing';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from './textarea.component';

const getColor = DesignTokenHelper.getColor;

describe('TextareaComponent', () => {
  let spectator: SpectatorHost<TextareaComponent>;
  let element: HTMLTextAreaElement;

  describe('when used standalone', () => {
    const createHost = createHostFactory({
      component: TextareaComponent,
    });

    beforeEach(() => {
      spectator = createHost(
        '<textarea kirby-textarea [hasError]="hasError" [disabled]="disabled"></textarea>'
      );
      element = spectator.element as HTMLTextAreaElement;
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should render with correct color', () => {
      expect(element).toHaveComputedStyle({ color: getColor('black') });
    });

    it('should render with correct box-sizing', () => {
      expect(element).toHaveComputedStyle({ 'box-sizing': 'border-box' });
    });

    it('should render without border', () => {
      expect(element).toHaveComputedStyle({
        'border-width': '0px',
        'border-style': 'none',
      });
    });

    it('should render without outline', () => {
      expect(element).toHaveComputedStyle({
        'outline-width': '0px',
        'outline-style': 'none',
      });
    });

    it('should render with correct border-radius', () => {
      const expected = DesignTokenHelper.borderRadius('n');
      expect(element).toHaveComputedStyle({ 'border-radius': expected });
    });

    it('should emit change on cut event', fakeAsync(() => {
      const onChangeSpy = spyOn(spectator.component.kirbyChange, 'emit');
      const testValue = 'Test 123';
      element.value = testValue;
      spectator.debugElement.triggerEventHandler('cut', { target: element });
      tick();
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith(testValue);
    }));

    it('should emit change on paste event', fakeAsync(() => {
      const onChangeSpy = spyOn(spectator.component.kirbyChange, 'emit');
      const testValue = 'Test 123';
      element.value = testValue;
      spectator.debugElement.triggerEventHandler('paste', { target: element });
      tick();
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith(testValue);
    }));

    describe('when hasError', () => {
      beforeEach(() => {
        spectator.setHostInput('hasError', true);
        spectator.detectChanges();
      });

      it('should render with correct border', () => {
        expect(element).toHaveComputedStyle({
          'border-width': '1px',
          'border-style': 'solid',
          'border-color': getColor('danger'),
        });
      });
    });

    describe('when disabled', () => {
      beforeEach(() => {
        spectator.setHostInput('disabled', true);
      });

      it('should render with correct background-color', () => {
        expect(element).toHaveComputedStyle({
          'background-color': getColor('light', 'tint'),
        });
      });
    });

    describe('on desktop', () => {
      beforeAll(async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.desktop);
      });

      afterAll(() => {
        TestHelper.resetTestWindow();
      });

      it('should render a resize handle', () => {
        expect(element).toHaveComputedStyle({
          resize: 'vertical',
        });
      });
    });
  });

  describe('when used in a form', () => {
    let formGroup = new FormGroup({
      textarea: new FormControl(''),
    });

    const createHost = createHostFactory({
      component: TextareaComponent,
      imports: [ReactiveFormsModule],
    });

    beforeEach(async () => {
      formGroup = new FormGroup({
        textarea: new FormControl(''),
      });

      spectator = createHost(
        `<form [formGroup]="formGroup"><textarea [formControl]="formGroup.controls.textarea" kirby-textarea [hasError]="hasError" [disabled]="disabled"></textarea></form>`,
        {
          hostProps: {
            formGroup,
          },
          detectChanges: true,
        }
      );
      element = spectator.element as HTMLTextAreaElement;
    });

    it('should trigger kirbyChange when formControl value changes', () => {
      const testValue = 'New value';
      const kirbyChangeEmitSpy = spyOn(spectator.component.kirbyChange, 'emit');

      formGroup.controls.textarea.setValue(testValue);

      expect(kirbyChangeEmitSpy).toHaveBeenCalledOnceWith(testValue);
    });
  });
});
