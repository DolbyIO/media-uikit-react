# @dolbyio/core-ui

## Quick start

We use React / Storybook to develop these components locally. Refer to the documentation for [media-uikit-react](../media-uikit-react/README#quick-start) for information on how to run Storybook on your local machine.

## Customisation

Our CSS property naming is inspired by [BEM](http://getbem.com/introduction/), where the component is the `Block`, a nested element (and optional pseudo-selector) is the `Element` and the CSS property is the `Modifier`.

### Examples

To set the `border-color` property of a nested `input` element inside of a `text-input` web component:

```css
/* Equivalent to input { border-color: grey } */
--text-input__input__border-color: grey;
```

If the nested element supports pseudo-classes (prefixed with `:`) or pseudo-elements (prefixed with `::`), these can be added on to the `Element` identifer using `-` or `--`.

```css
/* Equivalent to input:focus { border-color: black } */
--text-input__input-focus__border-color: black;

/* Equivalent to input::placeholder { color: grey } - note the extra hyphen */
--text-input__input--placeholder__color: grey;
```
