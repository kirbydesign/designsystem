import { Injectable } from '@angular/core';

import { ListShape } from '~/kirby/components/list/list.component';

export type ListRowClassContext = {
  items: any[];
  getSectionName: (item: any) => string;
  shape: ListShape;
};

@Injectable()
export class ListRowClassService {
  private isSectionsEnabled: boolean;

  /**
   * Items sorted by sections.
   */
  private itemsSortedBySection: any[] = [];

  /**
   * Calculated classes for items.
   */
  private itemClasses: string[] = [];

  getCssClasses(current: any): string {
    const index = this.itemsSortedBySection.indexOf(current);
    const validIndex = index > -1 && index < this.itemClasses.length;
    return validIndex ? this.itemClasses[index] : '';
  }

  update(context: ListRowClassContext) {
    if (context.items) {
      this.isSectionsEnabled = !!context.getSectionName;
      if (this.isSectionsEnabled) {
        // If sections are enabled, sort items by section
        const bySection = (a, b) =>
          context.getSectionName(a).localeCompare(context.getSectionName(b));
        this.itemsSortedBySection = [...context.items].sort(bySection);

        // Calculate classes for each item
        this.itemClasses = this.itemsSortedBySection.map((current) =>
          this.getClassesForItem(current, context)
        );
      } else {
        // No sections? "List header" becomes "first", and last items becomes "last"
        this.itemsSortedBySection = [...context.items];
        this.itemClasses = this.itemsSortedBySection.map((item, index, array) => {
          return context.shape + (index === array.length - 1 ? ' last' : '');
        });
      }
    } else {
      // No items, make sure not to have any classes
      this.itemsSortedBySection = [];
      this.itemClasses = [];
    }
  }

  private getClassesForItem(current: any, context: ListRowClassContext) {
    // Determine index of (current) item and if it's first / list in list
    const index = this.itemsSortedBySection.indexOf(current);
    const isFirst = index === 0;
    const isLast = index === context.items.length - 1;

    // Determine if there's an item before and / or after the (current) item
    const previous = isFirst ? null : this.itemsSortedBySection[index - 1];
    const next = isLast ? null : this.itemsSortedBySection[index + 1];

    // Determine if the (current) item is the first and / or last item of a section
    let isTopRowInSection = false;
    let isBottomRowInSection = false;
    if (this.isSectionsEnabled) {
      const currentSectionName = context.getSectionName(current);
      const previousSectionName = previous ? context.getSectionName(previous) : null;
      const nextSectionName = next ? context.getSectionName(next) : null;
      isTopRowInSection = currentSectionName !== previousSectionName;
      isBottomRowInSection = currentSectionName !== nextSectionName;
    }

    const classes: string[] = [context.shape];
    if (isFirst || isTopRowInSection) {
      classes.push('first');
    }
    if (isLast || isBottomRowInSection) {
      classes.push('last');
    }
    return classes.join(' ');
  }
}
