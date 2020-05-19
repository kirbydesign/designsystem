import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ElementRef, ChangeDetectorRef } from '@angular/core';

import { ProgressCircleComponent } from './progress-circle.component';

describe('ProgressCircleComponent', () => {
  let spectator: Spectator<ProgressCircleComponent>;
  let changeDetectorRef: ChangeDetectorRef;
  let intersectionObserverConstructorSpy;

  const createHost = createComponentFactory({
    component: ProgressCircleComponent,
    declarations: [],
    providers: [
      {
        provide: ElementRef,
        useValue: {
          nativeElement: 'Provided native element',
        },
      },
    ],
  });

  function setupIntersectionObserverMock() {
    // IntersectionObserver not exposed in the DOM lib for TS. See: https://github.com/microsoft/TypeScript/pull/18110
    return spyOn(window as any, 'IntersectionObserver').and.returnValue({
      observe: jasmine.createSpy('observe()'),
      unobserve: jasmine.createSpy('unobserve()'),
      disconnect: jasmine.createSpy('disconnect'),
    });
  }

  beforeEach(() => {
    intersectionObserverConstructorSpy = setupIntersectionObserverMock();
    spectator = createHost({ props: { value: 30 } });
    changeDetectorRef = (spectator as any).instance.changeDetectorRef;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('radius', () => {
    it('should default to 28px', () => {
      spectator.detectChanges();
      expect(spectator.component.radius).toBe(28);
    });
    it('should map sm to 20px', () => {
      spectator.setInput({ size: 'sm' });
      spectator.detectChanges();
      expect(spectator.component.radius).toBe(20);
    });
    it('should map md to 28px', () => {
      spectator.setInput({ size: 'md' });
      spectator.detectChanges();
      expect(spectator.component.radius).toBe(28);
    });
    it('should map lg to 48px', () => {
      spectator.setInput({ size: 'lg' });
      spectator.detectChanges();
      expect(spectator.component.radius).toBe(48);
    });
  });

  describe('shownValue', () => {
    it('should return 0 until element has been visible', () => {
      spectator.setInput({ value: 50 });
      spectator.component['hasElementBeenVisible'] = false;

      expect(spectator.component.shownValue).toBe(0);
    });
    it('should return value after element has been visible', () => {
      spectator.setInput({ value: 50 });
      spectator.component['hasElementBeenVisible'] = true;

      expect(spectator.component.shownValue).toBe(50);
    });
  });

  describe('diameter', () => {
    it('should calculate diameter as 2*radius', () => {
      spectator.setInput({ size: 'sm' }); // 20px radius
      expect(spectator.component.diameter).toBe(40);
    });
  });

  describe('ngAfterViewInit', () => {
    it('should instantiate IntersectionObserver with onElementVisible as callback', () => {
      spectator.component.ngAfterViewInit();
      expect(intersectionObserverConstructorSpy).toHaveBeenCalledWith(
        spectator.component.onElementVisible,
        jasmine.any(Object)
      );
    });

    it('should set up an intersection observer on element', () => {
      spectator.component.ngAfterViewInit();
      expect(spectator.component['observer'].observe).toHaveBeenCalledWith(
        spectator.debugElement.nativeElement
      );
    });
  });

  describe('onElementVisible', () => {
    it('should not have been visible before onElementVisible has been called', () => {
      expect(spectator.component['hasElementBeenVisible']).toBe(false);
    });

    it('should mark element as visible if element is intersecting when observer is called', () => {
      // Arrange
      const entries: Partial<IntersectionObserverEntry>[] = [{ isIntersecting: true }];

      // Act
      spectator.component.onElementVisible(entries as IntersectionObserverEntry[]);

      // Assert
      expect(spectator.component['hasElementBeenVisible']).toBe(true);
    });

    it('should mark element as visible if several entries are returned when observer is called and all are intersecting', () => {
      // Arrange
      const entries: Partial<IntersectionObserverEntry>[] = [
        { isIntersecting: true },
        { isIntersecting: true },
      ];

      // Act
      spectator.component.onElementVisible(entries as IntersectionObserverEntry[]);

      // Assert
      expect(spectator.component['hasElementBeenVisible']).toBe(true);
    });

    it('should mark element as visible if several entries are returned when observer is called and any is intersecting', () => {
      // Arrange
      const entries: Partial<IntersectionObserverEntry>[] = [
        { isIntersecting: true },
        { isIntersecting: false },
      ];

      // Act
      spectator.component.onElementVisible(entries as IntersectionObserverEntry[]);

      // Assert
      expect(spectator.component['hasElementBeenVisible']).toBe(true);
    });

    it('should not mark element as visible if several entries are returned when observer is called but none are intersecting', () => {
      // Arrange
      const entries: Partial<IntersectionObserverEntry>[] = [
        { isIntersecting: false },
        { isIntersecting: false },
      ];

      // Act
      spectator.component.onElementVisible(entries as IntersectionObserverEntry[]);

      // Assert
      expect(spectator.component['hasElementBeenVisible']).toBe(false);
    });

    it('should not mark element as visible if elements are not intersecting when observer is called (on init)', () => {
      // Arrange
      const entries: Partial<IntersectionObserverEntry>[] = [{ isIntersecting: false }];

      // Act
      spectator.component.onElementVisible(entries as IntersectionObserverEntry[]);

      // Assert
      expect(spectator.component['hasElementBeenVisible']).toBe(false);
    });

    it('should not mark element as visible if elements array is undefined', () => {
      // Arrange
      const entries: Partial<IntersectionObserverEntry>[] = undefined;

      // Act
      spectator.component.onElementVisible(entries as IntersectionObserverEntry[]);

      // Assert
      expect(spectator.component['hasElementBeenVisible']).toBe(false);
    });

    it('should not mark element as visible if elements array is empty', () => {
      // Arrange
      const entries: Partial<IntersectionObserverEntry>[] = [];

      // Act
      spectator.component.onElementVisible(entries as IntersectionObserverEntry[]);

      // Assert
      expect(spectator.component['hasElementBeenVisible']).toBe(false);
    });

    it('should not mark component for change detection when not intersecting', () => {
      // Arrange
      spyOn(changeDetectorRef, 'markForCheck').and.callThrough();
      const entries: Partial<IntersectionObserverEntry>[] = [{ isIntersecting: false }];

      // Act
      spectator.component.onElementVisible(entries as IntersectionObserverEntry[]);

      // Assert
      expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled();
    });

    it('should mark component for change detection when visible to start animation', () => {
      // Arrange
      spyOn(changeDetectorRef, 'markForCheck').and.callThrough();
      const entries: Partial<IntersectionObserverEntry>[] = [{ isIntersecting: true }];

      // Act
      spectator.component.onElementVisible(entries as IntersectionObserverEntry[]);

      // Assert
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    it('should unsubscribe observer when elements are intersecting', () => {
      // Arrange
      spectator.component['disconnectObserver'] = jasmine.createSpy('disconnectObserver');
      const entries: Partial<IntersectionObserverEntry>[] = [{ isIntersecting: true }];

      // Act
      spectator.component.onElementVisible(entries as IntersectionObserverEntry[]);

      // Assert
      expect(spectator.component['disconnectObserver']).toHaveBeenCalled();
    });

    it('should not unsubscribe observer if elements are not intersecting', () => {
      // Arrange
      spectator.component['disconnectObserver'] = jasmine.createSpy('disconnectObserver');
      const entries: Partial<IntersectionObserverEntry>[] = [{ isIntersecting: false }];

      // Act
      spectator.component.onElementVisible(entries as IntersectionObserverEntry[]);

      // Assert
      expect(spectator.component['disconnectObserver']).not.toHaveBeenCalled();
    });
  });

  describe('disconnectObserver', () => {
    it('should handle observer being undefined (in case view init has not happened yet)', () => {
      spectator.component['observer'] = undefined;

      expect(() => {
        spectator.component['disconnectObserver']();
      }).not.toThrowError();
    });

    it('should call unobserve when disconnecting', () => {
      spectator.component['disconnectObserver']();

      expect(spectator.component['observer'].unobserve).toHaveBeenCalledWith(
        spectator.debugElement.nativeElement
      );
    });

    it('should call disconnect when disconnecting', () => {
      spectator.component['disconnectObserver']();

      expect(spectator.component['observer'].disconnect).toHaveBeenCalled();
    });

    it('should be able disconnect function to be missing (some browsers do not suppport it)', () => {
      spectator.component['observer'].disconnect = undefined;

      expect(() => {
        spectator.component['disconnectObserver']();
      }).not.toThrowError();
    });
  });

  describe('ngOnDestroy', () => {
    it('should call disconnectObserver', () => {
      spectator.component['disconnectObserver'] = jasmine.createSpy('disconnectObserver');

      spectator.component.ngOnDestroy();

      expect(spectator.component['disconnectObserver']).toHaveBeenCalled();
    });
  });
});
