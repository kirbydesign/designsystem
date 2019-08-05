/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarExampleComponent } from './toolbar-example.component';
import { KirbyModule } from '@kirbydesign/designsystem';

describe('ToolbarExampleComponent', () => {
  let component: ToolbarExampleComponent;
  let fixture: ComponentFixture<ToolbarExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KirbyModule],
      declarations: [ToolbarExampleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
