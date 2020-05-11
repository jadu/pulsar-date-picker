const $ = window.$ || require("jquery");
require('jquery-ui/ui/widgets/datepicker');

class DatePicker {
    /**
     * DatePicker
     * @param {DatePickerUtils} utils
     * @param {DatePickerHighlightUtils} highlightUtils
     * @param {DatePickerAccessibleLabelUtils} accessibleLabelUtils
     * @param {DatePickerNavigationManager} navigationManager
     */
    constructor (utils, highlightUtils, accessibleLabelUtils, navigationManager) {
        /**
         * Root html element
         * @type {JQuery|null}
         */
        this.$html = null;
        /**
         * Calendar trigger button
         * @type {JQuery|null}
         */
        this.$triggerButton = null;
        /**
         * Date input
         * @type {JQuery|null}
         */
        this.$dateInput = null;
        /**
         * Calendar next month link
         * @type {JQuery|null}
         */
        this.$nextLink = null;
        /**
         * Calendar previous month link
         * @type {JQuery|null}
         */
        this.$prevLink = null;
        /**
         * Calendar today link
         * @type {JQuery|null}
         */
        this.$todayLink = null;
        /**
         * Calendar wrapper
         * @type {JQuery|null}
         */
        this.$datePickerContainer = null;

        this.utils = utils;
        this.highlightUtils = highlightUtils;
        this.accessibleLabelUtils = accessibleLabelUtils;
        this.navigationManager = navigationManager;
    }

    /**
     * Initialize
     * @param {jQuery} $html
     */
    init ($html) {
        this.$html = $html;

        const $datePickers = $html.find('[data-pulsardatepicker="true"]');
        let defaultDateFormat;
        let inputPlaceholder;

        $datePickers.each((index, element) => {
            let $datePickerInput = $(element);
            let dateFormat = $datePickerInput.attr('data-pulsardatepicker-format');
            let $linkedTriggerButtonId = $datePickerInput.attr('data-pulsardatepicker-trigger');
            let $linkedTriggerButton = this.$html.find('#' + $linkedTriggerButtonId);

            if ($datePickerInput.attr('data-pulsardatepicker-trigger') === undefined) {
                console.warn('Datepicker: The date input must include a data-pulsardatepicker-trigger data attribute with the value matching the ID of the trigger button');
                return;
            }

            if (!$linkedTriggerButton.length) {
                console.warn('Datepicker: The trigger button element with the ID given in data-pulsardatepicker-trigger cannot be found');
                return;
            }

            // Check if data-pulsardatepicker-format attribute exists and lowercase it
            // to eliminate different styles of writing issues
            if (dateFormat !== undefined) {
                dateFormat = dateFormat.toLowerCase();
            }

            // Set date formats
            switch (dateFormat) {
                case 'us':
                    defaultDateFormat = 'mm/dd/yy';
                    inputPlaceholder = 'mm/dd/yyyy';
                    break;
                case 'reverse':
                    defaultDateFormat = 'yy/mm/dd';
                    inputPlaceholder = 'yyyy/mm/dd';
                    break;
                default:
                    defaultDateFormat = 'dd/mm/yy';
                    inputPlaceholder = 'dd/mm/yyyy'
            }

            // Initialize date pickers
            $datePickerInput.datepicker({
                closeText: 'Close',
                dayNamesShort: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dateFormat: defaultDateFormat,
                onClose: this.utils.removeAria.bind(this, $html),
                showAnim: '',
                showButtonPanel: true,
                showOn: 'button',
                // Hide the default JQUI trigger button so we can attach to our own
                beforeShow: function (input, inst) {
                    $(inst.dpDiv).addClass('pulsar-datepicker');
                }
            });

            // Add placeholder matching the date format, allowing for difference in string format
            $datePickerInput.attr('placeholder', inputPlaceholder);

            // Switch off autocomplete to avoid it overlapping the date picker
            $datePickerInput.attr('autocomplete', 'off');

            $linkedTriggerButton.on('click', this.enhanceDatePicker.bind(this, $datePickerInput));
        });

        $html.on('click', '#ui-datepicker-div .ui-datepicker-close', () => {
            this.closeCalendar();
        });
    }

    /**
     * Enhance the jQuery UI datepicker on trigger button click event
     * @param {Event} event
     */
    enhanceDatePicker ($datePickerInput, event) {
        event.preventDefault();

        this.$triggerButton = $(event.target);
        this.$dateInput = $datePickerInput;
        this.$dateInput.datepicker('show');
        this.$datePickerContainer = this.$html.find('#ui-datepicker-div');

        // Hide the entire page (except the date picker)
        // from screen readers to prevent document navigation
        // (by headings, etc.) while the popup is open
        this.$html.find('.container').attr('aria-hidden','true');
        this.$html.find('.skip-link').attr('aria-hidden','true');
        this.$html.find('.footer').attr('aria-hidden','true');

        // Hide the "today" button because it doesn't work as expected
        this.$html.find('.ui-datepicker-current').addClass('u-display-none');

        let $today = this.$html.find('.ui-datepicker-today a');
        if (!$today.length) {
            // If today isn't on the displayed month, use either the selected date (active) or the first of the month
            $today = this.$html.find('.ui-state-active') || this.$html.find('.ui-state-default').first();
        }
        $today.trigger('focus');

        this.$datePickerContainer.attr('role', 'application');
        this.$datePickerContainer.attr('aria-label', 'Calendar view date-picker');
        this.updateHeaderElements();

        // Remove previously bound handler so it doesn't bind twice
        // when mutiple date pickers are opened and closed
        this.$datePickerContainer.off('keydown');

        // Attach keyboard accessibility enhancements
        this.boundDatePickerKeyHandler = this.datePickerKeyHandler.bind(this, this.$datePickerContainer);
        this.$datePickerContainer.on('keydown', this.boundDatePickerKeyHandler);
    }

    /**
     * Handle calendar keypress event
     * @param {jQuery} $container
     * @param {Event} keyEvent
     */
    datePickerKeyHandler ($container, keyEvent) {
        const keyCode = keyEvent.keyCode;
        const $target = $(keyEvent.target);
        const keyCodes = {
            'ESC': 27,
            'TAB': 9,
            'LEFT': 37,
            'RIGHT': 39,
            'UP': 38,
            'DOWN': 40,
            'ENTER': 13,
            'SPACE': 32,
            'PAGEUP': 33,
            'PAGEDOWN': 34,
            'HOME': 36,
            'END': 35,
        };

        let $activeDate;

        if (keyCode === keyCodes.ESC) {
            keyEvent.stopPropagation();
            this.closeCalendar();
        } else if (keyCode === keyCodes.TAB && keyEvent.shiftKey) {
            keyEvent.preventDefault();

            if ($target.hasClass('ui-datepicker-close')) {
                $container.find('.ui-datepicker-prev').trigger('focus');
            } else if ($target.hasClass('ui-state-default')) {
                $container.find('.ui-datepicker-close').trigger('focus');
            } else if ($target.hasClass('ui-datepicker-prev')) {
                $container.find('.ui-datepicker-next').trigger('focus');
            } else if ($target.hasClass('ui-datepicker-next')) {
                // Check if a chosen date or today exists in month
                if ($container.find('.ui-state-highlight').length) {
                    $activeDate = $container.find('.ui-state-highlight')
                } else if ($container.find('.ui-state-active').length) {
                    $activeDate = $container.find('.ui-state-active');
                }

                if ($activeDate.length) {
                    $activeDate.trigger('focus');
                }
            }
        } else if (keyCode === keyCodes.TAB) {
            keyEvent.preventDefault();

            if ($target.hasClass('ui-datepicker-close')) {
                // Check if a chosen date or today exists in month
                if ($container.find('.ui-state-highlight').length) {
                    $activeDate = $container.find('.ui-state-highlight')
                } else if ($container.find('.ui-state-active').length) {
                    $activeDate = $container.find('.ui-state-active');
                }
                if ($activeDate.length) {
                    $activeDate.trigger('focus');
                }
            } else if ($target.hasClass('ui-state-default')) {
                $container.find('.ui-datepicker-next').trigger('focus');
            } else if ($target.hasClass('ui-datepicker-next')) {
                $container.find('.ui-datepicker-prev').trigger('focus');
            } else if ($target.hasClass('ui-datepicker-prev')) {
                $container.find('.ui-datepicker-close').trigger('focus');
            }
        } else if (keyCode === keyCodes.LEFT) {
            if ($target.is('a.ui-state-default')) {
                keyEvent.preventDefault();
                this.navigationManager.goToPreviousDay($target, this.$datePickerContainer);
            }
        } else if (keyCode === keyCodes.RIGHT) {
            if ($target.is('a.ui-state-default')) {
                keyEvent.preventDefault();
                this.navigationManager.goToNextDay($target, this.$datePickerContainer);
            }
        } else if (keyCode === keyCodes.UP) {
            if ($target.is('a.ui-state-default')) {
                keyEvent.preventDefault();
                this.navigationManager.goUp($target, $container);
            }
        } else if (keyCode === keyCodes.DOWN) {
            if ($target.is('a.ui-state-default')) {
                keyEvent.preventDefault();
                this.navigationManager.goDown($target, $container);
            }
        } else if (keyCode === keyCodes.ENTER) {
            if ($target.hasClass('ui-state-default')) {
                // Need to allow for selection of the date and then cal close
                setTimeout(() => {
                    this.closeCalendar();
                }, 100);
            } else if ($target.hasClass('ui-datepicker-prev')) {
                this.handlePrevLinkClicks();
            } else if ($target.hasClass('ui-datepicker-next')) {
                this.handleNextLinkClicks();
            }
        } else if (keyCode === keyCodes.SPACE) {
            if ($target.hasClass('ui-datepicker-prev')) {
                keyEvent.preventDefault();
                $target.trigger('click');
            } else if ($target.hasClass('ui-datepicker-next')) {
                keyEvent.preventDefault();
                $target.trigger('click');
            } else if ($target.is('a.ui-state-default')) {
                keyEvent.preventDefault();
                $target.trigger('click');
                this.closeCalendar();
            }
        } else if (keyCode === keyCodes.PAGEUP) {
            if ($target.is('a.ui-state-default')) {
                keyEvent.preventDefault();
                this.navigationManager.navigateOneMonth($target, 'prev', this.$datePickerContainer, this.$nextLink, this.$prevLink);
            }
        } else if (keyCode === keyCodes.PAGEDOWN) {
            if ($target.is('a.ui-state-default')) {
                keyEvent.preventDefault();
                this.navigationManager.navigateOneMonth($target, 'next', this.$datePickerContainer, this.$nextLink, this.$prevLink);
            }
        } else if (keyCode === keyCodes.HOME) {
            if ($target.is('a.ui-state-default')) {
                keyEvent.preventDefault();

                const $firstOfMonth = $target.closest('tbody').find('.ui-state-default').first();
                if ($firstOfMonth) {
                    $firstOfMonth.trigger('focus');
                    this.highlightUtils.setHighlightState($firstOfMonth, $container);
                }
            }
        } else if (keyCode === keyCodes.END) {
            if ($target.is('a.ui-state-default')) {
                keyEvent.preventDefault();

                const $lastDay = $target.closest('tbody').find('.ui-state-default').last();
                if ($lastDay) {
                    $lastDay.trigger('focus');
                    this.highlightUtils.setHighlightState($lastDay, $container);
                }
            }
        }
    }

    /**
     * Handle calendar close
     */
    closeCalendar () {
        this.$html.find('#ui-datepicker-div').off('keydown');
        this.$dateInput.datepicker('hide');
        this.$dateInput.trigger('focus');
    }

    /**
     * Handle next month link click event
     * @param {Event} event
     */
    handleNextLinkClicks (event) {
        if (event !== undefined) {
            event.preventDefault();
        }

        // Update the header elements after change of month (as elements change)
        this.updateHeaderElements();
        // Highlight date in new month
        this.highlightUtils.prepHighlightState(this.$datePickerContainer);
        // Refocus the next button (otherwise focus returns to date input)
        this.$html.find('.ui-datepicker-next').trigger('focus');
        // Re-hide the today button (as elements change)
        this.$html.find('.ui-datepicker-current').addClass('u-display-none');
    }

    /**
     * Handle previous month link click event
     * @param {Event} event
     */
    handlePrevLinkClicks (event) {
        if (event !== undefined) {
            event.preventDefault();
        }

        // Update the header elements after change of month (as elements change)
        this.updateHeaderElements();
        // Highlight date in new month
        this.highlightUtils.prepHighlightState(this.$datePickerContainer);
        // Refocus the prev button (otherwise focus returns to date input)
        this.$html.find('.ui-datepicker-prev').trigger('focus');
        // Re-hide the today button (as elements change)
        this.$html.find('.ui-datepicker-current').addClass('u-display-none');
    }

    /**
     * Update calendar header elements after month change
     */
    updateHeaderElements () {
        // Re-get the next/prev buttons as they change when the month changes
        this.$prevLink = this.$datePickerContainer.find('.ui-datepicker-prev');
        this.$nextLink = this.$datePickerContainer.find('.ui-datepicker-next');

        // Make them focusable
        this.$nextLink.attr('href', '#');
        this.$prevLink.attr('href', '#');

        // Make the next/prev links buttons and remove unneeded title
        this.$nextLink.attr('role', 'button');
        this.$prevLink.attr('role', 'button');
        this.$nextLink.removeAttr('title');
        this.$prevLink.removeAttr('title');

        // Append accessible hidden text to prev/next links
        this.accessibleLabelUtils.addControlLabels(this.$nextLink, this.$html);
        this.accessibleLabelUtils.addControlLabels(this.$prevLink, this.$html);

        // Bind click handlers again as the element have changed
        this.$nextLink.on('click', this.handleNextLinkClicks.bind(this));
        this.$prevLink.on('click', this.handlePrevLinkClicks.bind(this));

        // Add accessible date labels to individual dates
        this.accessibleLabelUtils.addDateLabels(this.$datePickerContainer);
    }
}

module.exports = DatePicker;
