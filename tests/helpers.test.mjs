import {
  render,
  findTotalCount,
  updateSlideBy,
  dispatchSlideChangedEvent
} from '../partials/helpers.mjs';
import { ComponentStub } from './component-stub.mjs';

const { test, module } = QUnit;
const beforeEach = () => {
  Component = document.createElement('component-stub');
  Component.innerHTML = `
    <img src="assets/1738655.jpg" alt=""/>
    <img src="assets/2218913.jpg" alt=""/>
    <img src="assets/3311574.jpg" alt=""/>
  `;
  document.body.appendChild(Component);
};
const afterEach = () => {
  document.querySelector('component-stub').outerHTML = '';
  Component = null;
};
let Component = null;
if(!window.customElements.get('component-stub')){
  window.customElements.define('component-stub', ComponentStub);
}

module('render()', { beforeEach, afterEach });

test('it should update the shadowRoot html', async (assert) => {
  assert.ok(Component.root.querySelectorAll('slot').length === 0);
  await render(Component);
  assert.ok(Component.root.querySelectorAll('slot').length === 1);
});

module('findTotalCount()', { beforeEach, afterEach });

test('it should return 0 when no images are present', (assert) => {
  Component.innerHTML = '';
  const count = findTotalCount(Component);
  assert.ok(count === 0);
});

test('it should return the total amount of <img> elements', (assert) => {
  const count = findTotalCount(Component);
  assert.ok(count === 3);
});

module('dispatchSlideChangedEvent()', { beforeEach, afterEach });

test('it should expose the current index and element', async (assert) => {
  await render(Component);
  Component.$slide = Component.root.querySelector('.img_slider__container');
  Component.selectedIndex = 1;
  Component.selectedImage = 'blah';
  document.querySelector('component-stub').addEventListener('slide-changed', (e) => {
    assert.ok(e.detail.selectedIndex === 1);
    assert.ok(e.detail.selectedImage === 'blah');
  }, true);
  dispatchSlideChangedEvent(Component);
});

module('updateSlideBy()', { beforeEach, afterEach });

test('it should set the "selectedIndex" property', async (assert) => {
  await render(Component);
  Component.$slide = Component.root.querySelector('.img_slider__container');
  assert.ok(Component.state.selectedIndex === 0);
  updateSlideBy(1, Component);
  assert.ok(Component.state.selectedIndex === 1);
});

test('it should set the "selectedImage" property', async (assert) => {
  await render(Component);
  Component.$slide = Component.root.querySelector('.img_slider__container');
  assert.ok(Component.state.selectedImage  === null);
  updateSlideBy(2, Component);
  assert.ok(Component.state.selectedImage.getAttribute('src') === 'assets/3311574.jpg');
});

test('it should set the "--image-slider--index" property', async (assert) => {
  await render(Component);
  Component.$slide = Component.root.querySelector('.img_slider__container');
  // Note: Strange false value is returned for '0' as a a string. parseInt fixes the test
  assert.ok(parseInt(window.getComputedStyle(Component.$slide).getPropertyValue('--image-slider--index'), 10) === 0);
  updateSlideBy(2, Component);
  assert.ok(window.getComputedStyle(Component.$slide).getPropertyValue('--image-slider--index') === '2');
});
