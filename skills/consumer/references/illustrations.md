# Image banners and spot illustrations

| Intent                                        | Choose                                                    | Constraint                                                                                   |
| --------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Interactive highlighted content with an image | `ImageBannerComponent` / `kirby-x-image-banner`           | Use banner activation or an external link; dismissal and image errors have separate outputs. |
| Abstract visual supporting a narrative        | `SpotIllustrationComponent` / `kirby-x-spot-illustration` | Use published names and available sizes; keep meaning in accompanying content.               |

## Image banner

Import `ImageBannerComponent` from `@kirbydesign/extensions-angular/image-banner`.
The example assumes the named image asset is available and lets the caller handle activation/errors.

```ts
import { Component, output } from '@angular/core';
import { ImageBannerComponent } from '@kirbydesign/extensions-angular/image-banner';

@Component({
  selector: 'app-guide-banner',
  standalone: true,
  imports: [ImageBannerComponent],
  template: `
    @if (isVisible) {
      <kirby-x-image-banner
        title="Explore the guide"
        bodyText="Find information about your next steps."
        imagePath="assets/images/guide-banner.jpg"
        actionButtonText="Read guide"
        (bannerClick)="guideRequested.emit()"
        (dismissClick)="isVisible = false"
        (imageError)="imageFailed.emit($event)"
      ></kirby-x-image-banner>
    }
  `,
})
export class GuideBannerComponent {
  isVisible = true;
  readonly guideRequested = output<void>();
  readonly imageFailed = output<ErrorEvent>();
}
```

With `externalLink`, the banner renders links to that URL; without it, activation emits
`bannerClick`. Subscribe to `dismissClick` only when a dismiss button is wanted; dismissing
does not also activate the banner. Handle `imageError` explicitly.

`showButtonInNarrowView` controls narrow-layout button visibility.
`backgroundBlur` accepts `dark`, `light` or `none`. For custom content, use the `title` and
`bodyText` projection slots. The resize directive is applied internally; ordinary usage imports
only `ImageBannerComponent`.

## Spot illustration

Import `SpotIllustrationComponent` from `@kirbydesign/extensions-angular/spot-illustration`.
The same entry point exports `SpotIllustrationName`, `SpotIllustrationSize` and `illustrations`.

```ts
import { Component } from '@angular/core';
import {
  SpotIllustrationComponent,
  SpotIllustrationSize,
} from '@kirbydesign/extensions-angular/spot-illustration';

@Component({
  selector: 'app-supporting-illustration',
  standalone: true,
  imports: [SpotIllustrationComponent],
  template: `
    <kirby-x-spot-illustration
      name="invest-page.money.dot.circle"
      [size]="medium"
      aria-hidden="true"
    ></kirby-x-spot-illustration>
  `,
})
export class SupportingIllustrationComponent {
  readonly medium = SpotIllustrationSize.MD;
}
```

`name` is required. Bind sizes with the `SpotIllustrationSize` enum: `SM`, `MD`, `LG` or `XL`,
defaulting to `MD`. A name is not necessarily available in every size.
A missing size renders no illustration. Use the published SVG assets
already deployed by the application.

The example is decorative. Keep explanatory text alongside it rather than relying on the
illustration to communicate information or assuming it supplies an accessible name.
