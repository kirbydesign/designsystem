import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cookbook-guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.scss'],
  imports: [RouterLink],
})
export class GuidesComponent {}
