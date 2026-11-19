import { Injector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { injectTable, rowSortingFeature, tableFeatures } from '@tanstack/angular-table';

import { hasSorting } from './data-grid-features';

const data = [{ id: '1', amount: 100 }];

const inInjectionContext = <T>(fn: () => T): T =>
  runInInjectionContext(TestBed.inject(Injector), fn);

describe('data grid feature guards', () => {
  describe('hasSorting', () => {
    it('should be true when rowSortingFeature is registered', () => {
      const table = inInjectionContext(() =>
        injectTable(() => ({
          features: tableFeatures({ rowSortingFeature }),
          columns: [{ accessorKey: 'amount', header: 'Amount' }],
          data,
        }))
      );

      expect(hasSorting(table.getAllLeafColumns()[0])).toBeTrue();
    });

    it('should be false when rowSortingFeature is not registered', () => {
      const table = inInjectionContext(() =>
        injectTable(() => ({
          features: tableFeatures({}),
          columns: [{ accessorKey: 'amount', header: 'Amount' }],
          data,
        }))
      );

      expect(hasSorting(table.getAllLeafColumns()[0])).toBeFalse();
    });
  });
});
