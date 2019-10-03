import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent, MockModule } from 'ng-mocks';
import * as ionic from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { KirbyModule } from '@kirbydesign/designsystem';
import { ExamplesModule } from '../examples/examples.module';
import { COMPONENT_DECLARATIONS } from './showcase.common';

import { ShowcaseRoutingModule } from './showcase-routing.module';
import { CodeViewerComponent } from '../shared/code-viewer/code-viewer.component';
import { ShowcasePropertiesComponent } from '../shared/showcase-properties/showcase-properties.component';
import { ShowcaseComponent } from './showcase.component';
import { ExampleViewerComponent } from '../shared/example-viewer/example-viewer.component';
import { IphoneModule } from '~/app/iphone/iphone.module';

describe('ShowcaseComponent', () => {
  let component: ShowcaseComponent;
  let fixture: ComponentFixture<ShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ShowcaseRoutingModule,
        ExamplesModule,
        RouterTestingModule,
        FormsModule,
        KirbyModule,
        MockModule(IphoneModule),
      ],
      declarations: [
        ...COMPONENT_DECLARATIONS,
        ShowcaseComponent,
        CodeViewerComponent,
        ShowcasePropertiesComponent,
        MockComponent(ExampleViewerComponent),
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
