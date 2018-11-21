import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartExampleComponent } from './chart-example.component';
import { RouterTestingModule } from '@angular/router/testing';
import { KirbyModule } from '../../../kirby/kirby.module';

describe('ChartExampleComponent', () => {
  let component: ChartExampleComponent;
  let fixture: ComponentFixture<ChartExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ KirbyModule, RouterTestingModule ],
      declarations: [ ChartExampleComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
