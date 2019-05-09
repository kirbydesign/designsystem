import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavParams } from '@ionic/angular';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';

import { ActionSheetComponent } from './action-sheet.component';
import { IModalController } from '../services/modal.controller.interface';
import { ListCellComponent } from '../../list/list-cell/list-cell.component';
import { ListComponent } from '../../list/list.component';
import { ListCellLineComponent } from '../../list/list-cell-line/list-cell-line.component';
import { CardComponent } from '../../card/card.component';
import { GroupByPipe } from '../../list/pipes/group-by.pipe';
import { SpinnerComponent } from '~/kirby';
import { InfiniteScrollDirective } from '../../list/directives/infinite-scroll.directive';
import { CardHeaderComponent } from '../../card/card-header/card-header.component';

describe('ActionSheetComponent', () => {
  let component: ActionSheetComponent;
  let fixture: ComponentFixture<ActionSheetComponent>;

  beforeEach(async(() => {
    const modalControllerSpy = jasmine.createSpyObj('IModalController', [
      'showModal',
      'hideModal',
      'registerModalCloseRef',
    ]);

    const navParamsSpy = jasmine.createSpyObj('NavParams', {
      get: {
        header: 'Test header',
        subheader: 'Test subheader',
        actions: ['Action 1', 'Action 2', 'Action 3'],
      },
    });

    TestBed.configureTestingModule({
      declarations: [
        ActionSheetComponent,
        ListComponent,
        ListCellComponent,
        CardComponent,
        CardHeaderComponent,
        ListCellLineComponent,
        GroupByPipe,
        SpinnerComponent,
        InfiniteScrollDirective,
      ],
      providers: [
        { provide: IModalController, useValue: modalControllerSpy },
        { provide: NavParams, useValue: navParamsSpy },
      ],
    }).compileComponents();
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ActionSheetComponent],
      },
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('header', () => {
    it('should render', () => {
      const expected = 'Test header';
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const header = rootElement.querySelector('kirby-card-header header').firstElementChild;
      expect(component.config.header).toEqual(expected);
      expect(header.textContent).toEqual(expected);
    });

    it('should reflect changes in the UI', () => {
      const newHeader = 'Another header';
      component.config.header = newHeader;
      fixture.detectChanges();
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const header = rootElement.querySelector('kirby-card-header header').firstElementChild;
      expect(header.textContent).toEqual(newHeader);
    });
  });

  describe('subheader', () => {
    it('should render', () => {
      const expected = 'Test subheader';
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const subheader = rootElement.querySelector('kirby-card-header header').lastElementChild;
      expect(component.config.subheader).toEqual(expected);
      expect(subheader.textContent).toEqual(expected);
    });

    it('should reflect changes in the UI', () => {
      const newSubheader = 'Another subheader';
      component.config.subheader = newSubheader;
      fixture.detectChanges();
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const subheader = rootElement.querySelector('kirby-card-header header').lastElementChild;
      expect(subheader.textContent).toEqual(newSubheader);
    });
  });

  describe('actions', () => {
    it('should contain each item', () => {
      var el = fixture.debugElement.query(By.directive(ListComponent));
      expect(el.componentInstance.items).toContain('Action 1');
      expect(el.componentInstance.items).toContain('Action 2');
      expect(el.componentInstance.items).toContain('Action 3');
    });

    it('should reflect add/remove/edit changes of items', () => {
      component.config.actions[0] = 'New Action 1';
      component.config.actions.pop();
      component.config.actions.push('Action 4');
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(ListComponent));
      expect(el.componentInstance.items).not.toContain('Action 1');
      expect(el.componentInstance.items).toContain('New Action 1');
      expect(el.componentInstance.items).toContain('Action 2');
      expect(el.componentInstance.items).not.toContain('Action 3');
      expect(el.componentInstance.items).toContain('Action 4');
    });
  });
});
