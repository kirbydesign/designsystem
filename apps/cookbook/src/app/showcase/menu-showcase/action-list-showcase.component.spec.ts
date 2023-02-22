import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuShowcaseComponent } from './menu-showcase.component';

describe('MenuShowcaseComponent', () => {
  let component: MenuShowcaseComponent;
  let fixture: ComponentFixture<MenuShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuShowcaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
