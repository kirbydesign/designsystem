import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'cookbook-modal-example-alert-with-guard-stepper',
  template: `
    <ol>
      @for (step of steps; track step.text; let i = $index) {
        <li [class.active]="currentStep - 1 === i && !step.steps">
          @if (i === currentStep - 1 && !!step.route) {
            <a [routerLink]="step.route" [target]="step.target">
              {{ step.text }}
            </a>
          }
          @if (i !== currentStep - 1 || (i === currentStep - 1 && !step.route)) {
            {{ step.text }}
          }
          @if (currentStep - 1 === i && !!step.steps) {
            <ul>
              @for (substep of step.steps; track substep.text) {
                <li class="active">
                  <a
                    class="kirby-external-icon"
                    [routerLink]="substep.route"
                    [target]="substep.target"
                  >
                    {{ substep.text }}
                  </a>
                </li>
              }
            </ul>
          }
        </li>
      }
    </ol>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      li.active {
        font-weight: bold;
      }
    `,
  ],
  imports: [RouterLink],
})
export class ModalExampleAlertWithGuardStepperComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.route.snapshot.data.step) {
      this.currentStep = this.route.snapshot.data.step;
    }
    if (this.route.snapshot.data.nextRoute) {
      this.steps[this.currentStep - 1].route = this.route.snapshot.data.nextRoute;
    }
  }

  steps = [
    {
      text: 'Open the example in a separate tab or window',
      steps: [
        {
          text: 'Controller based example',
          route: '/examples/modal-with-guard',
          target: '_blank',
        },
        {
          text: 'Route based example',
          route: ['/examples/modal-route-with-guard'],
          target: '_blank',
        },
      ],
    },
    {
      text: 'Navigate to the guard protected route',
      route: undefined,
    },
    { text: 'Click the browser back button' },
  ];

  @Input()
  currentStep = 1;
}
