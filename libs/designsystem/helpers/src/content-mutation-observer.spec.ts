import { Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { UnobserveFn } from '@kirbydesign/designsystem/types';
import { observeContent } from './content-mutation-observer';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'content-observer-host',
  template: '<div [innerHtml]="content"></div>',
  standalone: false,
})
class ContentObserverHostComponent implements OnDestroy {
  @Input() content: string = 'Initial content';

  private unobserveFn: UnobserveFn;

  constructor(private elementRef: ElementRef) {
    const contentHost = this.elementRef.nativeElement;
    this.unobserveFn = observeContent(contentHost, () => this.onContentChange());
  }

  public onContentChange() {}

  ngOnDestroy(): void {
    this.unobserveFn();
  }
}

describe('observeContent', () => {
  let spectator: Spectator<ContentObserverHostComponent>;

  const createComponent = createComponentFactory({
    component: ContentObserverHostComponent,
  });

  beforeEach(async () => {
    spectator = createComponent();

    // Wait for MutationObserver to be ready, we dont want to trigger the callback on initialization
    await TestHelper.waitForMutationObserver();
  });

  afterEach(() => {
    spectator.fixture.destroy();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should call callback when content changes', async () => {
    const onContentChangeSpy = spyOn(spectator.component, 'onContentChange');

    spectator.setInput('content', 'Updated content');
    await TestHelper.waitForMutationObserver();

    expect(onContentChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should not call callback when inserting and removing comments', async () => {
    const onContentChangeSpy = spyOn(spectator.component, 'onContentChange');

    // Insert a comment node
    const commentNode = document.createComment('This is a comment');
    spectator.element.appendChild(commentNode);
    await TestHelper.waitForMutationObserver();

    // Remove the comment node
    spectator.element.removeChild(commentNode);
    await TestHelper.waitForMutationObserver();

    expect(onContentChangeSpy).not.toHaveBeenCalled();
  });

  it('should not call callback when attributes or classes change', async () => {
    const onContentChangeSpy = spyOn(spectator.component, 'onContentChange');

    // Change an attribute
    spectator.element.setAttribute('data-test', 'test');
    await TestHelper.waitForMutationObserver();

    // Change a class
    spectator.element.classList.add('test-class');
    await TestHelper.waitForMutationObserver();

    expect(onContentChangeSpy).not.toHaveBeenCalled();
  });
});
