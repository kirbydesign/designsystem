import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabNavigationItemComponent } from './tab-navigation-item.component';

describe('TabNavigationItemComponent', () => {
  let component: TabNavigationItemComponent;
  let fixture: ComponentFixture<TabNavigationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabNavigationItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabNavigationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
