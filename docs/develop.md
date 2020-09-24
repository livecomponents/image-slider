- [Main documentation](../README.md)
- [Contribution documentation](docs/contribute.md)

# Development
### Setup
To initialize this component for all supported browsers, you must add scripts to the head of the document that point to their location on the CDN.

#### Initialization HTML (SkyPack)
```html
<!-- OPTIONAL: preloaded dependency for a performance boost -->
<link rel="preload" crossorigin href="https://cdn.skypack.dev/@live-components/image-slider/partials/helpers.mjs" crossorigin as="script"/>

<!-- REQUIRED: main module for modern Evergreen browsers  (Safari, Edge, Chrome, Mobile Safari, and Firefox) -->
<script crossorigin type="module" src="https://cdn.skypack.dev/@live-components/image-slider"></script>

<!-- OPTIONAL: fallback module if basic styling and function support for older browsers is needed (IE11) -->
<script crossorigin nomodule type="text/javascript" src="https://cdn.skypack.dev/@live-components/image-slider/nomodule.js"></script>
```

#### Alternate Initialization HTML (Unpkg)
```html
<link rel="preload" crossorigin href="https://unpkg.com/@live-components/image-slider/partials/helpers.mjs" crossorigin as="script"/>
<script crossorigin type="module" src="https://unpkg.com/@live-components/image-slider"></script>
<script crossorigin nomodule type="text/javascript" src="https://unpkg.com//@live-components/image-slider/nomodule.js"></script>
```

#### Minimal HTML Content (for SEO)*
This is the HTML required to be on page before Google can scan the page for their indexing algorithm. This is usually achieved via `prerendering` or `server side rendering (SSR)`. None of the JavaScript or CSS for the `<image-slider />` is necessary for the page to be indexed. Conversely, the HTML navigation links MUST be on the page.

```html
  <image-slider>
    <!-- <img /> elements go here -->
  </image-slider>
```

### Theming
Set these values to get different themes.

| **Variable Name** | **Default Value** |
| --- | --- |
| `--image-slider--bkg-color` | `var(--image-slider--bkg-color, #333)` |

### Attributes
None

### Properties

### API (methods)
| **name** | **example** | **params** | **details** |
| --- | --- | --- | --- |
| **next** | `document.querySelector('image-slider').next()` | None | sets the next image HTML element as the current one and moves the slide accordingly. If the currengt image is the last image in the `image-slider` instance, nothing happens. |
| **prev** | `document.querySelector('image-slider').prev()` | None | sets the previous image HTML element as the current one and moves the slide accordingly. If the current image is the first image in the `image-slider` instance, nothing happens. |
| **last** | `document.querySelector('image-slider').last()` | None | sets the current image to be the last image in the `image-slider` instance and moves the slide accordingly. If the current image is the last image in the `image-slider` instance, nothing happens. |
| **first** | `document.querySelector('image-slider').first()` | None | sets the current image to be the first image in the `image-slider` instance and moves the slide accordingly. If the current image is the first image in the `image-slider` instance, nothing happens. |
| **slideTo** | `document.querySelector('image-slider').slideTo(1)` | the nth number of img to slide to | sets the current slide to be the nth slide of the `image-slider` instance and moves the slide accordingly. | 
 
### Slots
No named slots (only the default slot)

### Custom Event Hooks
| **name** | **detail data** | **summary** |
| --- | --- | --- |
| `slide-changed` | `{ selectedIndex: number, selectedImage: DOM Element reference }` | triggers when the current slide is updated |

## Dependencies
None

## Customization
None

## Base CSS
Please note that some CSS is injected to the head when the `nomodule` javascript is invoked. This only worked on initialization of this codebase (ONLY once). This is done to ensure that styling for slots is 'bulletproof' nor does it prevent overrides from css resets and external files.

## NPM Scripts
| **command** | **summary** |
| --- | --- |
| `npm run build` | handles compression. The main file is compressed to brotli and the fallback file (or 'nomodule' file) is compressed to gzip |
| `npm run test` | runs unit tests | 
| `npm run start` | runs an dev server to test the component (port 5000) |

## Notes
* CSS Custom Properties are used to dynamically calculate positioning when the image is dragged horizontally. Based on the position it with move to the next `<img />` in the `image-slider` instance. 
* This component only supports the `<img />` HTML tag ATM.
  * **(Potential Feature Request)** Due to styling issues, `<picture>` is currently not supported. Eventually it would be great to have `<picture>` support.
  * **(BUG)** Other HTML WILL be slotted BUT will break functionality. Only use `<img>` tags until this bug is fixed.
* **(Potential Infrastructure Request)** Needs E2E tests added to test the public API. Unit tests are currently in place but it would be great to have that extra support.
* **(Potential Feature Request)** It would be great to get even better transitioning of slides (performance and even smoother animation with options).
