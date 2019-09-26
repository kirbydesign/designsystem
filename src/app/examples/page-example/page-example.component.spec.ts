import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { KirbyModule } from '../../../kirby/kirby.module';
import { PageExampleComponent } from './page-example.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PageExampleComponent', () => {
  let component: PageExampleComponent;
  let fixture: ComponentFixture<PageExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KirbyModule, RouterTestingModule, NoopAnimationsModule],
      declarations: [PageExampleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
