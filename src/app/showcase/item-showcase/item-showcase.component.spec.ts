/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockModule } from 'ng-mocks';

import { ItemShowcaseComponent } from './item-showcase.component';
import { ExamplesModule } from '~/app/examples/examples.module';
import { CodeViewerComponent } from '~/app/shared/code-viewer/code-viewer.component';
import { IphoneModule } from '~/app/iphone/iphone.module';
import { KirbyModule } from '@kirbydesign/designsystem';
import { ShowcasePropertiesComponent } from '~/app/shared/showcase-properties/showcase-properties.component';

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
