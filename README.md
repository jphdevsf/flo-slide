# FloSlide

A lightweight, ADA compliant, and responsive carousel gallery component built with vanilla JavaScript. [Try the demo](https://jphdevsf.github.io/flo-slide/).

## Features

- ⚡ **Lightweight** - Minimal footprint with tree-shaking support for modern bundlers
- 📱 **Touch Optimized** - Swipe fluidly on mobile devices with smooth touch gestures
- ♿ **ADA Compliant** - Built with accessibility in mind, supporting keyboard navigation and screen readers
- 📱 **Responsive** - Automatically adapts to different screen sizes and touch devices
- 🔧 **Flexible Configuration** - Customize UI nav options like arrows, dots, and scrollbar per breakpoint
- 🎨 **Minimal Styling** - Clean, minimal CSS that's ready to be customized
- 🎯 **Zero Dependencies** - Pure JavaScript implementation, no external dependencies required

## Install

### Install via NPM
Coming soon!

### From Repo (Un-minified)
For development.
1. Clone [repo](https://github.com/jphdevsf/flo-slide) to local.
2. Copy all contents of `flo-slide/src/` to your project.
3. Done! Import into your larger JS codebase.

### From Repo (Minified)
For production deployments.
1. Clone [repo](https://github.com/jphdevsf/flo-slide) to local.
2. In CLI navigate to `flo-slide/` folder.
3. Run `npm install`.
4. Run `npm run build`.
5. Done! Copy `dist/flo-slide.min.js` to your project.

## Usage

### Basic Usage

```javascript
// Basic Usage
FloSlide('.js-my-basic-carousel');

// Advanced Usage
FloSlide('.js-my-fancy-carousel', {
  slidesToShow: 1.25,
  slidesToScroll: 2,
  fade: false,
  arrows: false,
  dots: false,
  scrollbar: true,
  clickDrag: true,
  customArrows: '<svg>...</svg>',
  responsive: {
    600: {
      slidesToShow: 2.25,
      slidesToScroll: 2,
      scrollbar: false,
      dots: true
    },
    1028: {
      slidesToShow: 4,
      slidesToScroll: 2,
      scrollbar: false,
      dots: true,
      arrows: true
    }
  }
})
```

#### Understanding Responsive Configuration
Mobile-Up Cascading Behavior: Configure your base options for the smallest devices outside the responsive object. As screen size increases, options cascade upward and do NOT need to be set again unless you explicitly want to change that at a desired breakpoint.


## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `slidesToShow` | Number | 4 | Number of slides to show at once |
| `slidesToScroll` | Number | 1 | Number of slides to scroll at a time |
| `autoplay` | Boolean | false | Enable automatic sliding |
| `autoplaySpeed` | Number | 3000 | Autoplay interval in milliseconds |
| `arrows` | Boolean | true | Show navigation arrows |
| `dots` | Boolean | true | Show pagination dots |
| `fade` | Boolean | false | Enable fade transition effect between slides |
| `scrollbar` | Boolean | true | Show custom scrollbar for navigation |
| `clickDrag` | Boolean | true | Enable click and drag navigation |
| `customArrows` | String | null | Custom HTML string for arrow elements (e.g., SVG) |
| `infinite` | Boolean | true | Infinite loop sliding |
| `responsive` | Array | [] | Responsive breakpoint settings |

## Browser Support
flo-slide supports all modern browsers including:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Project Structure
```
flo-slide/
├── dist/                 # Built outputs
│   ├── flo-slide.esm.js      # ES Module version
│   ├── flo-slide.esm.js.map  # Source map
│   ├── flo-slide.min.js      # Minified UMD version
│   ├── flo-slide.min.js.map  # Source map
│   ├── styles.css            # Unminified CSS
│   └── styles.min.css        # Minified CSS with vendor prefixes
├── docs/                 # GitHub Pages demo site
│   └── index.html
├── src/                  # Core source code
│   ├── arrows.js
│   ├── clickDrag.js
│   ├── dots.js
│   ├── [index.js](http://_vscodecontentref_/0)
│   ├── scrollbar.js
│   ├── styles.scss
│   └── utils.js
├── [package.json](http://_vscodecontentref_/1)
├── [rollup.config.js](http://_vscodecontentref_/2)
├── [postcss.config.js](http://_vscodecontentref_/3)
├── .npmignore
└── [README.md](http://_vscodecontentref_/4)
```

## License
© 2025 jphdevsf. Released under ISC.