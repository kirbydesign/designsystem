/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { MockModule } from 'ng-mocks';

import { TabsExampleComponent } from './tabs-example.component';
import { KirbyTestingModule } from '@kirbydesign/designsystem/testing';

describe('TabsExampleComponent', () => {
  let component: TabsExampleComponent;
  let fixture: ComponentFixture<TabsExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MockModule(KirbyTestingModule)],
      declarations: [TabsExampleComponent],
      providers: [Location],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
