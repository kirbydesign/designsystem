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

  const hasTextResizeClass = () => document.documentElement.classList.contains('kirby-trt');
  const getObserverElement = (): HTMLElement | null =>
    document.querySelector('body > [style*="top: -9999px"]');

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
    spectator.service.ngOnDestroy();
    document.documentElement.classList.remove('kirby-trt');
    window.ResizeObserver = originalResizeObserver;
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('initialize', () => {
    it('should create a hidden observed element and append it to the body', () => {
      spectator.service.initialize();

      const el = getObserverElement();

      expect(el).toBeTruthy();
      expect(el.style.position).toBe('absolute');
      expect(el.style.height).toBe('1rem');
      expect(el.style.visibility).toBe('hidden');
      expect(el.style.pointerEvents).toBe('none');
    });

    it('should create a ResizeObserver and observe the element', () => {
      spectator.service.initialize();

      expect(observeSpy).toHaveBeenCalledWith(getObserverElement());
    });

    it('should not add kirby-trt class at default text scale', () => {
      spectator.service.initialize();

      expect(hasTextResizeClass()).toBeFalse();
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

      expect(getObserverElement()).toBeTruthy();

      spectator.service.ngOnDestroy();

      expect(getObserverElement()).toBeNull();
    });

    it('should handle being called before initialize gracefully', () => {
      expect(() => spectator.service.ngOnDestroy()).not.toThrow();
    });
  });

  describe('text scale class toggling', () => {
    it('should add kirby-trt class when text scale exceeds threshold', () => {
      spectator.service.initialize();

      spyOnProperty(getObserverElement(), 'offsetWidth', 'get').and.returnValue(24);
      resizeObserverCallback([], {} as ResizeObserver);

      expect(hasTextResizeClass()).toBeTrue();
    });

    it('should not add kirby-trt class when text scale is at threshold', () => {
      spectator.service.initialize();

      spyOnProperty(getObserverElement(), 'offsetWidth', 'get').and.returnValue(23.2);
      resizeObserverCallback([], {} as ResizeObserver);

      expect(hasTextResizeClass()).toBeFalse();
    });

    it('should not add kirby-trt class when text scale is below threshold', () => {
      spectator.service.initialize();

      spyOnProperty(getObserverElement(), 'offsetWidth', 'get').and.returnValue(19.2);
      resizeObserverCallback([], {} as ResizeObserver);

      expect(hasTextResizeClass()).toBeFalse();
    });

    it('should remove kirby-trt class when text scale drops below threshold', () => {
      spectator.service.initialize();

      spyOnProperty(getObserverElement(), 'offsetWidth', 'get').and.returnValues(24, 16);
      resizeObserverCallback([], {} as ResizeObserver);
      expect(hasTextResizeClass()).toBeTrue();

      resizeObserverCallback([], {} as ResizeObserver);
      expect(hasTextResizeClass()).toBeFalse();
    });
  });
});
