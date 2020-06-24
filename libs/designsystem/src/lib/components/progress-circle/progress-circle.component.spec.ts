import {
  createComponentFactory,
  createHostFactory,
  Spectator,
  SpectatorHost,
} from '@ngneat/spectator';
import { ChangeDetectorRef } from '@angular/core';

import { TestHelper } from '../../testing/test-helper';
import { ProgressCircleComponent } from './progress-circle.component';
import { ProgressCircleRingComponent } from './progress-circle-ring.component';

describe('ProgressCircleComponent', () => {
  describe('with stubbed IntersectionObserver', () => {
    let spectator: Spectator<ProgressCircleComponent>;
    let changeDetectorRef: ChangeDetectorRef;
    let intersectionObserverConstructorSpy: jasmine.Spy;

    const createHost = createComponentFactory({
      component: ProgressCircleComponent,
      declarations: [ProgressCircleRingComponent],
    });

    beforeEach(() => {
      // IntersectionObserver not exposed in the DOM lib for TS. See: https://github.com/microsoft/TypeScript/pull/18110
      intersectionObserverConstructorSpy = spyOn(
        window as any,
        'IntersectionObserver'
      ).and.returnValue({
        observe: jasmine.createSpy('observe()'),
        unobserve: jasmine.createSpy('unobserve()'),
        disconnect: jasmine.createSpy('disconnect'),
      });

      spectator = createHost({
        props: { value: 30 },
      });
      changeDetectorRef = (spectator as any).instance.changeDetectorRef;
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    describe('diameter', () => {
      it('should default to md (56px)', () => {
        spectator.detectChanges();
        expect(spectator.component.diameter).toBe(ProgressCircleComponent.DIAMETER_MAP.md);
      });
      it('should map sm to 40px', () => {
        spectator.setInput({ size: 'sm' });
        spectator.detectChanges();
        expect(spectator.component.diameter).toBe(ProgressCircleComponent.DIAMETER_MAP.sm);
      });
      it('should map md to 56px', () => {
        spectator.setInput({ size: 'md' });
        spectator.detectChanges();
        expect(spectator.component.diameter).toBe(ProgressCircleComponent.DIAMETER_MAP.md);
      });
      it('should map lg to 96px', () => {
        spectator.setInput({ size: 'lg' });
        spectator.detectChanges();
        expect(spectator.component.diameter).toBe(ProgressCircleComponent.DIAMETER_MAP.lg);
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

    describe('radius', () => {
      it('should calculate radius as diameter / 2', () => {
        spectator.setInput({ size: 'sm' });
        expect(spectator.component.radius).toBe(ProgressCircleComponent.DIAMETER_MAP.sm / 2);
      });
    });

    describe('ngAfterViewInit', () => {
      it('should instantiate IntersectionObserver with onIntersectionChange as callback', async () => {
        expect(intersectionObserverConstructorSpy).toHaveBeenCalledWith(
          spectator.component['onIntersectionChange'],
          jasmine.any(Object)
        );
      });

      it('should set up an intersection observer on element', () => {
        expect(spectator.component['observer'].observe).toHaveBeenCalledWith(
          spectator.debugElement.nativeElement
        );
      });
    });

    describe('onIntersectionChange', () => {
      it('should not have been visible before onIntersectionChange has been called', () => {
        expect(spectator.component['hasElementBeenVisible']).toBeFalsy();
      });

      it('should mark element as visible if element is intersecting when observer is called', () => {
        // Arrange
        const entries: Partial<IntersectionObserverEntry>[] = [{ isIntersecting: true }];

        // Act
        spectator.component['onIntersectionChange'](entries as IntersectionObserverEntry[]);

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
        spectator.component['onIntersectionChange'](entries as IntersectionObserverEntry[]);

        // Assert
        expect(spectator.component['hasElementBeenVisible']).toBe(true);
      });

      it('should mark element as visible if several entries are returned when observer is called and any is intersecting', () => {
        // Arrange
        const entries: Partial<IntersectionObserverEntry>[] = [
          { isIntersecting: false },
          { isIntersecting: true },
        ];

        // Act
        spectator.component['onIntersectionChange'](entries as IntersectionObserverEntry[]);

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
        spectator.component['onIntersectionChange'](entries as IntersectionObserverEntry[]);

        // Assert
        expect(spectator.component['hasElementBeenVisible']).toBe(false);
      });

      it('should not mark element as visible if elements are not intersecting when observer is called (on init)', () => {
        // Arrange
        const entries: Partial<IntersectionObserverEntry>[] = [{ isIntersecting: false }];

        // Act
        spectator.component['onIntersectionChange'](entries as IntersectionObserverEntry[]);

        // Assert
        expect(spectator.component['hasElementBeenVisible']).toBeFalsy();
      });

      it('should not mark element as visible if elements array is undefined', () => {
        // Arrange
        const entries: Partial<IntersectionObserverEntry>[] = undefined;

        // Act
        spectator.component['onIntersectionChange'](entries as IntersectionObserverEntry[]);

        // Assert
        expect(spectator.component['hasElementBeenVisible']).toBeFalsy();
      });

      it('should not mark element as visible if elements array is empty', () => {
        // Arrange
        const entries: Partial<IntersectionObserverEntry>[] = [];

        // Act
        spectator.component['onIntersectionChange'](entries as IntersectionObserverEntry[]);

        // Assert
        expect(spectator.component['hasElementBeenVisible']).toBe(false);
      });

      it('should not mark component for change detection when not intersecting', () => {
        // Arrange
        spyOn(changeDetectorRef, 'markForCheck').and.callThrough();
        const entries: Partial<IntersectionObserverEntry>[] = [{ isIntersecting: false }];

        // Act
        spectator.component['onIntersectionChange'](entries as IntersectionObserverEntry[]);

        // Assert
        expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled();
      });

      it('should mark component for change detection when visible to start animation', () => {
        // Arrange
        spyOn(changeDetectorRef, 'markForCheck').and.callThrough();
        const entries: Partial<IntersectionObserverEntry>[] = [{ isIntersecting: true }];

        // Act
        spectator.component['onIntersectionChange'](entries as IntersectionObserverEntry[]);

        // Assert
        expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
      });

      it('should unsubscribe observer when elements are intersecting', () => {
        // Arrange
        spectator.component['unobserve'] = jasmine.createSpy('disconnectObserver');
        const entries: Partial<IntersectionObserverEntry>[] = [{ isIntersecting: true }];

        // Act
        spectator.component['onIntersectionChange'](entries as IntersectionObserverEntry[]);

        // Assert
        expect(spectator.component['unobserve']).toHaveBeenCalled();
      });

      it('should not unsubscribe observer if elements are not intersecting', () => {
        // Arrange
        spectator.component['unobserve'] = jasmine.createSpy('disconnectObserver');
        const entries: Partial<IntersectionObserverEntry>[] = [{ isIntersecting: false }];

        // Act
        spectator.component['onIntersectionChange'](entries as IntersectionObserverEntry[]);

        // Assert
        expect(spectator.component['unobserve']).not.toHaveBeenCalled();
      });
    });

    describe('unobserve', () => {
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
      it('should call unobserve', () => {
        spectator.component['unobserve'] = jasmine.createSpy('unobserve');

        spectator.component.ngOnDestroy();

        expect(spectator.component['unobserve']).toHaveBeenCalled();
      });
    });
  });

  describe('with real IntersectionObserver', () => {
    let spectator: SpectatorHost<ProgressCircleComponent>;

    const createHost = createHostFactory({
      component: ProgressCircleComponent,
      declarations: [ProgressCircleRingComponent],
    });

    beforeEach(() => {
      spectator = createHost('<kirby-progress-circle></kirby-progress-circle>', {
        props: { value: 50 },
      });
    });

    it('should set hasElementBeenVisible after scrolled into view', async () => {
      expect(spectator.component['hasElementBeenVisible']).toBeUndefined();
      const paddingTop = window.innerHeight; // Ensure the element is below the fold
      (spectator.hostElement as HTMLElement).style.paddingTop = `${paddingTop}px`;
      await TestHelper.whenTrue(() => spectator.component['hasElementBeenVisible'] === false); // Await IntersectionObserver to fire
      expect(spectator.component['hasElementBeenVisible']).toBeFalse();

      // Act
      spectator.element.scrollIntoView();

      await TestHelper.whenTrue(() => spectator.component['hasElementBeenVisible'] === true); // Await IntersectionObserver to fire
      expect(spectator.component['hasElementBeenVisible']).toBeTrue();
    });
  });
});
