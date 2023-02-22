import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { PortalTestComponent } from './portal-test.component';

describe('PortalDirective', () => {
  let spectator: Spectator<PortalTestComponent>;
  const createComponent = createComponentFactory(PortalTestComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should be created', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('Host element', () => {
    it('should have correct outlet', () => {
      expect(spectator.component.portalDirective.outlet).toEqual(
        spectator.component.outletElement.nativeElement
      );
    });

    it('should not be the same as outlet', () => {
      expect(spectator.component.hostElement.nativeElement).not.toEqual(
        spectator.component.outletElement.nativeElement
      );
    });

    it('should have new parent node', () => {
      expect(spectator.component.hostElement.nativeElement.parentElement).toEqual(
        spectator.component.outletElement.nativeElement
      );
    });

    it('should throw error if templatePortal is provided', () => {
      const templatePortal: TemplatePortal = new TemplatePortal(
        spectator.component.templateRef,
        null
      );

      expect(() => {
        spectator.component.portalDirective.portal = templatePortal;
      }).toThrowError(`Portal type ${templatePortal} is not supported`);
    });

    it('should throw error if componentPortal is provided', () => {
      const componentPortal: ComponentPortal<PortalTestComponent> = new ComponentPortal(
        PortalTestComponent
      );

      expect(() => {
        spectator.component.portalDirective.portal = componentPortal;
      }).toThrowError(`Portal type ${componentPortal} is not supported`);
    });
  });
});
