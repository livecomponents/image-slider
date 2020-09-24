(async function (window) {
  if (typeof window === 'undefined') { return null; }
  const customElementName = 'image-slider';
  const { render, updateSlideBy, slotChangedHandler } = await import('./partials/helpers.mjs');

  class ImageSlider extends HTMLElement {
    constructor() {
      super();
      this.root = this.attachShadow({ mode: 'open'});
      this.state = {
        count: 0,
        isLocked: false,
        selectedIndex: 0,
        selectedImage: null
      };
      this.listenersAttached = false;
      this.width = 0;
      this.position = 0;
      this.mounted = false;
    }

    get isLocked() { return this.state.isLocked; }
    get selectedImage() { return this.state.selectedImage; }
    get selectedIndex() { return this.state.selectedIndex; }   
    get count() { return this.state.count; }

    connectedCallback(){
      if (!this.mounted) {
        render(this);
        this.width = this.getBoundingClientRect().width;
        this.root.querySelector('#main').addEventListener('slotchange', slotChangedHandler.bind(this));
        this.mounted = true;
      }
    }

    next(){
      if (this.selectedIndex < this.count - 1) {
        updateSlideBy(1, this);
      }
    }
    
    prev(){
      if (this.selectedIndex <= 0) {
        updateSlideBy(-1, this);
      } 
    }

    slideTo(index) {
      if(!index || typeof index !== 'number') { return; }
      const idx = Math.round(index);
      if(idx > 0 && idx <= this.count) {
        updateSlideBy(idx - 1, this);
      }
    }

    first() { this.slideTo(1); }

    last() { this.slideTo(this.count); }

  };

  if (!!window.customElements && !window.customElements.get(customElementName)) {
    window.customElements.define(customElementName, ImageSlider);
  }

})(window);
