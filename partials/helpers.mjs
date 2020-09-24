const txVarName = '--image-slider--tx';
const factorVarName = '--image-slider--factor';
const indexVarName = '--image-slider--index';
const bkgColorVarName = '--image-slider--bkg-color';
const countVarName = '--image-slider--count';
const transitionClassName = 'smooth';
const slideClassName = 'img_slider__container';
const slideChangedEventName = 'slide-changed';

export function updateSlideBy(num, component) {
  component.state.selectedIndex = component.state.selectedIndex + num;
  component.state.selectedImage = component.querySelectorAll('img')[component.state.selectedIndex];
  component.$slide.style.setProperty(indexVarName, component.state.selectedIndex);
  dispatchSlideChangedEvent(component);
}

export function slotChangedHandler(e) {
  if (this.root.innerHTML !== '') { this.root.innerHTML = ''; }
  const evtOpts = { passive: true };
  this.width = this.getBoundingClientRect().width;
  this.state.count = findTotalCount(this);
  render(this);
  this.$slide = this.root.querySelector(`.${slideClassName}`);

  if (this.listenersAttached) {
    this.removeEventListener('resize', setWidth(this), false);
    this.removeEventListener('mousedown', lockImg, false);
    this.removeEventListener('mouseup', moveImg, false);
    this.removeEventListener('mousemove', dragImg, false);
    this.removeEventListener('touchstart', lockImg, evtOpts);
    this.removeEventListener('touchend', moveImg, evtOpts);
    this.removeEventListener('touchmove', dragImgOnTouch, evtOpts);
    this.listenersAttached = false;
  }
  if (!this.listenersAttached) {
    this.addEventListener('touchstart', lockImg, evtOpts);
    this.addEventListener('touchend', moveImg, evtOpts);
    this.addEventListener('touchmove', dragImgOnTouch, evtOpts);
    this.addEventListener('mousedown', lockImg, false);
    this.addEventListener('mouseup', moveImg, false);
    this.addEventListener('mousemove', dragImg, false);
    this.addEventListener('resize', setWidth(this), false);
    this.listenersAttached = true;
  }
}

export function render(component) {
  if(!component.root) { return; }
  let $template = document.createElement('template');
  $template.innerHTML = html(component);
  component.root.appendChild(document.importNode($template.content, true));
}

export function dispatchSlideChangedEvent(container) {
  container.dispatchEvent(new CustomEvent(slideChangedEventName, {
    detail: {
      selectedIndex: container.selectedIndex,
      selectedImage: container.selectedImage
    },
    composed: true,
    bubbles: true
  }));
}

export function findTotalCount(component) {
  const images = component.querySelectorAll('img');
  return !!images && !!images.length ? images.length : 0;
}

function html(component) {
  return `
    <style>
      ${css(component)}
    </style>
    <div class="${slideClassName}" style="${indexVarName}: ${component.selectedIndex}">
      <slot id="main"></slot>  
    </div>
  `;
}

function css(component) {
  return  `
    :host {
      display: block;
      padding: 0;
      margin: 0;
      overflow-x: hidden;
      max-height: 100%;
    }

    .${slideClassName},
    ::slotted(img) {
      padding: 0;
      margin: 0;
    }

    .${transitionClassName} {
      transition: transform calc(var(${factorVarName}, 1) * .5s) ease-out; 
    }

    .${slideClassName} {
      ${countVarName}: ${component.count || 0};
      display: flex;
      align-items: center;
      min-width: 100%;
      min-height: 50%;
      max-height: 100%;
      height: 100%;
      background-color: var(${bkgColorVarName}, #333);
      width: calc(var(${countVarName}, 1) * 100%);
      overflow-y: hidden;
      transform: translate(calc(var(${indexVarName}, 0) / var(${countVarName}) * -100% + var(${txVarName}, 0px)));
      transition: transform .5s ease-out;
    }

    ::slotted(img) {
      display: block;
      user-select: none;
      width: calc(100% / var(${countVarName}, 1));
      pointer-events: none;
      max-width: 100%;
    }
  `;
}

function setWidth(component) {
  return () => {
    component.width = component.getBoundingClientRect().width;
  };
}

function dragImg(evt) {
  evt.preventDefault();
  dragImgOnTouch(evt);
}

function dragImgOnTouch(evt) {
  const container = evt.target;
  if(!!container && container.isLocked) {
    container.$slide.style.setProperty(txVarName, `${Math.round(unify(evt).clientX - container.position)}px`);
  }
}

function unify(evt) {
  return evt.changedTouches ? evt.changedTouches[0] : evt;
}

function lockImg(evt) {
  const container = evt.target;
  if(!!container && container.$slide) {
    container.position = unify(evt).clientX;
    container.$slide.classList.toggle(transitionClassName, !(container.state.isLocked = true));
  }
}

function moveImg(evt) {
  const container = evt.target;
  if(!!container && container.isLocked){
    let distance = unify(evt).clientX - container.position;
    let direction = Math.sign(distance);
    let factorVal = +(direction * distance / container.width).toFixed(2);
    if((container.selectedIndex > 0 || direction < 0) &&
      (container.selectedIndex < container.count - 1 || direction > 0) && factorVal > .2) {
      container.$slide.style.setProperty(indexVarName, container.state.selectedIndex -= direction);
      factorVal = 1 - factorVal;
    }
    container.$slide.style.setProperty(txVarName, '0px');
    container.$slide.classList.toggle(transitionClassName, !(container.state.isLocked = false));
    container.$slide.style.setProperty(factorVarName, factorVal);
    container.position = 0;
  }
  dispatchSlideChangedEvent(container);
}
