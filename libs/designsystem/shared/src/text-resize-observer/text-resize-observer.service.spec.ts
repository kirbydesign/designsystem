import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { TextResizeObserverService } from './text-resize-observer.service';

describe('TextResizeObserverService', () => {
  let spectator: SpectatorService<TextResizeObserverService>;
  const createService = createServiceFactory({
    service: TextResizeObserverService,
  });

  let originalResizeObserver: typeof ResizeObserver;
  let resizeObserverCallback: ResizeObserverCallback;
  let observeSpy: jasmine.Spy;
  let disconnectSpy: jasmine.Spy;

  beforeEach(() => {
    originalResizeObserver = window.ResizeObserver;
    observeSpy = jasmine.createSpy('observe');
    disconnectSpy = jasmine.createSpy('disconnect');

    window.ResizeObserver = class implements ResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        resizeObserverCallback = callback;
      }
      observe = observeSpy;
      disconnect = disconnectSpy;
      unobserve() {
        /* noop */
      }
    };

    spectator = createService();
  });

  afterEach(() => {
    window.ResizeObserver = originalResizeObserver;
  });

  function getObservedElement(): HTMLElement | null {
    return document.querySelector('body > [style*="top: -9999px"]');
  }

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('initialize', () => {
    it('should create a hidden observed element and append it to the body', () => {
      spectator.service.initialize();

      const observedElement = getObservedElement();

      expect(observedElement).toBeTruthy();
      expect(observedElement.style.position).toBe('absolute');
      expect(observedElement.style.width).toBe('1rem');
      expect(observedElement.style.height).toBe('1rem');
      expect(observedElement.style.visibility).toBe('hidden');
      expect(observedElement.style.pointerEvents).toBe('none');
    });

    it('should create a ResizeObserver and observe the element', () => {
      spectator.service.initialize();

      expect(observeSpy).toHaveBeenCalledWith(getObservedElement());
    });

    it('should not add kirby-text-resize class at default text scale', () => {
      spectator.service.initialize();

      expect(document.documentElement.classList.contains('kirby-text-resize')).toBeFalse();
    });
  });

  describe('ngOnDestroy', () => {
    it('should disconnect the ResizeObserver', () => {
      spectator.service.initialize();
      spectator.service.ngOnDestroy();

      expect(disconnectSpy).toHaveBeenCalled();
    });

    it('should remove the observed element from the DOM', () => {
      spectator.service.initialize();

      const observedElement = getObservedElement();
      expect(observedElement).toBeTruthy();
      expect(observedElement.parentNode).toBe(document.body);

      spectator.service.ngOnDestroy();

      expect(getObservedElement()).toBeNull();
    });

    it('should handle being called before initialize gracefully', () => {
      expect(() => spectator.service.ngOnDestroy()).not.toThrow();
    });
  });

  describe('text scale class toggling', () => {
    it('should not add kirby-text-resize class at default text scale', () => {
      spectator.service.initialize();

      expect(document.documentElement.classList.contains('kirby-text-resize')).toBeFalse();
    });

    it('should toggle kirby-text-resize class when ResizeObserver callback is triggered', () => {
      spectator.service.initialize();

      resizeObserverCallback([], {} as ResizeObserver);

      expect(document.documentElement.classList.contains('kirby-text-resize')).toBeFalse();
    });

    it('should add kirby-text-resize class when text scale exceeds threshold', () => {
      spectator.service.initialize();

      const observedElement = getObservedElement();
      spyOnProperty(observedElement, 'offsetWidth', 'get').and.returnValue(24);

      resizeObserverCallback([], {} as ResizeObserver);

      expect(document.documentElement.classList.contains('kirby-text-resize')).toBeTrue();
    });

    it('should not add kirby-text-resize class when text scale is at threshold', () => {
      spectator.service.initialize();

      const observedElement = getObservedElement();
      spyOnProperty(observedElement, 'offsetWidth', 'get').and.returnValue(23.2);

      resizeObserverCallback([], {} as ResizeObserver);

      expect(document.documentElement.classList.contains('kirby-text-resize')).toBeFalse();
    });

    it('should not add kirby-text-resize class when text scale is below threshold', () => {
      spectator.service.initialize();

      const observedElement = getObservedElement();
      spyOnProperty(observedElement, 'offsetWidth', 'get').and.returnValue(19.2);

      resizeObserverCallback([], {} as ResizeObserver);

      expect(document.documentElement.classList.contains('kirby-text-resize')).toBeFalse();
    });

    it('should remove kirby-text-resize class when text scale drops below threshold', () => {
      spectator.service.initialize();

      const observedElement = getObservedElement();

      spyOnProperty(observedElement, 'offsetWidth', 'get').and.returnValue(24);
      resizeObserverCallback([], {} as ResizeObserver);
      expect(document.documentElement.classList.contains('kirby-text-resize')).toBeTrue();

      (
        Object.getOwnPropertyDescriptor(observedElement, 'offsetWidth')?.get as jasmine.Spy
      ).and.returnValue(16);
      resizeObserverCallback([], {} as ResizeObserver);

      expect(document.documentElement.classList.contains('kirby-text-resize')).toBeFalse();
    });
  });
});
