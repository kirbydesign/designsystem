import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalNavigationPocComponent } from './local-navigation-poc.component';

describe('LocalNavigationPocComponent', () => {
  let component: LocalNavigationPocComponent;
  let fixture: ComponentFixture<LocalNavigationPocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocalNavigationPocComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalNavigationPocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
