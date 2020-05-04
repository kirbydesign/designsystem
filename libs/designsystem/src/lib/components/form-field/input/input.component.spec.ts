import { SpectatorHost, createHostFactory } from '@ngneat/spectator';
import { fakeAsync, tick } from '@angular/core/testing';

import { DesignTokenHelper } from '../../../helpers/design-token-helper';
import { InputComponent } from './input.component';

const getColor = DesignTokenHelper.getColor;
const size = DesignTokenHelper.size;

describe('InputComponent', () => {
  let spectator: SpectatorHost<InputComponent>;
  let element: HTMLInputElement;

  const createHost = createHostFactory({
    component: InputComponent,
  });

  beforeEach(() => {
    spectator = createHost('<input kirby-input/>');
    element = spectator.element as HTMLInputElement;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render with correct color', () => {
    expect(element).toHaveComputedStyle({ color: getColor('black') });
  });

  it('should render with correct height', () => {
    expect(element).toHaveComputedStyle({ height: size('xxxl') });
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
    const expected = DesignTokenHelper.borderRadius();
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
      spectator.component.hasError = true;
      spectator.detectChanges();
    });

    it('should render with correct border', () => {
      expect(element).toHaveComputedStyle({
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': getColor('danger'),
      });
    });

    it('should render with correct height', () => {
      expect(element).toHaveComputedStyle({ height: size('xxxl') });
    });
  });

  describe('when disabled', () => {
    beforeEach(() => {
      element.disabled = true;
    });

    it('should render with correct background-color', () => {
      expect(element).toHaveComputedStyle({
        'background-color': getColor('light', 'tint'),
      });
    });
  });
});
