import { TestBed } from '@angular/core/testing';

import { ListRowClassService } from './list-row-class.service';

describe('ListRowClassService', () => {
  const items = ['sally', 'bob', 'ringo'];
  let service: ListRowClassService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ListRowClassService],
    })
  );

  beforeEach(() => {
    service = TestBed.get(ListRowClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCssClasses', () => {
    it('should return an empty css-"class list" if not initialized', () => {
      expect(service.getCssClasses('bob')).toBe('');
    });

    it('should return css-"class list" when initialized', () => {
      service.update({
        getSectionName: (item) => (item === 'bob' ? 'V.I.P' : 'Not important'),
        shape: 'rounded',
        items,
      });
      expect(service.getCssClasses('bob')).not.toBe('');
    });
  });

  describe('update', () => {
    describe('with sections', () => {
      const shape = 'rounded';

      beforeEach(() => {
        service.update({
          getSectionName: (item) => (item === 'bob' ? 'V.I.P' : 'Not important'),
          shape,
          items,
        });
      });

      it('should apply "shape" to all rows', () => {
        items.forEach((item) => {
          expect(service.getCssClasses(item)).toContain(shape);
        });
      });

      describe('with "rounded" shape', () => {
        it('should apply "first" to first row in section', () => {
          expect(service.getCssClasses('bob')).toContain('first');
          expect(service.getCssClasses('sally')).toContain('first');
        });

        it('should apply "last" to last row in section', () => {
          expect(service.getCssClasses('bob')).toContain('last');
          expect(service.getCssClasses('ringo')).toContain('last');
        });
      });

      describe('with "square" shape', () => {
        const shape = 'square';

        beforeEach(() => {
          service.update({
            getSectionName: (item) => (item === 'bob' ? 'V.I.P' : 'Not important'),
            shape,
            items,
          });
        });

        it('should apply "first" to first row', () => {
          expect(service.getCssClasses('sally')).toContain('first');
        });

        it('should apply "last" to last row', () => {
          expect(service.getCssClasses('ringo')).toContain('last');
        });
      });
    });

    describe('without sections', () => {
      beforeEach(() => {
        service.update({
          getSectionName: null,
          shape: 'square',
          items,
        });
      });

      it('should apply "last" to last row', () => {
        expect(service.getCssClasses('ringo')).toContain('last');
      });
    });
  });
});
