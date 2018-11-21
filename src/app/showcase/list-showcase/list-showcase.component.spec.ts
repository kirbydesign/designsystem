import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesModule } from '../../examples/examples.module';
import { HtmlViewerComponent } from '../../shared/html-viewer/html-viewer.component';
import { ListShowcaseComponent } from './list-showcase.component';

describe('ListShowcaseComponent', () => {
  let component: ListShowcaseComponent;
  let fixture: ComponentFixture<ListShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ExamplesModule ],
      declarations: [ ListShowcaseComponent, HtmlViewerComponent ]
    })
    .compileComponents();
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
