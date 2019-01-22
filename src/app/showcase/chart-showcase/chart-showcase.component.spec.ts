import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExamplesModule } from '../../examples/examples.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HtmlViewerComponent } from '../../shared/html-viewer/html-viewer.component';
import { ChartShowcaseComponent } from './chart-showcase.component';

describe('ChartShowcaseComponent', () => {
  let component: ChartShowcaseComponent;
  let fixture: ComponentFixture<ChartShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ExamplesModule, RouterTestingModule ],
      declarations: [ ChartShowcaseComponent, HtmlViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
