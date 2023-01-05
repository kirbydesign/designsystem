import { UniqueIdGenerator } from './unique-id-generator.helper';

describe('UniqueIdGenerator', () => {
  let service: UniqueIdGenerator;

  beforeEach(() => {
    service = UniqueIdGenerator.scopedTo('kirby-test');
  });

  it('should create service', () => {
    expect(service).toBeInstanceOf(UniqueIdGenerator);
  });

  describe('next', () => {
    it('should return unique ids', () => {
      expect(service.next()).not.toEqual(service.next());
    });
  });

  describe('scopedTo', () => {
    let service1: UniqueIdGenerator;
    let service2: UniqueIdGenerator;

    describe('same scope', () => {
      beforeEach(() => {
        service1 = UniqueIdGenerator.scopedTo('same-scope');
        service2 = UniqueIdGenerator.scopedTo('same-scope');
      });

      it('should return existing instance', () => {
        expect(service2).toBe(service1);
      });

      describe('next', () => {
        it('should return unique ids from each instance', () => {
          expect(service1.next()).not.toEqual(service2.next());
        });
      });
    });

    describe('different scopes', () => {
      beforeEach(() => {
        service1 = UniqueIdGenerator.scopedTo('first-scope');
        service2 = UniqueIdGenerator.scopedTo('second-scope');
      });

      it('should create new instance', () => {
        expect(service2).not.toBe(service1);
      });

      describe('next', () => {
        it('should return unique ids from each instance', () => {
          expect(service1.next()).not.toEqual(service2.next());
        });
      });
    });
  });
});
