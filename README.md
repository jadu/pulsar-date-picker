# Pulsar Date Picker

An accessible single date picker built on the jQuery UI date picker.

### JavaScript

You will need to initialise the Date Picker from a file within your Browserify bundle.

```javascript
const datePicker = require('pulsar-date-picker');

$(function () {
    datePicker.init($html);
});
```

### Styles

Include the Date Picker styles into your existing Sass bundle.

```scss
@import '/path/to/pulsar-date-picker/src/scss/styles.scss
```

### Usage

You'll need a trigger button for the Date Picker and your date input to have the following data attributes: `data-pulsardatepicker="true"` and `data-pulsardatepicker-trigger="ID-of-trigger-button"`.

For example:

```html
<label for="example">Pick a date</label>
<input data-pulsardatepicker="true" id="example" data-pulsardatepicker-trigger="trigger-button" type="text">
<button type="button" id="trigger-button">Show calendar</button>
```

#### Date formats

The date picker defaults to `DD/MM/YYYY`. For the US date format `MM/DD/YYYY` add `data-pulsardatepicker-format="US"` to the date input. Alternatively for a reverse format `YYYY/MM/DD` add `data-pulsardatepicker-format="reverse"`.

### Behaviour

The Date Picker enhances the default jQuery UI date picker with the following:

#### Keyboard accessibility

- `ESC` closes the date picker
- `Enter` and `SPACE` can be pressed to select a date
- `TAB` and `SHIFT + TAB` can be used to cycle through the date picker controls
- `ARROW KEYS` can be used to navigate the displayed dates or navigate to a previous/future week or month
- `PAGE UP` goes to the previous month
- `PAGE DOWN` goes to the next month
- `HOME` goes to the first date of the month
- `END` goes to the last date of the month
- Previous/Next controls can be focussed and activated via keyboard
- Keyboard focus is trapped within the picker to avoid AT users leaving the picker by accident

#### Accessible labels

- Dates have accessible labels, for example: `aria-label="7 May 2020 Thursday"`
- Previous / Next month controls have accessible labels, for example: `Next Month, June 2020` and `Previous Month, April 2020`.

#### Misc

- A `placeholder` matching the date format is added to the date input
- `autocomplete` is disabled on the date input
- Various attribute changes such as removing unnessisary `title` attributes and addition of `role="button"` on certain links (such as dates).

### Demo

Within your local checkout, run `npm install`, `grunt` and then open `demo/index.html` to view a simple demo.

### Tests

Run the test suite to check expected functionality.

```
npm test
```

Generate a code coverage report, which can be viewed by opening `/coverage/lcov-report/index.html`

```
npm run coverage
```
