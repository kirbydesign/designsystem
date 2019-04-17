import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import * as ionic from '@ionic/angular';

import { ExamplesModule } from '../../examples/examples.module';
import { HtmlViewerComponent } from '../../shared/html-viewer/html-viewer.component';
import { IconShowcaseComponent } from './icon-showcase.component';

import { ShowcasePropertiesComponent } from '../../shared/showcase-properties/showcase-properties.component';

describe('IconShowcaseComponent', () => {
  let component: IconShowcaseComponent;
  let fixture: ComponentFixture<IconShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesModule, RouterTestingModule],
      declarations: [
        IconShowcaseComponent,
        HtmlViewerComponent,
        ShowcasePropertiesComponent,
        MockComponent(ionic.IonIcon),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
