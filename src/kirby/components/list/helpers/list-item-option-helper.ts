import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ListItemOptionHelper {
  selectedOptionItem$ = new BehaviorSubject<SelectedOptionItem>(undefined);
}

export interface SelectedOptionItem {
  id: string;
  item: any;
}
