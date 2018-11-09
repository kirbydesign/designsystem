import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesModule } from '../../examples/examples.module';
import { CardDesignerComponent } from './card-designer.component';

describe('CardDesignerComponent', () => {
  let component: CardDesignerComponent;
  let fixture: ComponentFixture<CardDesignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ExamplesModule ],
      declarations: [ CardDesignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
