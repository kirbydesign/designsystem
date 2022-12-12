import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalNavigationItemPocComponent } from './local-navigation-item-poc.component';

describe('LocalNavigationItemPocComponent', () => {
  let component: LocalNavigationItemPocComponent;
  let fixture: ComponentFixture<LocalNavigationItemPocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocalNavigationItemPocComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalNavigationItemPocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
