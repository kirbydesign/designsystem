import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockModule } from 'ng-mocks';

import { DropdownExampleComponent } from './dropdown-example.component';
import { DropdownExampleModule } from './dropdown-example.module';
import { KirbyTestingModule } from '@kirbydesign/designsystem/testing';

describe('DropdownExampleComponent', () => {
  let component: DropdownExampleComponent;
  let fixture: ComponentFixture<DropdownExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MockModule(KirbyTestingModule), DropdownExampleModule],
      declarations: [DropdownExampleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
