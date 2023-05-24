export class ReorderEvent {
  private origEvent: CustomEvent<any>;
  private parent?: any;

  constructor(ev: CustomEvent<any>, parentItem?: any) {
    this.origEvent = ev;
    this.parent = parentItem;
    this.origEvent.cancelBubble = true;
  }
  complete(listOrReorder?: boolean | any[]): Promise<any> {
    return this.origEvent.detail.complete(listOrReorder);
  }

  get parentItem(): any {
    return this.parent;
  }
}
