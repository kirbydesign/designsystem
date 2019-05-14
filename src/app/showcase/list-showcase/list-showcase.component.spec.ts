import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ExamplesModule } from '../../examples/examples.module';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { ListShowcaseComponent } from './list-showcase.component';

describe('ListShowcaseComponent', () => {
  let component: ListShowcaseComponent;
  let fixture: ComponentFixture<ListShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExamplesModule, RouterTestingModule],
      declarations: [ListShowcaseComponent, CodeViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
