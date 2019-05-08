import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ExamplesModule } from '../../examples/examples.module';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { ButtonShowcaseComponent } from './button-showcase.component';

describe('ButtonShowcaseComponent', () => {
  let component: ButtonShowcaseComponent;
  let fixture: ComponentFixture<ButtonShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesModule, RouterTestingModule],
      declarations: [ButtonShowcaseComponent, CodeViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
