# Testing apps that use Kirby

Kirby ships template-less mock components so unit tests run fast (no DOM reflow, no
component logic), while still projecting `<ng-content>` and exposing `@Input`/`@Output`.

Import `KirbyTestingModule` from the entry point matching your mock framework:

- Jasmine/Karma: `@kirbydesign/designsystem/testing-jasmine`
- Jest: `@kirbydesign/designsystem/testing-jest`

```ts
import { KirbyTestingModule } from '@kirbydesign/designsystem/testing-jest'; // or /testing-jasmine
import { TestBed } from '@angular/core/testing';

TestBed.configureTestingModule({
  imports: [KirbyTestingModule, AppComponent], // standalone component under test
}).compileComponents();
```

- Both variants wrap `KirbyTestingBaseModule` (`@kirbydesign/designsystem/testing-base`)
  and add framework-specific mock providers.
- The jest variant mocks services with `jest.fn()`: `ChartConfigService`, `ChartJSService`,
  `IconRegistryService`, `LoadingOverlayService`, `ModalController`, `TabsService`,
  `ToastController`.
- `@kirbydesign/designsystem/testing` is a separate entry point with general test helpers
  and custom matchers (e.g. CSS custom-property matchers), distinct from the mock module.

Use the real components (not `KirbyTestingModule`) only when a test needs actual rendered
DOM/behavior; otherwise prefer the mock module for speed.
