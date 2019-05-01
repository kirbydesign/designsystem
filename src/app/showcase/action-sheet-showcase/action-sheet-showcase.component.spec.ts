import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ExamplesModule } from '../../examples/examples.module';
import { HtmlViewerComponent } from '../../shared/html-viewer/html-viewer.component';
import { ActionSheetShowcaseComponent } from './action-sheet-showcase.component';
import { ShowcasePropertiesComponent } from '~/app/shared/showcase-properties/showcase-properties.component';

fdescribe('ActionSheetShowcaseComponent', () => {
  let component: ActionSheetShowcaseComponent;
  let fixture: ComponentFixture<ActionSheetShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesModule, RouterTestingModule],
      declarations: [
        ActionSheetShowcaseComponent,
        HtmlViewerComponent,
        ShowcasePropertiesComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionSheetShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
