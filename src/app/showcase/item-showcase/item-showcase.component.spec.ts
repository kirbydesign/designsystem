/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockModule } from 'ng-mocks';

import { ItemShowcaseComponent } from './item-showcase.component';
import { ExamplesModule } from '../../examples/examples.module';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { IphoneModule } from '../../iphone/iphone.module';
import { KirbyModule } from '@kirbydesign/designsystem';
import { ShowcasePropertiesComponent } from '../../shared/showcase-properties/showcase-properties.component';
import { ExampleViewerComponent } from '~/app/shared/example-viewer/example-viewer.component';

describe('ItemShowcaseComponent', () => {
  let component: ItemShowcaseComponent;
  let fixture: ComponentFixture<ItemShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ExamplesModule,
        RouterTestingModule,
        MockModule(IphoneModule),
        MockModule(KirbyModule),
      ],
      declarations: [
        ItemShowcaseComponent,
        MockComponent(CodeViewerComponent),
        MockComponent(ExampleViewerComponent),
        MockComponent(ShowcasePropertiesComponent),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
