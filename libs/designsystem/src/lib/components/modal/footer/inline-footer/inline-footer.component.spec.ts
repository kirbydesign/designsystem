import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineFooterComponent } from './inline-footer.component';

describe('InlineFooterComponent', () => {
  let component: InlineFooterComponent;
  let fixture: ComponentFixture<InlineFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InlineFooterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
