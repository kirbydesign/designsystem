import {
  Component,
  HostBinding,
  OnInit,
  Input,
  TemplateRef,
  ContentChild,
  HostListener,
  ElementRef,
  ContentChildren,
  ViewChildren,
  QueryList,
  ViewChild,
  AfterContentChecked,
  Renderer2,
} from '@angular/core';

import { ListItemTemplateDirective } from '../list/list.directive';
import { ItemComponent } from '../item/item.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'kirby-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, AfterContentChecked {
  @ContentChild(ListItemTemplateDirective, { static: true, read: TemplateRef })
  itemTemplate: TemplateRef<any>;

  @ContentChildren(ListItemTemplateDirective, { read: ElementRef })
  slottedItems: QueryList<ElementRef<HTMLElement>>;

  @ViewChild(CardComponent, { static: true, read: ElementRef })
  cardElement: ElementRef<HTMLElement>;

  @ViewChildren(ItemComponent, { read: ElementRef })
  kirbyItemsDefault: QueryList<ElementRef<HTMLElement>>;

  @ContentChildren(ItemComponent, { read: ElementRef })
  kirbyItemsSlotted: QueryList<ElementRef<HTMLElement>>;

  @HostBinding('attr.role') private _role = 'listbox';
  @HostBinding('attr.tabindex') private _tabIndex = '0';

  @HostBinding('class.is-opening')
  private _isOpening: boolean;

  @HostBinding('class.is-open')
  isOpen = false;

  selectedText: string;

  @Input()
  selectedIndex: number;

  @Input()
  items: string[] | any[] = [];

  @Input()
  itemTextProperty = 'text';

  @Input()
  selectedItem: string | any;

  @Input()
  placeholder = 'Please select:';

  @Input()
  attentionLevel: '1' | '2' | '3' | '4' = '3';

  readonly attentionLevelOpen = '2';

  @Input()
  expand?: 'block';

  @HostBinding('class.expand')
  private get _isBlockLevel() {
    return this.expand === 'block';
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef<HTMLElement>) {}

  onToggle() {
    if (!this.isOpen) {
      this.elementRef.nativeElement.focus();
    }
    this.toggle();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  onButtonMouseEvent(event: Event) {
    // Prevent button focus;
    event.preventDefault();
  }

  ngOnInit() {
    this.setSelectedText();
  }

  ngAfterContentChecked() {
    if (this.kirbyItemsSlotted.length) {
      this.kirbyItemsSlotted.forEach((kirbyItem, index) => {
        this.renderer.setAttribute(kirbyItem.nativeElement, 'role', 'option');
        this.renderer.listen(kirbyItem.nativeElement, 'click', () => {
          this.onItemSelect(index);
        });
      });
    }
  }

  open() {
    if (!this.isOpen) {
      this._isOpening = true;
      setTimeout(() => {
        this.isOpen = true;
        this.scrollItemIntoView(this.selectedIndex);
      });
    }
  }

  close() {
    if (this.isOpen) {
      this._isOpening = false;
      this.isOpen = false;
    }
  }

  onItemSelect(index: number) {
    this.selectItem(index);
    this.close();
  }

  private selectItem(index: number) {
    this.selectedIndex = index;
    this.selectedItem = this.items[index];
    this.setSelectedText();
    this.scrollItemIntoView(index);
  }

  private setSelectedText() {
    let selectedText = this.placeholder;
    if (this.selectedItem) {
      selectedText = this.getTextFromItem(this.selectedItem);
    }
    this.selectedText = selectedText;
  }

  getTextFromItem(item: string | any) {
    return typeof item === 'string' ? item : item[this.itemTextProperty];
  }

  scrollItemIntoView(index: number) {
    const kirbyItems = this.kirbyItemsSlotted.length
      ? this.kirbyItemsSlotted
      : this.kirbyItemsDefault;
    if (kirbyItems.length) {
      const selectedKirbyItem = kirbyItems.toArray()[index];
      if (selectedKirbyItem && selectedKirbyItem.nativeElement) {
        const itemElement = selectedKirbyItem.nativeElement;
        const scrollContainer = this.cardElement.nativeElement;
        const itemTop = itemElement.offsetTop;
        const itemBottom = itemElement.offsetTop + itemElement.offsetHeight;
        const containerVisibleTop = scrollContainer.scrollTop;
        const containerVisibleBottom = scrollContainer.clientHeight + scrollContainer.scrollTop;
        if (itemTop < containerVisibleTop) {
          scrollContainer.scrollTop = itemTop;
        } else if (itemBottom > containerVisibleBottom) {
          scrollContainer.scrollTop = itemBottom - scrollContainer.clientHeight;
        }
      }
    }
  }

  @HostListener('keydown.tab', ['$event'])
  private _onTab(event: KeyboardEvent) {
    if (this.isOpen) {
      event.preventDefault();
      this.close();
    }
  }

  @HostListener('keydown.enter')
  @HostListener('keydown.escape')
  @HostListener('blur')
  private _onBlur() {
    if (this.isOpen) {
      this.close();
    }
  }

  @HostListener('keydown.space', ['$event'])
  private _onSpace(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.isOpen) {
      this.open();
    }
  }

  @HostListener('keydown.enter', ['$event'])
  private _onEnter(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.toggle();
  }

  @HostListener('keydown.arrowup', ['$event'])
  @HostListener('keydown.arrowdown', ['$event'])
  @HostListener('keydown.arrowleft', ['$event'])
  @HostListener('keydown.arrowright', ['$event'])
  private _onArrowKeys(event: KeyboardEvent) {
    if (this.isOpen && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      // Mirror default HTML5 select behaviour - prevent left/right arrows when open:
      return;
    }
    event.preventDefault();
    let newIndex = -1;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      // Select previous item:
      newIndex = this.selectedIndex - 1;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      if (this.selectedIndex === undefined) {
        // None selected, select first item:
        newIndex = 0;
      } else if (this.selectedIndex < this.items.length - 1) {
        // Select next item:
        newIndex = this.selectedIndex + 1;
      }
    }
    if (newIndex > -1) {
      this.selectItem(newIndex);
    }
  }

  @HostListener('keydown.home', ['$event'])
  @HostListener('keydown.end', ['$event'])
  private _onHomeEndKeys(event: KeyboardEvent) {
    event.preventDefault();
    let newIndex = -1;
    if (event.key === 'Home') {
      // Select first item:
      newIndex = 0;
    }
    if (event.key === 'End') {
      // Select last item:
      newIndex = this.items.length - 1;
    }
    if (newIndex > -1) {
      this.selectItem(newIndex);
    }
  }
}
