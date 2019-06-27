import { Component } from '@angular/core';

@Component({
  selector: 'kirby-empty-state-example',
  templateUrl: './empty-state-example.component.html',
  styleUrls: ['./empty-state-example.component.scss'],
})
export class EmptyStateExampleComponent {
  iconName = 'help';
  title = 'No items';
  text = "You don't have any items. Call support to add some items to your account.";
  buttonText = 'Call support';
}
