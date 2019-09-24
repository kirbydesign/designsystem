import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ExamplesModule } from '../../examples/examples.module';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { ListNoShapeShowcaseComponent } from './list-no-shape-showcase.component';

describe('ListNoShapeShowcaseComponent', () => {
  let component: ListNoShapeShowcaseComponent;
  let fixture: ComponentFixture<ListNoShapeShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesModule, RouterTestingModule],
      declarations: [ListNoShapeShowcaseComponent, CodeViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNoShapeShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
