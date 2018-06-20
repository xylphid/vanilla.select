# Vanilla select

vanilla.select is a simple overlay for select (multiple or not) you can customize easily.

## Requirements

* [vanilla](https://github.com/xylphid/vanilla) (> 1.0.6)

## Installation

Include [vanilla](https://github.com/xylphid/vanilla) and `vanilla.select.min.js`script :
```html
<script src="vanilla.min.js" type="text/javascript" charset="utf-8" />
<script src="vanilla.select.min.js" type="text/javascript" charset="utf-8" />
```

Include the modal requirements and `vanilla.select.css` default style :
```html
<link rel="stylesheet" href="vanilla.select.css" type="text/css" media="screen" />
```

## Usage

Add `beautify` class to any of the select elements you want to transform.
```html
<select name="my-select" class="beautify">
    <option>item 1</option>
    <option>item 2</option>
    <option>item 4</option>
</select>
```

You can also add `data-placeholder` attribute to define a specific default placeholder value.

```html
<select name="my-select" class="beautify" data-placeholder="Select items">
    <option>item 1</option>
    <option>item 2</option>
    <option>item 4</option>
</select>
```
It will display `Select items` when no option is selected.

## Options

These are the supported options and their default values:
```js
vanilla.select.defaults = {
    placeholder: {
        maxLength: 2,                   // Max item displayed in the placeholder
        empty: 'No selection',          // Empty text
        overflow: '{0} items selected'  // Text template when selected items > maxLength
    }
};
```