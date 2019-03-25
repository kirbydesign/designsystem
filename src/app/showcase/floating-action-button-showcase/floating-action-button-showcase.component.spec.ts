import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ExamplesModule } from '../../examples/examples.module';
import { HtmlViewerComponent } from '../../shared/html-viewer/html-viewer.component';
import { ShowcasePropertiesComponent } from '../../shared/showcase-properties/showcase-properties.component';
import { FloatingActionButtonShowcaseComponent } from './floating-action-button-showcase.component';

describe('FloatingActionButtonShowcaseComponent', () => {
  let component: FloatingActionButtonShowcaseComponent;
  let fixture: ComponentFixture<FloatingActionButtonShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesModule, RouterTestingModule],
      declarations: [
        FloatingActionButtonShowcaseComponent,
        HtmlViewerComponent,
        ShowcasePropertiesComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingActionButtonShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
