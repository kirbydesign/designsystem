/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { MockModule } from 'ng-mocks';

import { ItemExampleComponent } from './item-example.component';
import { KirbyTestingModule } from '@kirbydesign/designsystem/testing';

describe('TabsExampleComponent', () => {
  let component: ItemExampleComponent;
  let fixture: ComponentFixture<ItemExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MockModule(KirbyTestingModule)],
      declarations: [ItemExampleComponent],
      providers: [Location],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
