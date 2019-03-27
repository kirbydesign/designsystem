import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import * as ionic from '@ionic/angular';
import { By } from '@angular/platform-browser';

import { FloatingActionButtonComponent } from './floating-action-button.component';

describe('FloatingActionButtonComponent', () => {
  let component: FloatingActionButtonComponent;
  let fixture: ComponentFixture<FloatingActionButtonComponent>;
  const defaultIconPath: string = '/assets/icons/add/add@3x.png';
  const customIconPath: string = '/assets/icons/edit/edit@3x.png';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FloatingActionButtonComponent, MockComponent(ionic.IonFabButton)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('shadows', () => {
    it('should have a shadow by default', () => {
      expect(component.showShadow).toBeTruthy();
    });

    it('should render a shadow by default', () => {
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const fab = rootElement.querySelector('.fab');
      expect(fab.classList).not.toContain('no-shadow');
    });

    it('should not render a shadow when showShadow is set to false', () => {
      component.showShadow = false;
      fixture.detectChanges();
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const fab = rootElement.querySelector('.fab');
      expect(fab.classList).toContain('no-shadow');
    });
  });

  describe('disabled', () => {
    it('should not be disabled by default', () => {
      expect(component.disabled).not.toBeTruthy();
    });

    it('should not be rendered as disabled by default', () => {
      var el = fixture.debugElement.query(By.directive(ionic.IonFabButton));
      expect(el.componentInstance.disabled).not.toBeTruthy();
    });

    it('should be rendered as disabled when disabled is set to true', () => {
      component.disabled = true;
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(ionic.IonFabButton));
      expect(el.componentInstance.disabled).toBeTruthy();
    });
  });

  describe('icons', () => {
    it('should point to the add@3x icon by default', () => {
      expect(component.iconSrc).toBe(defaultIconPath);
    });

    it('should render the add@3x icon by default', () => {
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const fabIcon = rootElement.querySelector('.fab img');
      expect((<HTMLImageElement>fabIcon).src).toContain(defaultIconPath);
    });

    it('should render the respective icon when iconSrc has changed', () => {
      component.iconSrc = customIconPath;
      fixture.detectChanges();
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const fabIcon = rootElement.querySelector('.fab img');
      expect((<HTMLImageElement>fabIcon).src).toContain(customIconPath);
    });
  });
});
