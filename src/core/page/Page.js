export class Page {
  constructor(params) {
    this.params = params || Date.now().toString();
  }

  getRoot() {
    throw new Error('Method "getRoot" must be implemented');
  }

  afterRender() {}

  destroy() {}
}
