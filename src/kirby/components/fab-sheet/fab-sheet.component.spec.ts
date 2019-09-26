import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponents } from 'ng-mocks';
import * as ionic from '@ionic/angular';

import { FabSheetComponent } from './fab-sheet.component';

describe('FabSheetComponent', () => {
  let component: FabSheetComponent;
  let fixture: ComponentFixture<FabSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FabSheetComponent,
        MockComponents(ionic.IonFab, ionic.IonFabButton, ionic.IonFabList, ionic.IonBackdrop),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
