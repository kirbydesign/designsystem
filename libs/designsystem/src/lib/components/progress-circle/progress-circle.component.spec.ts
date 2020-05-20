import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ElementRef, ChangeDetectorRef } from '@angular/core';

import { ProgressCircleComponent } from './progress-circle.component';

describe('ProgressCircleComponent', () => {
  let spectator: Spectator<ProgressCircleComponent>;
  let changeDetectorRef: ChangeDetectorRef;

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

  beforeEach(() => {
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
    let intersectionObserverConstructorSpy;

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
    });

    it('should instantiate IntersectionObserver with onElementVisible as callback', () => {
      spectator.component.ngAfterViewInit();
      expect(intersectionObserverConstructorSpy).toHaveBeenCalledWith(
        spectator.component['onElementVisible'],
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
      spectator.component['onElementVisible'](entries as IntersectionObserverEntry[]);

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
      spectator.component['onElementVisible'](entries as IntersectionObserverEntry[]);

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
      spectator.component['onElementVisible'](entries as IntersectionObserverEntry[]);

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
      spectator.component['onElementVisible'](entries as IntersectionObserverEntry[]);

      // Assert
      expect(spectator.component['hasElementBeenVisible']).toBe(false);
    });

    it('should not mark element as visible if elements are not intersecting when observer is called (on init)', () => {
      // Arrange
      const entries: Partial<IntersectionObserverEntry>[] = [{ isIntersecting: false }];

      // Act
      spectator.component['onElementVisible'](entries as IntersectionObserverEntry[]);

      // Assert
      expect(spectator.component['hasElementBeenVisible']).toBe(false);
    });

    it('should not mark element as visible if elements array is undefined', () => {
      // Arrange
      const entries: Partial<IntersectionObserverEntry>[] = undefined;

      // Act
      spectator.component['onElementVisible'](entries as IntersectionObserverEntry[]);

      // Assert
      expect(spectator.component['hasElementBeenVisible']).toBe(false);
    });

    it('should not mark element as visible if elements array is empty', () => {
      // Arrange
      const entries: Partial<IntersectionObserverEntry>[] = [];

      // Act
      spectator.component['onElementVisible'](entries as IntersectionObserverEntry[]);

      // Assert
      expect(spectator.component['hasElementBeenVisible']).toBe(false);
    });

    it('should not mark component for change detection when not intersecting', () => {
      // Arrange
      spyOn(changeDetectorRef, 'markForCheck').and.callThrough();
      const entries: Partial<IntersectionObserverEntry>[] = [{ isIntersecting: false }];

      // Act
      spectator.component['onElementVisible'](entries as IntersectionObserverEntry[]);

      // Assert
      expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled();
    });

    it('should mark component for change detection when visible to start animation', () => {
      // Arrange
      spyOn(changeDetectorRef, 'markForCheck').and.callThrough();
      const entries: Partial<IntersectionObserverEntry>[] = [{ isIntersecting: true }];

      // Act
      spectator.component['onElementVisible'](entries as IntersectionObserverEntry[]);

      // Assert
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    it('should unsubscribe observer when elements are intersecting', () => {
      // Arrange
      spectator.component['unobserve'] = jasmine.createSpy('disconnectObserver');
      const entries: Partial<IntersectionObserverEntry>[] = [{ isIntersecting: true }];

      // Act
      spectator.component['onElementVisible'](entries as IntersectionObserverEntry[]);

      // Assert
      expect(spectator.component['unobserve']).toHaveBeenCalled();
    });

    it('should not unsubscribe observer if elements are not intersecting', () => {
      // Arrange
      spectator.component['unobserve'] = jasmine.createSpy('disconnectObserver');
      const entries: Partial<IntersectionObserverEntry>[] = [{ isIntersecting: false }];

      // Act
      spectator.component['onElementVisible'](entries as IntersectionObserverEntry[]);

      // Assert
      expect(spectator.component['unobserve']).not.toHaveBeenCalled();
    });
  });

  describe('disconnectObserver', () => {
    beforeEach(() => {
      spyOn(spectator.component['observer'], 'disconnect').and.stub();
      spyOn(spectator.component['observer'], 'unobserve').and.stub();
    });

    it('should handle observer being undefined (in case view init has not happened yet)', () => {
      spectator.component['observer'] = undefined;

      expect(() => {
        spectator.component['unobserve']();
      }).not.toThrowError();
    });

    it('should call unobserve when disconnecting', () => {
      spectator.component['unobserve']();

      expect(spectator.component['observer'].unobserve).toHaveBeenCalledWith(
        spectator.debugElement.nativeElement
      );
    });

    it('should call disconnect when disconnecting', () => {
      spectator.component['unobserve']();

      expect(spectator.component['observer'].disconnect).toHaveBeenCalled();
    });

    it('should be able disconnect function to be missing (some browsers do not suppport it)', () => {
      spectator.component['observer'].disconnect = undefined;

      expect(() => {
        spectator.component['unobserve']();
      }).not.toThrowError();
    });
  });

  describe('ngOnDestroy', () => {
    it('should call disconnectObserver', () => {
      spectator.component['unobserve'] = jasmine.createSpy('disconnectObserver');

      spectator.component.ngOnDestroy();

      expect(spectator.component['unobserve']).toHaveBeenCalled();
    });
  });

  describe('changing of shown value when elements comes into viewport to trigger animation', () => {
    const value = 50;

    beforeEach(() => {
      spectator.setInput({ value });

      // Placing element outside of viewport
      spectator.element.style.marginTop = '4000px';

      // Resetting after element has been placed outside viewport
      spectator.component['hasElementBeenVisible'] = false;
      spectator.component.ngAfterViewInit();
      spectator.detectChanges();
    });

    afterEach(() => {
      spectator.component.ngOnDestroy();
    });

    it('should show 0 if element has not been visible to the user yet', (done) => {
      setTimeout(() => {
        expect(spectator.component.shownValue).toBe(0);
        done();
      });
    });

    it('should show actual value once element becomes visible to the user', (done) => {
      // Act
      spectator.element.scrollIntoView();
      spectator.detectChanges();

      // Assert
      setTimeout(() => {
        expect(spectator.component.shownValue).toBe(value);
        done();
      });
    });
  });
});
