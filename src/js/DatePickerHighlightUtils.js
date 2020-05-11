class DatePickerHighlightUtils {
    /**
     * DatePickerHighlightUtils
     * @param {DatePickerUtils} utils
     */
    constructor (utils) {
        this.utils = utils;
    }

    /**
     * Calculate which date should be highlighted in month
     * @param {jQuery} $container
     */
    prepHighlightState ($datePickerContainer) {
        let $highlight

        // If we have an existing highlight use that, if not grab the first of the month
        if ($datePickerContainer.find('.ui-state-highlight').length) {
            $highlight = $datePickerContainer.find('.ui-state-highlight').first()
        } else {
            $highlight = $datePickerContainer.find('.ui-state-default').first();
        }

        // Set the highlight
        if ($highlight.length && $datePickerContainer.length) {
            this.setHighlightState($highlight, $datePickerContainer);
        }
    }

    /**
     * Lighlight appropriate date
     * @param {jQuery} $newHighlight element to highlight
     * @param {jQuery} $container
     */
    setHighlightState ($newHighlight, $container) {
        const $prevHighlight = this.utils.getCurrentDate($container);
        // Remove the highlight state from previously
        // highlighted date and add it to our newly active date
        $prevHighlight.removeClass('ui-state-highlight');
        $newHighlight.addClass('ui-state-highlight');
    }
}

module.exports = DatePickerHighlightUtils;
