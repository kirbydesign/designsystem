import { Pipe, PipeTransform } from '@angular/core';

import { FormatNumberService } from './format-number.service';

@Pipe({
  name: 'formatNumber',
  standalone: true,
})
export class FormatNumberPipe implements PipeTransform {
  constructor(private formatNumberService: FormatNumberService) {}

  transform(value: number, digitsInfo = '1.2-2') {
    return this.formatNumberService.formatNumber(value, digitsInfo);
  }
}
