import DatePickerUtils from './DatePickerUtils';
import DatePickerHighlightUtils from './DatePickerHighlightUtils';
import DatePickerAccessibleLabelsUtils from './DatePickerAccessibleLabelsUtils';
import DatePickerNavigationManager from './DatePickerNavigationManager';
import DatePicker from './DatePicker';

class DatePickerFactory {
    /**
     * Create an instance of a Datepicker with it's options and dependencies
     * @returns {DatePicker}
     */
    static create () {
        const utils = new DatePickerUtils();
        const highlightUtils = new DatePickerHighlightUtils(utils);
        const navigationManager = new DatePickerNavigationManager(utils, highlightUtils)

        return new DatePicker(
            utils,
            highlightUtils,
            new DatePickerAccessibleLabelsUtils(utils),
            navigationManager
        );
    }
}

module.exports = DatePickerFactory;
