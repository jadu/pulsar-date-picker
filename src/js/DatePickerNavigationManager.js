const $ = window.$ || require("jquery");

class DatePickerNavigationManager {
    /**
     * DatePickerNavigationManager
     * @param {DatePickerUtils} utils
     * @param {DatePickerHighlightUtils} highlightUtils
     */
    constructor (utils, highlightUtils) {
        this.utils = utils;
        this.highlightUtils = highlightUtils;
    }

    /**
     * Navigate one month forwards or backwards
     * @param {jQuery} $currentDate
     * @param {string} direction
     * @param {jQuery} $datePickerContainer
     * @param {jQuery} $nextLink
     * @param {jQuery} $prevLink
     */
    navigateOneMonth($currentDate, direction, $datePickerContainer, $nextLink, $prevLink) {
        // Selector for enable dates
        const ENABLED_SELECTOR = 'tbody td:not(.ui-state-disabled)';

        // Get details on the current month and selected date
        const $currentMonthsCells = $datePickerContainer.find(ENABLED_SELECTOR);
        let currentMonthsSelectedDateIndex = $.inArray($currentDate.parent()[0], $currentMonthsCells);

        // Click the appropriate calendar control
        if (direction === 'next') {
            $nextLink.trigger('click');
        } else {
            $prevLink.trigger('click');
        }

        // Get cells and corrisponding TD in new month
        const $newCells = $datePickerContainer.find(ENABLED_SELECTOR);
        let newTd = $newCells[currentMonthsSelectedDateIndex];

        // New months corrisponding date link
        let $newAnchor = newTd && $(newTd).find('a');

        // If the corrisponding date in the new month doesn't exist, go back a date until we find one
        while (!$newAnchor) {
            currentMonthsSelectedDateIndex--;
            newTd = $newCells[currentMonthsSelectedDateIndex];
            $newAnchor = newTd && $(newTd).find('a');
        }

        // Highlight the corresponding date
        this.highlightUtils.setHighlightState($newAnchor, $datePickerContainer);

        // Focus the date
        $newAnchor.trigger('focus');
    }

    /**
     * Go back one day
     * @param {jQuery} $currentDate existing date before move
     * @param {jQuery} $datePickerContainer
     */
    goToPreviousDay($currentDate, $datePickerContainer) {
        const $td = $currentDate.closest('td');
        const $prevTd = $td.prev();
        const $prevDateLink = $prevTd.find('a.ui-state-default');

        if ($prevTd.length && $prevDateLink.length) {
            // Highlight and focus new date
            this.highlightUtils.setHighlightState($prevDateLink, $datePickerContainer);
            $prevDateLink.trigger('focus');
        } else {
            this.goToPreviousDayInPreviousWeek($currentDate, $datePickerContainer);
        }
    }

    /**
     * Go back to previous day when previous day is in previous week
     * @param {jQuery} $currentDate existing date before move
     * @param {jQuery} $datePickerContainer
     */
    goToPreviousDayInPreviousWeek($currentDate, $datePickerContainer) {
        const $currentRow = $currentDate.closest('tr');
        const $previousRow = $currentRow.prev();

        if (!$previousRow || $previousRow.length === 0) {
            // No previous row, so go to previous month
            this.goToPreviousMonth($datePickerContainer);
        } else {
            const $prevRowDates = $previousRow.find('td a.ui-state-default'),
                $prevRowDate = $prevRowDates.last();

            if ($prevRowDate.length) {
                // Highlight and focus new date
                this.highlightUtils.setHighlightState($prevRowDate, $datePickerContainer);
                $prevRowDate.trigger('focus');
            }
        }
    }

    /**
     * Go back to previous day when previous day is in previous month
     * @param {jQuery} $datePickerContainer
     */
    goToPreviousMonth ($datePickerContainer) {
        const $prevLink = $datePickerContainer.find('.ui-datepicker-prev');
        $prevLink.trigger('click');

        // Focus last day of new month
        const $trs = $datePickerContainer.find('tr');
        const $lastRowTdLinks = $trs.last().find('td a.ui-state-default');
        const $lastDate = $lastRowTdLinks.last();

        // Highlight and focus new date
        this.highlightUtils.setHighlightState($lastDate, $datePickerContainer);
        $lastDate.trigger('focus');
    }

    /**
     * Go forward one day
     * @param {jQuery} $currentDate existing date before move
     * @param {jQuery} $datePickerContainer
     */
    goToNextDay($currentDate, $datePickerContainer) {
        const $td = $currentDate.closest('td');
        const $nextTd = $td.next();
        const $nextDateLink = $nextTd.find('a.ui-state-default');

        // If date in same row as current
        if ($nextTd.length && $nextDateLink.length) {
            // Highlight and focus new date
            this.highlightUtils.setHighlightState($nextDateLink, $datePickerContainer);
            $nextDateLink.trigger('focus');
        } else {
            // If date on new row, shift to first date in row
            this.goToNextDayInNextWeek($currentDate, $datePickerContainer);
        }
    }

    /**
     * Go to next day when next day is in next week
     * @param {jQuery} $currentDate existing date before move
     * @param {jQuery} $datePickerContainer
     */
    goToNextDayInNextWeek($currentDate, $datePickerContainer) {
        const $currentRow = $currentDate.closest('tr');
        const $nextRow = $currentRow.next();

        if (!$nextRow || $nextRow.length === 0) {
            this.goToNextMonth($datePickerContainer);
        } else {
            const $nextRowFirstDate = $nextRow.find('a.ui-state-default').first();

            if ($nextRowFirstDate.length) {
                // Highlight and focus new date
                this.highlightUtils.setHighlightState($nextRowFirstDate, $datePickerContainer);
                $nextRowFirstDate.trigger('focus');
            }
        }
    }

    /**
     * Go to next day when next day is in next month
     * @param {jQuery} $datePickerContainer
     */
    goToNextMonth ($datePickerContainer) {
        const $nextLink = $datePickerContainer.find('.ui-datepicker-next');
        $nextLink.trigger('click');

        const $firstDate = $datePickerContainer.find('a.ui-state-default').first();

        // Highlight and focus new date
        this.highlightUtils.setHighlightState($firstDate, $datePickerContainer);
        $firstDate.trigger('focus');
    }

    /**
     * Go to previous date directly above the current date
     * @param {jQuery} $currentDate
     * @param {jQuery} $datePickerContainer
     */
    goUp ($currentDate, $datePickerContainer) {
        const $currentDateRow = $currentDate.closest('tr');
        const $prevLink = $datePickerContainer.find('.ui-datepicker-prev');
        const $rowTds = $currentDateRow.find('td');
        const $rowLinks = $currentDateRow.find('a.ui-state-default');
        const currentDateIndex = $.inArray($currentDate[0], $rowLinks);
        const $prevRow = $currentDateRow.prev();
        const $prevRowTds = $prevRow.find('td');
        const parallel = $prevRowTds[currentDateIndex];

        let $linkCheck = $(parallel).find('a.ui-state-default');

        if ($prevRow.length && parallel && $linkCheck.length) {
            // there is a previous row, a td at the same index
            // of the current date AND theres a link in that td
            this.highlightUtils.setHighlightState($linkCheck, $datePickerContainer);
            $linkCheck.trigger('focus');
        } else {
            // we're either on the first row of a month, or we're on the
            // second and there is not a date link directly above the current date
            $prevLink.trigger('click');

            const $newRows = $datePickerContainer.find('tr');
            const lastRow = $newRows[$newRows.length - 1];
            const $lastRowTds = $(lastRow).find('td');
            const tdParallelIndex = $.inArray($currentDate.parent()[0], $rowTds);
            const newParallel = $lastRowTds[tdParallelIndex];
            const $newCheck = $(newParallel).find('a.ui-state-default');

            if (lastRow && newParallel && $newCheck.length) {
                this.highlightUtils.setHighlightState($newCheck, $datePickerContainer);
                $newCheck.trigger('focus');
            } else {
                // theres no date link on the last week (row) of the new month
                // meaning its an empty cell, so we'll try the 2nd to last week
                const secondLastRow = $newRows[$newRows.length - 2];
                const $secondTds = $(secondLastRow).find('td');
                const targetTd = $secondTds[tdParallelIndex];

                $linkCheck = $(targetTd).find('a.ui-state-default');

                if ($linkCheck.length) {
                    this.highlightUtils.setHighlightState($linkCheck, $datePickerContainer);
                    $linkCheck.trigger('focus');
                }
            }
        }
    }

    /**
     * Go to the date directly below the current date
     * @param {jQuery} $currentDate
     * @param {jQuery} $datePickerContainer
     */
    goDown ($currentDate, $datePickerContainer) {
        const $currentDateRow = $currentDate.closest('tr');
        const $nextLink = $datePickerContainer.find('.ui-datepicker-next');
        const $currentDateRowCells = $currentDateRow.find('td');
        const cellIndex = $.inArray($currentDate.parent()[0], $currentDateRowCells);
        const $nextRow = $currentDateRow.next();
        const $nextRowCells = $nextRow.find('td');
        const nextWeekTd = $nextRowCells[cellIndex];
        const $nextWeekCheck = $(nextWeekTd).find('a.ui-state-default');

        if ($nextRow.length && nextWeekTd && $nextWeekCheck.length) {
            // theres a next row, a TD at the same index of the current date,
            // and theres an anchor within that td
            this.highlightUtils.setHighlightState($nextWeekCheck, $datePickerContainer);
            $nextWeekCheck.trigger('focus');
        } else {
            $nextLink.trigger('click');

            const $nextMonthTrs = $datePickerContainer.find('tbody tr');
            const $firstTds = $nextMonthTrs.find('td');
            const firstParallel = $firstTds[cellIndex];
            const $firstCheck = $(firstParallel).find('a.ui-state-default');

            // if next week parallel date is in same month
            if (firstParallel && $firstCheck.length) {
                this.highlightUtils.setHighlightState($firstCheck, $datePickerContainer);
                $firstCheck.trigger('focus');
            } else {
                // if not in same month
                // lets try the second row b/c we didnt find a
                // date link in the first row at the current dates index
                const secondRow = $nextMonthTrs[1];
                const $secondTds = $(secondRow).find('td');
                const secondRowTargetTd = $secondTds[cellIndex];
                const $secondCheck = $(secondRowTargetTd).find('a.ui-state-default');

                if (secondRow && $secondCheck.length) {
                    this.highlightUtils.setHighlightState($secondCheck, $datePickerContainer);
                    $secondCheck.trigger('focus');
                }
            }
        }
    }
}

module.exports = DatePickerNavigationManager;
