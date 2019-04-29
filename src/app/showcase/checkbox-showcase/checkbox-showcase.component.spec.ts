/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxShowcaseComponent } from './checkbox-showcase.component';
import { ExamplesModule } from '~/app/examples/examples.module';
import { HtmlViewerComponent } from '~/app/shared/html-viewer/html-viewer.component';

describe('CheckboxShowcaseComponent', () => {
  let component: CheckboxShowcaseComponent;
  let fixture: ComponentFixture<CheckboxShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesModule],
      declarations: [CheckboxShowcaseComponent, HtmlViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
