import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ExamplesModule } from '../../examples/examples.module';
import { HtmlViewerComponent } from '../../shared/html-viewer/html-viewer.component';
import { ModalShowcaseComponent } from './modal-showcase.component';
import { ShowcasePropertiesComponent } from '~/app/shared/showcase-properties/showcase-properties.component';

describe('ModalShowcaseComponent', () => {
  let component: ModalShowcaseComponent;
  let fixture: ComponentFixture<ModalShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesModule, RouterTestingModule],
      declarations: [ModalShowcaseComponent, HtmlViewerComponent, ShowcasePropertiesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
