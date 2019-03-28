import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import * as ionic from '@ionic/angular';
import { By } from '@angular/platform-browser';

import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IconComponent, MockComponent(ionic.IonIcon)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('icons', () => {
    it('should point to the cog icon by default', () => {
      expect(component.name).toBe(IconComponent.DEFAULT_ICON_NAME);
    });
  });

  describe('size', () => {
    it('should set size to small by default', () => {
      expect(component.size).toBe(IconComponent.DEFAULT_ICON_SIZE);
    });
  });

  describe('color', () => {
    it('should set icon color to primary by default', () => {
      expect(component.colorType).toBe(IconComponent.DEFAULT_ICON_COLOR);
    });
  });
});
