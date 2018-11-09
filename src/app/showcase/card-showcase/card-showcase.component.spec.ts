import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesModule } from '../../examples/examples.module';
import { HtmlViewerComponent } from '../../shared/html-viewer/html-viewer.component';
import { CardShowcaseComponent } from './card-showcase.component';

describe('CardShowcaseComponent', () => {
  let component: CardShowcaseComponent;
  let fixture: ComponentFixture<CardShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ExamplesModule ],
      declarations: [ CardShowcaseComponent, HtmlViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
