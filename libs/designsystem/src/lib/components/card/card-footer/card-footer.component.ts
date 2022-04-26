import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
