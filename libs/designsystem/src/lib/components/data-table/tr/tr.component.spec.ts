import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowComponent } from './tr.component';

describe('TrComponent', () => {
  let component: TableRowComponent;
  let fixture: ComponentFixture<TableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableRowComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
