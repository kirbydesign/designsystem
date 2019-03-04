/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KirbyModule } from '../../../kirby/kirby.module';
import { ProgressBarExampleComponent } from './progress-bar-example.component';

describe('ProgressBarExampleComponent', () => {
  let component: ProgressBarExampleComponent;
  let fixture: ComponentFixture<ProgressBarExampleComponent>;

  beforeEach(async(() => {
  
    TestBed.configureTestingModule({
      imports: [KirbyModule],
      declarations: [ ProgressBarExampleComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
