import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavParams } from '@ionic/angular';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import * as ionic from '@ionic/angular';

import { ActionSheetComponent } from './action-sheet.component';
import { IModalController } from '../services/modal.controller.interface';
import { ListCellComponent } from '../../list/list-cell/list-cell.component';
import { ListComponent } from '../../list/list.component';
import { ListCellLineComponent } from '../../list/list-cell-line/list-cell-line.component';
import { CardComponent } from '../../card/card.component';
import { GroupByPipe } from '../../list/pipes/group-by.pipe';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { InfiniteScrollDirective } from '../../list/directives/infinite-scroll.directive';
import { CardHeaderComponent } from '../../card/card-header/card-header.component';
import { ListFlexItemComponent } from '../../list/list-flex-item/list-flex-item.component';
import { ButtonComponent } from '../../button/button.component';

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
        items: [
          { id: '1', text: 'Action 1' },
          { id: '2', text: 'Action 2' },
          { id: '3', text: 'Action 3' },
        ],
        cancelButtonText: 'Test cancel button text',
      },
    });

    TestBed.configureTestingModule({
      declarations: [
        ActionSheetComponent,
        ListComponent,
        ListCellComponent,
        ListFlexItemComponent,
        CardComponent,
        CardHeaderComponent,
        ListCellLineComponent,
        GroupByPipe,
        SpinnerComponent,
        InfiniteScrollDirective,
        ButtonComponent,
        MockComponent(ionic.IonList),
        MockComponent(ionic.IonListHeader),
        MockComponent(ionic.IonLabel),
        MockComponent(ionic.IonItem),
        MockComponent(ionic.IonItemDivider),
        MockComponent(ionic.IonItemGroup),
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
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const actionSheetItems = rootElement.querySelector('.action-sheet-items');
      expect(actionSheetItems.children.length).toBe(3);
      Array.from(actionSheetItems.children).forEach((item, index) => {
        expect(item.textContent).toEqual(`Action ${index + 1}`);
      });
    });

    it('should reflect add/remove/edit changes of items', () => {
      component.config.items = [
        { id: '1', text: 'New Action 1' },
        { id: '2', text: 'Action 2' },
        { id: '4', text: 'Action 4' },
      ];

      fixture.detectChanges();
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const actionSheetItems = rootElement.querySelector('.action-sheet-items');
      const actionSheetItemsText = Array.from(actionSheetItems.children).map((item) => {
        return item.textContent;
      });
      expect(actionSheetItemsText).not.toContain('Action 1');
      expect(actionSheetItemsText).toContain('New Action 1');
      expect(actionSheetItemsText).toContain('Action 2');
      expect(actionSheetItemsText).not.toContain('Action 3');
      expect(actionSheetItemsText).toContain('Action 4');
    });
  });

  describe('cancel button text', () => {
    it('should render', () => {
      const expected = 'Test cancel button text';
      fixture.detectChanges();
      const cancelButton = fixture.debugElement.query(By.directive(ButtonComponent));
      expect(component.cancelButtonText).toEqual(expected);
      expect(cancelButton.nativeElement.textContent).toEqual(expected);
    });
  });
});
