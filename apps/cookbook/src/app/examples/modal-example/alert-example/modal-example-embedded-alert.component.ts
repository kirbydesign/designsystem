import { Component, Inject, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import { AlertConfig, COMPONENT_PROPS, Modal } from '@kirbydesign/designsystem';

const config = {
  template: `<kirby-page-title>Modal with alert</kirby-page-title>

<ng-container *ngIf="showStepper">
  <cookbook-modal-example-alert-with-guard-stepper
    [currentStep]="3"
  ></cookbook-modal-example-alert-with-guard-stepper>
  <kirby-divider [hasMargin]="true"></kirby-divider>
</ng-container>

<div class="form-wrapper">
  <kirby-form-field>
    <input
      kirby-input
      placeholder="First name"
      [(ngModel)]="firstName"
    />
  </kirby-form-field>

  <kirby-form-field>
    <input
      kirby-input
      placeholder="Last name"
      [(ngModel)]="lastName"
    />
  </kirby-form-field>

  <button kirby-button (click)="clearForm()">Clear form</button>
</div>

<kirby-modal-footer>
  <em>
    <strong>Please note:</strong>
    This modal will ask the user if they are sure they want to close the modal if they have
    entered data in any of the form fields.
  </em>
</kirby-modal-footer>`,
  canDismissCodeSnippet: `// Inside the embedded component
constructor(@Optional() @SkipSelf() private modal: Modal) {}

firstName: string;
lastName: string;

ngOnInit() {
  // Use an arrow function to avoid 'this' being undefined in the function callback: 
  this.modal.canDismiss = () => this.validate();
}

validate(): boolean | AlertConfig {
  if (!this.firstName && !this.lastName) return true;

  const config: AlertConfig = {
    title: 'Are you sure you want to close?',
    message: 'All unsaved data will be lost.',
    okBtn: 'Close',
    cancelBtn: 'Cancel',
    icon: {
      name: 'warning',
      themeColor: 'warning',
    },
  };

  return config;
}
  `,
};

@Component({
  template: config.template,
  styles: [
    `
      .form-wrapper {
        margin-block-start: 1em;
        display: flex;
        flex-direction: column;
      }

      button {
        align-self: flex-end;
      }
    `,
  ],
})
export class ModalEmbeddedAlertExampleComponent implements OnInit {
  constructor(
    @Optional() @SkipSelf() private modal: Modal,
    @Optional() @Inject(COMPONENT_PROPS) private componentProps
  ) {}

  static readonly canDismissCodeSnippet = config.canDismissCodeSnippet;

  showStepper = true;
  @Input()
  firstName: string = 'Jane';
  lastName: string = '';

  ngOnInit() {
    if (this.componentProps?.showStepper !== undefined) {
      this.showStepper = this.componentProps.showStepper;
    }
    this.modal.canDismiss = () => this.validate();
  }

  clearForm() {
    this.firstName = '';
    this.lastName = '';
  }

  validate(): boolean | AlertConfig {
    if (!this.firstName && !this.lastName) return true;

    const config: AlertConfig = {
      title: 'Are you sure you want to close?',
      message: 'All unsaved data will be lost.',
      okBtn: 'Close',
      cancelBtn: 'Cancel',
      icon: {
        name: 'warning',
        themeColor: 'warning',
      },
    };

    return config;
  }
}
