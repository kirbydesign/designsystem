import { Component, OnInit } from '@angular/core';

import { Sizes } from '@kirbydesign/designsystem/directives/size/size.directive';

@Component({
  selector: 'kirby-avatar-example',
  templateUrl: './avatar-example.component.html',
  styleUrls: ['./avatar-example.component.scss'],
})
export class AvatarExampleComponent implements OnInit {
  imageSrc =
    'https://www.jyskebank.dk/portletcontext-employeesuggest/EmployeePictureServlet' +
    '?large=true&employeeId=40501db73fd6677b9671ebb934f3f2e0';
  altText: 'Kirby Avatar Example';
  sizes = Sizes;

  constructor() {}

  ngOnInit() {}
}
