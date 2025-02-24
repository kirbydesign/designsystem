import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  OnDestroy,
  Output,
  Renderer2,
} from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ResizeObserverService, TranslationService } from '@kirbydesign/designsystem/shared';

@Component({
  selector: 'kirby-x-image-banner',
  imports: [CardModule, ButtonComponent, IconModule, CommonModule],
  templateUrl: './image-banner.component.html',
  styleUrl: './image-banner.component.scss',
})
export class ImageBannerComponent implements AfterViewInit, OnDestroy {
  private host = inject(ElementRef);
  private renderer = inject(Renderer2);
  private resizeObserverService = inject(ResizeObserverService);

  public translations = inject(TranslationService);

  private readonly CONTAINER_BREAKPOINT = 600;

  /**
   * The title placed inside the image banners header.
   */
  @Input() title: string | undefined;

  /**
   * The image shown on the banner, and used for the background blur effect.
   */
  @Input() imagePath: string | undefined;

  /**
   * The body text placed below the title.
   */
  @Input() bodyText: string | undefined;

  /**
   * The text of the button in the content area of the image banner.
   */
  @Input() actionButtonText: string | undefined;

  /**
   * When an external link is supplied the entire banner will be an anchor-tag and navigate when activated.
   */
  @Input() externalLink: string | undefined;

  /**
   * The blur-effect used for the background.
   */
  @HostBinding('class')
  @Input()
  backgroundBlur: 'dark' | 'light' | 'none' = 'dark';

  /**
   * Emitted every time the banner is activated. The entire banner is interactive, and will be activated by click and keyboard interaction.
   */
  @Output() bannerClick = new EventEmitter<Event>();

  /**
   * If subscribed to, a dismiss button will be shown. Emitted every time the dismiss button is activated by click and keyboard interaction.
   */
  @Output() dismissClick = new EventEmitter<Event>();

  /**
   * If the input imagePath results in an error, it will be reflected in this output.
   */
  @Output()
  imageError = new EventEmitter<ErrorEvent>();

  ngAfterViewInit() {
    this.resizeObserverService.observe(this.host.nativeElement, (entry) =>
      this.handleHostResize(entry)
    );
  }

  ngOnDestroy() {
    this.resizeObserverService.unobserve(this.host.nativeElement);
  }

  private handleHostResize(entry: ResizeObserverEntry) {
    console.log(entry);
    if (entry.contentRect.width < this.CONTAINER_BREAKPOINT) {
      this.renderer.removeClass(this.host.nativeElement, 'container-more-than-width');
      this.renderer.addClass(this.host.nativeElement, 'container-less-than-width');
    } else {
      this.renderer.removeClass(this.host.nativeElement, 'container-less-than-width');
      this.renderer.addClass(this.host.nativeElement, 'container-more-than-width');
    }
  }

  public bannerClicked(event: Event) {
    const eventTarget = event.target as HTMLElement;
    const dismissButtonClicked = eventTarget.closest('.dismiss');
    if (dismissButtonClicked) return;
    this.bannerClick.emit(event);
  }

  public dismissClicked(event: Event) {
    this.dismissClick.emit(event);
  }

  public onImageError($event: ErrorEvent) {
    this.imageError.emit($event);
  }
}
