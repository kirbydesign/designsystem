import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ExamplesModule } from '../../examples/examples.module';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { PageShowcaseComponent } from './page-showcase.component';
import { ShowcasePropertiesComponent } from '~/app/shared/showcase-properties/showcase-properties.component';

describe('PageShowcaseComponent', () => {
  let component: PageShowcaseComponent;
  let fixture: ComponentFixture<PageShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesModule, RouterTestingModule, NoopAnimationsModule],
      declarations: [PageShowcaseComponent, CodeViewerComponent, ShowcasePropertiesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
