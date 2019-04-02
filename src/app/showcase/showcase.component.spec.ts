import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import * as ionic from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { ExamplesModule } from '../examples/examples.module';
import { COMPONENT_DECLARATIONS } from './showcase.common';

import { ShowcaseRoutingModule } from './showcase-routing.module';
import { HtmlViewerComponent } from '../shared/html-viewer/html-viewer.component';
import { ShowcasePropertiesComponent } from '../shared/showcase-properties/showcase-properties.component';
import { ShowcaseComponent } from './showcase.component';

describe('ShowcaseComponent', () => {
  let component: ShowcaseComponent;
  let fixture: ComponentFixture<ShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ShowcaseRoutingModule, ExamplesModule, RouterTestingModule, FormsModule],
      declarations: [
        ...COMPONENT_DECLARATIONS,
        ShowcaseComponent,
        HtmlViewerComponent,
        ShowcasePropertiesComponent,
        MockComponent(ionic.IonIcon),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
