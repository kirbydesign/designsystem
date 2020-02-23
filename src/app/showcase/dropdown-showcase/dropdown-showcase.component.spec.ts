import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponents } from 'ng-mocks';

import { DropdownShowcaseComponent } from './dropdown-showcase.component';
import { ExamplesModule } from '../../examples/examples.module';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { ShowcasePropertiesComponent } from '../../shared/showcase-properties/showcase-properties.component';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';

describe('DropdownShowcaseComponent', () => {
  let component: DropdownShowcaseComponent;
  let fixture: ComponentFixture<DropdownShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesModule, RouterTestingModule],
      declarations: [
        DropdownShowcaseComponent,
        MockComponents(CodeViewerComponent, ExampleViewerComponent, ShowcasePropertiesComponent),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
