import { Component, OnInit, Optional, SkipSelf } from '@angular/core';
import { AlertConfig, Modal } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-modal-embedded-alert-example',
  template: `
    <kirby-page-title>Modal with alert</kirby-page-title>
    <p>
      This modal will ask the user if they are sure they want to close the modal if they have
      entered data in any of the form fields.
    </p>
    <kirby-form-field>
      <input kirby-input placeholder="First name" (input)="updateFirstName($event.target.value)" />
    </kirby-form-field>

    <kirby-form-field>
      <input kirby-input placeholder="Last name" (input)="updateLastName($event.target.value)" />
    </kirby-form-field>
  `,
  canDismissCodeSnippet: `// Inside the embedded component
constructor(@Optional() @SkipSelf() private modal: Modal) {}

firstName: string;
lastName: string;

ngOnInit() {
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
  selector: config.selector,
  template: config.template,
})
export class ModalEmbeddedAlertExampleComponent implements OnInit {
  constructor(@Optional() @SkipSelf() private modal: Modal) {}

  static readonly canDismissCodeSnippet = config.canDismissCodeSnippet;

  firstName: string;
  lastName: string;

  ngOnInit() {
    this.modal.canDismiss = () => this.validate();
  }

  updateFirstName(firstName: string) {
    this.firstName = firstName;
  }

  updateLastName(lastName: string) {
    this.lastName = lastName;
  }

  validate() {
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
