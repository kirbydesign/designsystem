import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { KirbyModule } from '../../../kirby/kirby.module';
import { AvatarExampleComponent } from './avatar-example.component';

describe('AvatarExampleComponent', () => {
  let component: AvatarExampleComponent;
  let fixture: ComponentFixture<AvatarExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ KirbyModule, RouterTestingModule ],
      declarations: [ AvatarExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
