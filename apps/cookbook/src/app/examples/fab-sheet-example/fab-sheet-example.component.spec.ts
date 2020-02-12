import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KirbyModule } from '@kirbydesign/designsystem';
import { FabSheetExampleComponent } from './fab-sheet-example.component';

describe('FabSheetExampleComponent', () => {
  let component: FabSheetExampleComponent;
  let fixture: ComponentFixture<FabSheetExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KirbyModule],
      declarations: [FabSheetExampleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabSheetExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
