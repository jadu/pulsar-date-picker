class DatePickerUtils {
    /**
     * Gets the current date based on the highlight class
     * @param {jQuery} $container
     */
    getCurrentDate ($container) {
        const $currentDate = $container.find('.ui-state-highlight');
        return $currentDate;
    }

    /**
     * Remove aria-hidden from main main structure to make the rest of the page accessible again
     */
    removeAria ($html) {
        $html.find('.container').removeAttr('aria-hidden');
        $html.find('.skip-link').removeAttr('aria-hidden');
        $html.find('.footer').removeAttr('aria-hidden');
    }

    /**
     * Returns the string with the first letter capitalized
     * @param {string} string
     */
    firstToCap (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

module.exports = DatePickerUtils;
