import { ElementRef } from '@angular/core';

import { CalendarOptions } from './calendar-options.model';

export class CalendarHelper {
  private embeddedView: Window;
  private embeddedViewReady = false;

  public init(
    calendarContainer: ElementRef,
    options: CalendarOptions,
    onDaySelected: (cell: { isSelectable: boolean; date: number }) => void,
    onChangeMonth: (index: number) => void
  ) {
    if (this.hasEmbeddedView(calendarContainer)) {
      const iframe = <HTMLIFrameElement>calendarContainer.nativeElement;
      iframe.onload = () => {
        this.embeddedViewReady = true;
        this.emitOptionsToEmbeddedView(options);
      };
      this.embeddedView = iframe.contentWindow;

      window.addEventListener('message', (evt: MessageEvent) =>
        this.handleMessageEvent(evt, onDaySelected, onChangeMonth)
      );
    }
  }

  public update(options: CalendarOptions) {
    if (this.embeddedViewReady) {
      this.emitOptionsToEmbeddedView(options);
    }
  }

  public setSelectedDay(day: number) {
    if (this.embeddedViewReady) {
      this.embeddedView.postMessage(
        {
          type: 'kirbyCalendarSetSelectedDay',
          selectedDay: day,
        },
        '*'
      );
    }
  }

  private hasEmbeddedView(calendarContainer: ElementRef) {
    return (
      calendarContainer &&
      calendarContainer.nativeElement &&
      calendarContainer.nativeElement instanceof HTMLIFrameElement &&
      calendarContainer.nativeElement.contentWindow
    );
  }

  private emitOptionsToEmbeddedView(options: CalendarOptions) {
    this.embeddedView.postMessage(
      {
        type: 'kirbyCalendarInit',
        ...options,
      },
      '*'
    );
  }

  private handleMessageEvent(
    evt: MessageEvent,
    onDaySelected: (cell: { isSelectable: boolean; date: number }) => void,
    onChangeMonth: (index: number) => void
  ) {
    if (this.validateMessage(evt)) {
      switch (evt.data.type) {
        case 'kirbyCalendarDaySelected':
          if (this.validateDateSelectedMessage(evt)) {
            onDaySelected({ isSelectable: true, date: evt.data.day });
          }
          break;
        case 'kirbyCalendarChangeMonth':
          if (this.validateNavigateMonthMessage(evt)) {
            onChangeMonth(evt.data.index);
          }
          break;
      }
    }
  }

  private validateMessage(evt: MessageEvent) {
    return this.embeddedView === evt.source && evt.type === 'message' && evt.data && evt.data.type;
  }

  private validateDateSelectedMessage(evt: MessageEvent) {
    return evt.data.type === 'kirbyCalendarDaySelected' && evt.data.day;
  }

  private validateNavigateMonthMessage(evt: MessageEvent) {
    return evt.data.type === 'kirbyCalendarChangeMonth' && typeof evt.data.index === 'number';
  }
}
