import { fakeAsync, tick } from '@angular/core/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { InputComponent } from './input.component';

const { getColor, size } = DesignTokenHelper;

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

  it('should render with default height', () => {
    expect(element).toHaveComputedStyle({ height: size('xxxl') });
  });

  it('should render with correct width', () => {
    //window.getComputedStyle() returns width in pixels - so use element.computedStyleMap:
    const styleWidth = (element as any).computedStyleMap().get('width').toString();
    expect(styleWidth).toBe('100%');
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

  describe('when configured with borderless=true', () => {
    beforeEach(() => {
      spectator.component.borderless = true;
      spectator.detectChanges();
    });

    it('should render with correct padding', () => {
      expect(element).toHaveComputedStyle({
        'padding-inline': '0px',
      });
    });

    it('should render without border-radius', () => {
      expect(element).toHaveComputedStyle({
        'border-radius': '0px',
      });
    });

    it('should render without box-shadow', () => {
      expect(element).toHaveComputedStyle({
        'border-shadow': '',
      });
    });

    it('should render with default width', () => {
      //window.getComputedStyle() returns width in pixels - so use element.computedStyleMap:
      const styleWidth = (element as any).computedStyleMap().get('width').toString();
      expect(styleWidth).toBe('auto');
    });
  });

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

  describe('when configured with size medium', () => {
    beforeEach(() => {
      spectator.setInput('size', 'md');
    });

    it('should render with correct height', () => {
      expect(spectator.element).toHaveComputedStyle({
        height: size('xl'),
      });
    });

    it('should render with correct height when hasError is true', () => {
      spectator.setInput('hasError', true);

      expect(spectator.element).toHaveComputedStyle({ height: size('xl') });
    });
  });
});

describe('ngOnInit', () => {
  const createHost = createHostFactory({
    component: InputComponent,
  });

  it('should emit "kirbyChange" if the native input has a value', fakeAsync(() => {
    const spectator = createHost(`<input kirby-input size="md" value="test value"/>`);
    const onChangeSpy = spyOn(spectator.component.kirbyChange, 'emit');

    tick();

    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    expect(onChangeSpy).toHaveBeenCalledWith('test value');
  }));

  it('should not emit "kirbyChange" if the native input does not have a value', fakeAsync(() => {
    const spectator = createHost(`<input kirby-input size="md"/>`);
    const onChangeSpy = spyOn(spectator.component.kirbyChange, 'emit');

    tick();

    expect(onChangeSpy).not.toHaveBeenCalled();
  }));
});
