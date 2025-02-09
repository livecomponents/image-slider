# &lt;image-slider>
## *A Simple ESM Image Slider Web Component*

- [Developer documentation](docs/develop.md)
<!-- - [Contribution documentation](docs/contribute.md) -->

## Developer Experience

**Image Slider**

* install as an HTML Script Tag
* very small byte size over the wire > `3.1kb`
* optimal content compression > brotli (gzip for nomodule js)
* excellent browser support
  * IE11 (nomodule-only basic css)
  * full support for the last 2 versions of Safari, Edge, Firefox, Mobile Safari, Chrome
* minimal developer tooling
  * `Qunit` (unit testing)
  * `bread-compressor` cli (for gzip and br)
  * SkyPack CDN via NPM (distribution)*
* Indirect SSR Support
  * minimal HTML boilerplate (HTML slots plus wrapper)
  * JS not loaded on server and HTML is identical on server and browser

**(*) Unpkg and AWS S3/Cloudfront (plus some tooling) are other alternative distribution method as well.** 

**Requirements**

- a target application that supports HTML, JS, and CSS

## Terminology
| **term** | **definition** | **resources** |
| --- | --- | --- |
| *Web Component* | A native 1st class browser HTML node built with a combination of Custom Elements, Shadow DOM, and HTML Template tags | [webcomponents.org](https://wwww.webcomponents.org) |
| *Custom Element* | A custom & native 1st Class browser HTML element complete with lifecycyle methods and a constructor | [Using Custom ELements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) |
| *Shadow DOM* | Native encapulation for HTML on a page similar to DOM Fragments or IFrames | |
| *Shadow Root* | The reference container for a given Shadow DOM instance |[Using Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) |
| *Slot* | Transclusion HTML Nodes for Shadow DOM that live in the 'Light' DOM but are slotted into the Shadow DOM | [Slot usage](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot), [Slots and Template Tags](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)  |
| *Custom Properties (AKA CSS Variables)* | scoped CSS values that can pierce through Shadow DOM | [Using Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) |
| *Custom Events* | Events that are developer created and typically pass data to the evt object | [Creating and triggering Custom Events](https://javascript.info/dispatch-events) |