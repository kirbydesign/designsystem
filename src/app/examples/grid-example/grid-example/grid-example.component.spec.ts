import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridExampleComponent } from './grid-example.component';
import { KirbyModule } from '../../../../kirby/kirby.module';
import { CardExampleComponent } from '../../card-example/card-example.component';

describe('GridExampleComponent', () => {
  let component: GridExampleComponent;
  let fixture: ComponentFixture<GridExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridExampleComponent ],
      imports: [KirbyModule, CardExampleComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
