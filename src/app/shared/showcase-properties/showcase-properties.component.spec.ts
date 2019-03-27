import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { KirbyModule } from '../../../kirby/kirby.module';
import { ShowcasePropertiesComponent } from './showcase-properties.component';

describe('ShowcasePropertiesComponent', () => {
  let component: ShowcasePropertiesComponent;
  let fixture: ComponentFixture<ShowcasePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KirbyModule, RouterTestingModule],
      declarations: [ShowcasePropertiesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcasePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
