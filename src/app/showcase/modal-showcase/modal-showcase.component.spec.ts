import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import * as ionic from '@ionic/angular';

import { ExamplesModule } from '../../examples/examples.module';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { ModalShowcaseComponent } from './modal-showcase.component';
import { ShowcasePropertiesComponent } from '~/app/shared/showcase-properties/showcase-properties.component';
// tslint:disable-next-line:import-line-spacing

describe('ModalShowcaseComponent', () => {
  let component: ModalShowcaseComponent;
  let fixture: ComponentFixture<ModalShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesModule, RouterTestingModule],
      declarations: [
        ModalShowcaseComponent,
        CodeViewerComponent,
        ShowcasePropertiesComponent,
        MockComponent(ionic.IonIcon),
      ],
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
