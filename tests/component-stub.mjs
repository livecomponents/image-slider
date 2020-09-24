export class ComponentStub extends HTMLElement {
  
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open'});
    this.state = {
      count: 0,
      isLocked: false,
      selectedIndex: 0,
      selectedImage: null
    };
    this.selectedIndex = 0;
    this.listenersAttached = false;
    this.width = 0;
    this.position = 0;
    this.mounted = false;
  }

}