const $ = window.$ || require("jquery");

class DatePickerAccessibleLabelsUtils {
    /**
     * DatePickerAccessibleLabelsUtils
     * @param {DatePickerUtils} utils
     */
    constructor (utils) {
        this.utils = utils;
    }

    /**
     * Add accessible date labels to individual month dates
     * @param {jQuery} $datePickerContainer
     */
    addDateLabels($datePickerContainer) {
        const $dates = $datePickerContainer.find('a.ui-state-default');

        // Make date links sound like buttons in SRs
        $dates.attr('role', 'button');

        // Loop through displayed calendar month, create and append accessible labels to each date
        $dates.each((index, date) => {
            let dateText,
                $date = $(date),
                dayNumber = $date.text(),
                $currentRow = $date.closest('tr'),
                $currentTds = $currentRow.find('td'),
                currentIndex = $.inArray($date.parent()[0], $currentTds),
                $headThs = $datePickerContainer.find('thead tr th'),
                dayIndex = $headThs[currentIndex],
                dayWord = $(dayIndex).find('span').attr('title'),
                monthName = $datePickerContainer.find('.ui-datepicker-month').text(),
                year = $datePickerContainer.find('.ui-datepicker-year').text();

            if (!dayNumber || !monthName || !year || !dayWord) {
                return;
            }

            // SR Reads: "15 April 2020 Wednesday"
            dateText = dayNumber + ' ' + monthName + ' ' + year + ' ' + dayWord;
            $date.attr('aria-label', dateText);
      });
    }

    /**
     * Appends accessible text to the next/previous month buttons
     * @param {jQuery} $button
     * @param {jQuery} $html
     */
    addControlLabels ($button, $html) {
        const isNext = $button.hasClass('ui-datepicker-next');
        const months = [
            'january',
            'february',
            'march',
            'april',
            'may',
            'june',
            'july',
            'august',
            'september',
            'october',
            'november',
            'december'
        ];
        const currentMonth = $html.find('.ui-datepicker-title .ui-datepicker-month').text().toLowerCase();
        const monthIndex = $.inArray(currentMonth.toLowerCase(), months);
        let currentYear = $html.find('.ui-datepicker-title .ui-datepicker-year').text().toLowerCase();
        let adjacentIndex = (isNext) ? monthIndex + 1 : monthIndex - 1;
        let buttonText;

        if (isNext && currentMonth === 'december') {
            currentYear = parseInt(currentYear, 10) + 1;
            adjacentIndex = 0;
        } else if (!isNext && currentMonth === 'january') {
            currentYear = parseInt(currentYear, 10) - 1;
            adjacentIndex = months.length - 1;
        }

        buttonText = (isNext)
            ? 'Next Month, ' + this.utils.firstToCap(months[adjacentIndex]) + ' ' + currentYear
            : 'Previous Month, ' + this.utils.firstToCap(months[adjacentIndex]) + ' ' + currentYear;

        $button.find('.ui-icon').html('<span class="hide">' + buttonText + '</span>');
    }
}

module.exports = DatePickerAccessibleLabelsUtils;
