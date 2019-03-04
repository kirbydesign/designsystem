/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarShowcaseComponent } from './progress-bar-showcase.component';
import { HtmlViewerComponent } from '../../shared/html-viewer/html-viewer.component';
import { ExamplesModule } from '../../examples/examples.module';

describe('ProgressBarShowcaseComponent', () => {
  let component: ProgressBarShowcaseComponent;
  let fixture: ComponentFixture<ProgressBarShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesModule],
      declarations: [ProgressBarShowcaseComponent, HtmlViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
