export class UniqueIdGenerator {
  private static registry = new Map<string, UniqueIdGenerator>();
  private id = 0;

  private constructor(private scope: string) {}

  static scopedTo(scope: string) {
    let scopedGenerator = UniqueIdGenerator.registry.get(scope);
    if (!scopedGenerator) {
      scopedGenerator = new UniqueIdGenerator(scope);
      UniqueIdGenerator.registry.set(scope, scopedGenerator);
    }
    return scopedGenerator;
  }

  next(): string {
    return `${this.scope}-${this.id++}`;
  }
}
