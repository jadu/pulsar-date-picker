import DatePickerUtils from '../../src/js/DatePickerUtils';
import DatePickerHighlightUtils from '../../src/js/DatePickerHighlightUtils';
import DatePickerNavigationManager from '../../src/js/DatePickerNavigationManager';
import DatePickerAccessibleLabelsUtils from '../../src/js/DatePickerAccessibleLabelsUtils';
import DatePicker from '../../src/js/DatePicker';

describe('DatePicker', () => {
    let utils;
    let highlightUtils;
    let navigationManager;
    let accessibleLabelsUtils;
    let datePicker;
    let $container;
    let $prevLink;
    let $nextLink;
    let $currentDate;
    let $newMonth;
    let $body = $('body');
    let $page;
    let $formGroup1;
    let clickEvent = $.Event('click');
    let nextMonthClickEvent = $.Event('click');
    let prevMonthClickEvent = $.Event('click');
    let keyUpEvent = $.Event('keyup');
    let keyDownEventMisc = $.Event('keydown');
    let keyDownEventEsc = $.Event('keydown');
    let keyDownEventShiftTab = $.Event('keydown');
    let keyDownEventTab = $.Event('keydown');
    let keyDownEventLeft = $.Event('keydown');
    let keyDownEventRight = $.Event('keydown');
    let keyDownEventUp = $.Event('keydown');
    let keyDownEventDown = $.Event('keydown');
    let keyDownEventSpace = $.Event('keydown');
    let keyDownEventSpaceDate = $.Event('keydown');
    let keyDownEventPageUp = $.Event('keydown');
    let keyDownEventPageDown = $.Event('keydown');
    let keyDownEventHome = $.Event('keydown');
    let keyDownEventEnd = $.Event('keydown');

    beforeEach(() => {
        utils = new DatePickerUtils();
        highlightUtils = new DatePickerHighlightUtils(utils);
        navigationManager = new DatePickerNavigationManager(utils, highlightUtils);
        accessibleLabelsUtils = new DatePickerAccessibleLabelsUtils(utils);
        datePicker = new DatePicker(utils, highlightUtils, accessibleLabelsUtils, navigationManager);

        $page = $(`
            <a class="skip-link">skip</a>
            <div class="container">
                <div class="form__group" id="formGroup1">
                    <label for="guid-514261410" class="control__label">Date field with date picker</label>
                    <div class="controls">
                        <div class="input-group has-btn-appended">
                            <input data-pulsar-datepicker="true" data-pulsar-datepicker-trigger="trigger-button-1" id="guid-514261410" data-pulsar-datepicker-format="default" type="text" class="form__control">
                            <span class="input-group-btn">
                                <button id="trigger-button-1" type="button" class="btn">
                                    <i class="icon-calendar">
                                        <span class="hide">Show calendar</span>
                                    </i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer"></div>
        `).appendTo($body);

        $container = $(`
            <div id="ui-datepicker-div">
                <a class="ui-datepicker-prev" title="previous"><span class="ui-icon"></span></a>
                <a class="ui-datepicker-next" title="next"><span class="ui-icon"></span></a>
                <div class="ui-datepicker-title">
                    <span class="ui-datepicker-month">April</span>
                    <span class="ui-datepicker-year">2020</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th><span title="Wednesday">We</span></th>
                            <th><span title="Thursday">Th</span></th>
                            <th><span title="Friday">Fr</span></th>
                            <th><span title="Saturday">Sa</span></th>
                            <th><span title="Sunday">Su</span></th>
                            <th><span title="Monday">Mo</span></th>
                            <th><span title="Tuesday">Tu</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="first-row">
                            <td><a class="ui-state-default" href="#">1</a></td>
                            <td><a class="ui-state-default qa-selected" href="#">2</a></td>
                            <td><a class="ui-state-default" href="#">3</a></td>
                            <td><a class="ui-state-default" href="#">4</a></td>
                            <td><a class="ui-state-default" href="#">5</a></td>
                            <td><a class="ui-state-default" href="#">6</a></td>
                            <td><a class="ui-state-default" href="#">7</a></td>
                        </tr>
                        <tr class="second-row">
                            <td><a class="ui-state-default" href="#">8</a></td>
                            <td><a class="ui-state-default" href="#">9</a></td>
                            <td><a class="ui-state-default" href="#">10</a></td>
                            <td><a class="ui-state-default" href="#">11</a></td>
                            <td><a class="ui-state-default" href="#">12</a></td>
                            <td><a class="ui-state-default" href="#">13</a></td>
                            <td><a class="ui-state-default" href="#">14</a></td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" class="ui-datepicker-current">Today</button>
                <button type="button" class="ui-datepicker-close">Close</button>
            </div>
        `).appendTo($body);

        $newMonth = $(`
            <a class="ui-datepicker-prev" title="previous"><span class="ui-icon"></span></a>
            <a class="ui-datepicker-next" title="next"><span class="ui-icon"></span></a>
            <div class="ui-datepicker-title">
                <span class="ui-datepicker-month">May</span>
                <span class="ui-datepicker-year">2020</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th><span title="Friday">Fr</span></th>
                        <th><span title="Saturday">Sa</span></th>
                        <th><span title="Sunday">Su</span></th>
                        <th><span title="Monday">Mo</span></th>
                        <th><span title="Tuesday">Tu</span></th>
                        <th><span title="Wednesday">we</span></th>
                        <th><span title="Thursday">Th</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><a class="ui-state-default" href="#">1</a></td>
                        <td><a class="ui-state-default" href="#">2</a></td>
                        <td><a class="ui-state-default" href="#">3</a></td>
                        <td><a class="ui-state-default" href="#">4</a></td>
                        <td><a class="ui-state-default" href="#">5</a></td>
                        <td><a class="ui-state-default" href="#">6</a></td>
                        <td><a class="ui-state-default" href="#">7</a></td>
                    </tr>
                </tbody>
            </table>
            <button type="button" class="ui-datepicker-current">Today</button>
            <button type="button" class="ui-datepicker-close">Close</button>
        `);

        $prevLink = $container.find('.ui-datepicker-prev');
        $nextLink = $container.find('.ui-datepicker-next');
        $formGroup1 = $page.find('#formGroup1');

        $.fn.datepicker = sinon.stub();
    });

    afterEach(() => {
        delete $.fn.datepicker;
        $page.remove();
        $container.remove();
    });

    describe('init()', () => {
        it('should initialise date pickers', () => {
            datePicker.init($body);

            expect($.fn.datepicker).to.have.been.called;
        })

        it('should initialise date pickers, with the correct close text option', () => {
            datePicker.init($body);

            expect($.fn.datepicker.args[0][0].closeText).to.equal('Close');
        });

        it('should initialise date pickers, with the correct dayNamesShort option', () => {
            datePicker.init($body);

            expect($.fn.datepicker.args[0][0].dayNamesShort).to.deep.equal([
                "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
            ]);
        });

        it('should initialise date pickers, with the correct date format option', () => {
            datePicker.init($body);

            expect($.fn.datepicker.args[0][0].dateFormat).to.equal('dd/mm/yy');
        });

        it('should initialise date pickers, with the correct date format option when the US format is used', () => {
            $body.find('.form__control').attr('data-pulsar-datepicker-format', 'us');

            datePicker.init($body);

            expect($.fn.datepicker.args[0][0].dateFormat).to.equal('mm/dd/yy');
        });

        it('should initialise date pickers, with the correct date format option when the reverse format is used', () => {
            $body.find('.form__control').attr('data-pulsar-datepicker-format', 'reverse');

            datePicker.init($body);

            expect($.fn.datepicker.args[0][0].dateFormat).to.equal('yy/mm/dd');
        });

        it('should initialise date pickers, with the correct onClose option', () => {
            datePicker.init($body);

            expect(typeof $.fn.datepicker.args[0][0].onClose).to.equal('function');
        });

        it('should initialise date pickers, with the correct date showAnim option', () => {
            datePicker.init($body);

            expect($.fn.datepicker.args[0][0].showAnim).to.equal('');
        });

        it('should initialise date pickers, with the correct date showButtonPanel option', () => {
            datePicker.init($body);

            expect($.fn.datepicker.args[0][0].showButtonPanel).to.be.true;
        });

        it('should initialise date pickers, with the correct date showOn option', () => {
            datePicker.init($body);

            expect($.fn.datepicker.args[0][0].showOn).to.equal('button');
        });

        it('should initialise date pickers, with the correct beforeShow option', () => {
            datePicker.init($body);

            expect(typeof $.fn.datepicker.args[0][0].beforeShow).to.equal('function');
        });

        it('should initialise date pickers, with an empty altField option, when an altField is not present', () => {
            datePicker.init($body);

            expect($.fn.datepicker.args[0][0].altField).to.equal('');
        });

        it('should initialise date pickers, with the correct altField option, when an altField is present', () => {
            $('<input type="text" id="example-alt-field" />').insertAfter($body.find('.form__control'))
            $body.find('.form__control').attr('data-pulsar-datepicker-altfield', 'example-alt-field');

            datePicker.init($body);

            expect($.fn.datepicker.args[0][0].altField).to.equal('#example-alt-field');
        });

        it('should initialise date pickers, with an empty altFormat option, when an altFormat is not present', () => {
            datePicker.init($body);

            expect($.fn.datepicker.args[0][0].altFormat).to.equal('');
        });

        it('should initialise date pickers, with the correct altFormat option, when an altFormat is present', () => {
            $body.find('.form__control').attr('data-pulsar-datepicker-altformat', 'yy-mm-dd');

            datePicker.init($body);

            expect($.fn.datepicker.args[0][0].altFormat).to.equal('yy-mm-dd');
        });

        it('should add a placeholder to the date input based on the date format', () => {
            datePicker.init($body);

            expect($formGroup1.find('[data-pulsar-datepicker="true"]').attr('placeholder')).to.equal('dd/mm/yyyy');
        });

        it('should turn autocomplete off on the date input', () => {
            datePicker.init($body);

            expect($formGroup1.find('[data-pulsar-datepicker="true"]').attr('autocomplete')).to.equal('off');
        });
    });

    describe('When the date picker trigger button is clicked', () => {
        beforeEach(() => {
            datePicker.init($body);
            keyDownEventMisc.keyCode = 37;
        });

        it('should prevent default', () => {
            $formGroup1.find('#trigger-button-1').trigger(clickEvent);

            expect(clickEvent.isDefaultPrevented()).to.be.true;
        });

        it('should show the date picker when the trigger button is clicked', () => {
            $formGroup1.find('#trigger-button-1').trigger(clickEvent);

            expect($.fn.datepicker).to.have.been.calledWith('show');
        });

        it('should add aria-hidden to the main page structure', () => {
            $formGroup1.find('#trigger-button-1').trigger(clickEvent);

            expect($body.find('.container').attr('aria-hidden')).to.equal('true');
            expect($body.find('.skip-link').attr('aria-hidden')).to.equal('true');
            expect($body.find('.footer').attr('aria-hidden')).to.equal('true');
        });

        it('should hide the datepicker today button', () => {
            $formGroup1.find('#trigger-button-1').trigger(clickEvent);

            expect($body.find('.ui-datepicker-current').hasClass('u-display-none')).to.be.true;
        });

        it('should focus todays date if viewing current month', () => {
            $container.find('.ui-state-default').first().parent().addClass('ui-datepicker-today');

            $formGroup1.find('#trigger-button-1').trigger(clickEvent);

            expect($container.find('.ui-state-default').first().is(':focus')).to.be.true;
        });

        it('should focus the chosen date if there is one', () => {
            $container.find('.ui-state-default').first().addClass('ui-state-active');

            $formGroup1.find('#trigger-button-1').trigger(clickEvent);

            expect($container.find('.ui-state-default').first().is(':focus')).to.be.true;
        });

        it('should add the appropriate aria role to the date picker', () => {
            $formGroup1.find('#trigger-button-1').trigger(clickEvent);

            expect($body.find('#ui-datepicker-div').attr('role')).to.equal('application');
        });

        it('should add an accessible label to the date picker', () => {
            $formGroup1.find('#trigger-button-1').trigger(clickEvent);

            expect($body.find('#ui-datepicker-div').attr('aria-label')).to.equal('Calendar view date-picker');
        });

        it('should make the previous and next buttons focusable', () => {
            $formGroup1.find('#trigger-button-1').trigger(clickEvent);

            expect($body.find('.ui-datepicker-prev').attr('href')).to.equal('#');
            expect($body.find('.ui-datepicker-next').attr('href')).to.equal('#');
        });

        it('should add role button to the prev/next links', () => {
            $formGroup1.find('#trigger-button-1').trigger(clickEvent);

            expect($body.find('.ui-datepicker-prev').attr('role')).to.equal('button');
            expect($body.find('.ui-datepicker-next').attr('role')).to.equal('button');
        });

        it('should remove the unneeded title attribute from the prev/next links', () => {
            $formGroup1.find('#trigger-button-1').trigger(clickEvent);

            expect($body.find('.ui-datepicker-prev').attr('title')).to.be.undefined;
            expect($body.find('.ui-datepicker-next').attr('title')).to.be.undefined;
        });

        it('should add accessible labels to the prev/next links', () => {
            $formGroup1.find('#trigger-button-1').trigger(clickEvent);

            expect($body.find('.ui-datepicker-prev .hide').text()).to.equal('Previous Month, March 2020');
            expect($body.find('.ui-datepicker-next .hide').text()).to.equal('Next Month, May 2020');
        });

        it('should maintain focus on the date field if typing a date', () => {
            $formGroup1.find('#trigger-button-1').trigger(clickEvent);
            
            $formGroup1.find('[data-pulsar-datepicker="true"]').trigger(keyUpEvent);

            expect($formGroup1.find('[data-pulsar-datepicker="true"]').is(':focus')).to.be.true;
        });
    });

    describe('When a key is pressed within the date picker', () => {
        beforeEach(() => {
            datePicker.init($body);
            $formGroup1.find('#trigger-button-1').trigger(clickEvent);
        });

        // Removing related code
        // it('should highlight the first date in the month if no date is highlighted', () => {
        //     keyDownEventMisc.keyCode = 0;

        //     $container.trigger(keyDownEventMisc);

        //     expect($body.find('.first-row .ui-state-default').first().hasClass('ui-state-highlight')).to.be.true;
        // });

        describe('on ESC', () => {
            beforeEach(() => {
                keyDownEventEsc.keyCode = 27;
                datePicker.closeCalendar = sinon.spy();
            });

            it('should close the date picker', () => {
                $container.trigger(keyDownEventEsc);

                expect(datePicker.closeCalendar).to.have.been.calledOnce;
            });

            it('should stop propagation', () => {
                $container.trigger(keyDownEventEsc);

                expect(keyDownEventEsc.isPropagationStopped()).to.be.true;
            });
        });

        describe('on SHIFT + TAB', () => {
            beforeEach(() => {
                keyDownEventShiftTab.keyCode = 9;
                keyDownEventShiftTab.shiftKey = true;
            });

            it('should prevent default', () => {
                $container.trigger(keyDownEventShiftTab);

                expect(keyDownEventShiftTab.isDefaultPrevented()).to.be.true;
            });

            it('should focus the previous month link if the close button was focussed', () => {
                keyDownEventShiftTab.target = $container.find('.ui-datepicker-close')[0];

                $container.find('.ui-datepicker-close').trigger(keyDownEventShiftTab);

                expect($container.find('.ui-datepicker-prev').is(':focus')).to.be.true;
            });

            it('should focus the close button if a date was focussed', () => {
                keyDownEventShiftTab.target = $container.find('.ui-state-default').first()[0];

                $container.find('.ui-state-default').first().trigger(keyDownEventShiftTab);

                expect($container.find('.ui-datepicker-close').is(':focus')).to.be.true;
            });

            it('should focus the next month link if the previous month button was focussed', () => {
                keyDownEventShiftTab.target = $container.find('.ui-datepicker-prev')[0];

                $container.find('.ui-datepicker-prev').trigger(keyDownEventShiftTab);

                expect($container.find('.ui-datepicker-next').is(':focus')).to.be.true;
            });

            it('should focus the highlighted date if the next link was focussed', () => {
                $container.find('a.ui-state-default').first().addClass('ui-state-highlight');

                keyDownEventShiftTab.target = $container.find('.ui-datepicker-next')[0];
                $container.find('.ui-datepicker-next').trigger(keyDownEventShiftTab);

                expect($container.find('.ui-state-highlight').is(':focus')).to.be.true;
            });

            it('should focus the active date if the next link was focussed', () => {
                $container.find('.ui-state-default').first().addClass('ui-state-active');

                keyDownEventShiftTab.target = $container.find('.ui-datepicker-next')[0];
                $container.find('.ui-datepicker-next').trigger(keyDownEventShiftTab);

                expect($container.find('.ui-state-active').is(':focus')).to.be.true;
            });
        });

        describe('on TAB', () => {
            beforeEach(() => {
                keyDownEventTab.keyCode = 9;
            });

            it('should prevent default', () => {
                $container.trigger(keyDownEventTab);

                expect(keyDownEventTab.isDefaultPrevented()).to.be.true;
            });

            it('should focus the highlighted date, if there is one, if the close button was focussed', () => {
                $container.find('a.ui-state-default').first().addClass('ui-state-highlight');
                keyDownEventTab.target = $container.find('.ui-datepicker-close')[0];

                $container.find('.ui-datepicker-close').trigger(keyDownEventTab);

                expect($container.find('.ui-state-highlight').is(':focus')).to.be.true;
            });

            it('should focus the active date, if there is one, if the close button was focussed', () => {
                $container.find('.ui-state-default').first().addClass('ui-state-active');
                keyDownEventTab.target = $container.find('.ui-datepicker-close')[0];

                $container.find('.ui-datepicker-close').trigger(keyDownEventTab);

                expect($container.find('.ui-state-active').is(':focus')).to.be.true;
            });

            it('should focus the next month link if a date was focussed', () => {
                keyDownEventTab.target = $container.find('.ui-state-default').first()[0];

                $container.find('.ui-state-default').first().trigger(keyDownEventTab);

                expect($container.find('.ui-datepicker-next').is(':focus')).to.be.true;
            });

            it('should focus the prev month link if the next month button was focussed', () => {
                keyDownEventTab.target = $container.find('.ui-datepicker-next')[0];

                $container.find('.ui-datepicker-next').trigger(keyDownEventTab);

                expect($container.find('.ui-datepicker-prev').is(':focus')).to.be.true;
            });

            it('should focus the close button, if the previous month button was focussed', () => {
                keyDownEventTab.target = $container.find('.ui-datepicker-prev')[0];

                $container.find('.ui-datepicker-prev').trigger(keyDownEventTab);

                expect($container.find('.ui-datepicker-close').is(':focus')).to.be.true;
            });
        });

        describe('on LEFT ARROW', () => {
            beforeEach(() => {
                keyDownEventLeft.keyCode = 37;
            });

            it('should prevent default, when a date was focussed', () => {
                keyDownEventLeft.target = $container.find('.ui-state-default').first()[0];

                $container.trigger(keyDownEventLeft);

                expect(keyDownEventLeft.isDefaultPrevented()).to.be.true;
            });

            it('should go to the previous date, if a date was focussed', () => {
                navigationManager.goToPreviousDay = sinon.spy();
                keyDownEventLeft.target = $container.find('.ui-state-default').first()[0];
                const $target = $(keyDownEventLeft.target);

                $container.trigger(keyDownEventLeft);

                expect(navigationManager.goToPreviousDay).to.have.been.calledOnce;
                expect(navigationManager.goToPreviousDay).to.have.been.calledWith($target, $body.find('#ui-datepicker-div'));
            });
        });

        describe('on RIGHT ARROW', () => {
            beforeEach(() => {
                keyDownEventRight.keyCode = 39;
            });

            it('should prevent default, if a date was focussed', () => {
                keyDownEventRight.target = $container.find('.ui-state-default').first()[0];

                $container.trigger(keyDownEventRight);

                expect(keyDownEventRight.isDefaultPrevented()).to.be.true;
            });


            it('should go to the next date, if a date was focussed', () => {
                navigationManager.goToNextDay = sinon.spy();
                keyDownEventRight.target = $container.find('.ui-state-default').first()[0];
                const $target = $(keyDownEventRight.target);

                $container.trigger(keyDownEventRight);

                expect(navigationManager.goToNextDay).to.have.been.calledOnce;
                expect(navigationManager.goToNextDay).to.have.been.calledWith($target, $body.find('#ui-datepicker-div'));
            });
        });

        describe('on UP', () => {
            beforeEach(() => {
                keyDownEventUp.keyCode = 38;
            });

            it('should prevent default, if a date was focussed', () => {
                keyDownEventUp.target = $container.find('.ui-state-default').first()[0];

                $container.trigger(keyDownEventUp);

                expect(keyDownEventUp.isDefaultPrevented()).to.be.true;
            });

            it('should go to the date directly above, if a date was focussed', () => {
                navigationManager.goUp = sinon.spy();
                keyDownEventUp.target = $container.find('.ui-state-default').first()[0];
                const $target = $(keyDownEventUp.target);

                $container.trigger(keyDownEventUp);

                expect(navigationManager.goUp).to.have.been.calledOnce;
                expect(navigationManager.goUp).to.have.been.calledWith($target, $body.find('#ui-datepicker-div'));
            });
        });

        describe('on DOWN', () => {
            beforeEach(() => {
                keyDownEventDown.keyCode = 40;
            });

            it('should prevent default, if a date was focussed', () => {
                keyDownEventDown.target = $container.find('.ui-state-default').first()[0];
                $container.trigger(keyDownEventDown);

                expect(keyDownEventDown.isDefaultPrevented()).to.be.true;
            });

            it('should go to the date directly below, if a date was focussed', () => {
                navigationManager.goDown = sinon.spy();
                keyDownEventDown.target = $container.find('.ui-state-default').first()[0];
                const $target = $(keyDownEventDown.target);

                $container.trigger(keyDownEventDown);

                expect(navigationManager.goDown).to.have.been.calledOnce;
                expect(navigationManager.goDown).to.have.been.calledWith(
                    sinon.match.jQuery($target),
                    sinon.match.jQuery($body.find('#ui-datepicker-div'))
                );
            });
        });

        // Issue with setTimeout
        // describe('on ENTER', () => {
        //     it('should close the picker, if a date was focussed');

        //     it('should go to the previous month, if the previous month link was focussed');

        //     it('should go to the next month, if the next month link was focussed');
        // });

        describe('on SPACE', () => {
            beforeEach(() => {
                keyDownEventSpace.keyCode = 32;
            });

            it('should prevent default, if the previous month link was focussed', () => {
                keyDownEventSpace.target = $container.find('.ui-datepicker-prev')[0];

                $container.trigger(keyDownEventSpace);

                expect(keyDownEventSpace.isDefaultPrevented()).to.be.true;
            });

            it('should prevent default, if the next month link was focussed', () => {
                keyDownEventSpace.target = $container.find('.ui-datepicker-next')[0];

                $container.trigger(keyDownEventSpace);

                expect(keyDownEventSpace.isDefaultPrevented()).to.be.true;
            });

            it('should prevent default, if a date link was focussed', () => {
                keyDownEventSpace.target = $container.find('a.ui-state-default').first()[0];

                $container.trigger(keyDownEventSpace);

                expect(keyDownEventSpace.isDefaultPrevented()).to.be.true;
            });

            it('should go to the previous month, if the previous month link was focussed', () => {
                keyDownEventSpace.target = $container.find('.ui-datepicker-prev').first()[0];
                const clickSpy = sinon.spy();
                $prevLink.on('click', clickSpy);

                $container.trigger(keyDownEventSpace);

                expect(clickSpy).to.have.been.calledOnce;
            });

            it('should go to the next month, if the next month link was focussed', () => {
                keyDownEventSpace.target = $container.find('.ui-datepicker-next').first()[0];
                const clickSpy = sinon.spy();
                $nextLink.on('click', clickSpy);

                $container.trigger(keyDownEventSpace);

                expect(clickSpy).to.have.been.calledOnce;
            });

            it('should click the date, if a date was focussed', () => {
                keyDownEventSpace.target = $container.find('a.ui-state-default').first()[0];
                const clickSpy = sinon.spy();
                $container.find('a.ui-state-default').first().on('click', clickSpy);

                $container.trigger(keyDownEventSpace);

                expect(clickSpy).to.have.been.calledOnce;
            });

            it('should close the date picker, if a date was focussed', () => {
                keyDownEventSpace.target = $container.find('a.ui-state-default').first()[0];
                datePicker.closeCalendar = sinon.spy();

                $container.trigger(keyDownEventSpace);

                expect(datePicker.closeCalendar).to.have.been.calledOnce;
            });
        });

        describe('on PAGEUP', () => {
            beforeEach(() => {
                keyDownEventPageUp.keyCode = 33;
            });

            it('should prevent default, if a date was focussed', () => {
                keyDownEventPageUp.target = $container.find('.ui-state-default').first()[0];
                $container.trigger(keyDownEventPageUp);

                expect(keyDownEventPageUp.isDefaultPrevented()).to.be.true;
            });

            it('should go to the previous month, if a date was focussed', () => {
                navigationManager.navigateOneMonth = sinon.spy();
                keyDownEventPageUp.target = $container.find('a.ui-state-default').first()[0];
                const $target = $(keyDownEventPageUp.target);

                $container.trigger(keyDownEventPageUp);

                expect(navigationManager.navigateOneMonth).to.have.been.calledOnce;
                expect(navigationManager.navigateOneMonth).to.have.been.calledWith(
                    sinon.match.jQuery($target),
                    'prev',
                    sinon.match.jQuery($container),
                    sinon.match.jQuery($nextLink),
                    sinon.match.jQuery($prevLink)
                );
            });
        });

        describe('on PAGEDOWN', () => {
            beforeEach(() => {
                keyDownEventPageDown.keyCode = 34;
            });

            it('should prevent default, if a date was focussed', () => {
                keyDownEventPageDown.target = $container.find('.ui-state-default').first()[0];
                $container.trigger(keyDownEventPageDown);

                expect(keyDownEventPageDown.isDefaultPrevented()).to.be.true;
            });

            it('should go to the next month, if a date was focussed', () => {
                navigationManager.navigateOneMonth = sinon.spy();
                keyDownEventPageDown.target = $container.find('.ui-state-default').first()[0];
                const $target = $(keyDownEventPageDown.target);

                $container.trigger(keyDownEventPageDown);

                expect(navigationManager.navigateOneMonth).to.have.been.calledOnce;
                expect(navigationManager.navigateOneMonth).to.have.been.calledWith(
                    sinon.match.jQuery($target),
                    'next',
                    sinon.match.jQuery($container),
                    sinon.match.jQuery($nextLink),
                    sinon.match.jQuery($prevLink)
                );
            });
        });

        describe('on HOME', () => {
            beforeEach(() => {
                keyDownEventHome.keyCode = 36;
                highlightUtils.setHighlightState = sinon.spy();
                keyDownEventHome.target = $container.find('.ui-state-default').first()[0];
                $container.trigger(keyDownEventHome);
            });

            it('should prevent default, if a date was focussed', () => {
                expect(keyDownEventHome.isDefaultPrevented()).to.be.true;
            });

            it('should focus the first of the month', () => {
                expect($container.find('.ui-state-default').first().is(':focus')).to.be.true;
            });

            it('should highlight the first date in the month, if a date was focussed', () => {
                expect(highlightUtils.setHighlightState).to.have.been.calledOnce;
                expect(highlightUtils.setHighlightState).to.have.been.calledWith(
                    sinon.match.jQuery($container.find('.ui-state-default').first()),
                    sinon.match.jQuery($body.find('#ui-datepicker-div'))
                );
            });
        });

        describe('on END', () => {
            beforeEach(() => {
                keyDownEventEnd.keyCode = 35;
                highlightUtils.setHighlightState = sinon.spy();
                keyDownEventEnd.target = $container.find('.ui-state-default').first()[0];
                $container.trigger(keyDownEventEnd);
            });

            it('should prevent default, if a date was focussed', () => {
                expect(keyDownEventEnd.isDefaultPrevented()).to.be.true;
            });

            it('should focus the last of the month', () => {
                expect($container.find('.ui-state-default').last().is(':focus')).to.be.true;
            });

            it('should highlight the last date in the month, if a date was focussed', () => {
                expect(highlightUtils.setHighlightState).to.have.been.calledOnce;
                expect(highlightUtils.setHighlightState).to.have.been.calledWith(
                    sinon.match.jQuery($container.find('.ui-state-default').last()),
                    sinon.match.jQuery($body.find('#ui-datepicker-div'))
                );
            });
        });
    });

    describe('When the calendar is closed', () => {
        beforeEach(() => {
            datePicker.init($body);
            $formGroup1.find('#trigger-button-1').trigger(clickEvent);

            datePicker.closeCalendar();
        });

        it('should close the date picker', () => {
            expect($.fn.datepicker).to.have.been.calledWith('hide');
        });
    });

    describe('When the next month link is clicked', () => {
        beforeEach(() => {
            const changeMonth = () => {
                $body.find('#ui-datepicker-div').empty();
                $body.find('#ui-datepicker-div').append($newMonth);
            };
            $nextLink.on('click', changeMonth);

            datePicker.init($body);
            $formGroup1.find('#trigger-button-1').trigger(clickEvent);

            datePicker.updateHeaderElements = sinon.spy();
            highlightUtils.prepHighlightState = sinon.spy();

            $nextLink.trigger(nextMonthClickEvent);
        });

        it('should prevent default if an event is passed', () => {
            expect(nextMonthClickEvent.isDefaultPrevented()).to.be.true;
        });

        it('should update the header elements', () => {
            expect(datePicker.updateHeaderElements).to.have.been.calledOnce;
        });

        it('should highlight the date in the new month', () => {
            expect(highlightUtils.prepHighlightState).to.have.been.calledOnce;
            expect(highlightUtils.prepHighlightState).to.have.been.calledWith($body.find('#ui-datepicker-div'));
        });

        it('should hide the today button', () => {
            expect($body.find('.ui-datepicker-current').hasClass('u-display-none')).to.be.true;
        });
    });

    describe('When the previous month link is clicked', () => {
        beforeEach(() => {
            const changeMonth = () => {
                $body.find('#ui-datepicker-div').empty();
                $body.find('#ui-datepicker-div').append($newMonth);
            };
            $body.find('.ui-datepicker-prev').on('click', changeMonth);
            datePicker.init($body);
            $formGroup1.find('#trigger-button-1').trigger(clickEvent);
            datePicker.updateHeaderElements = sinon.spy();
            highlightUtils.prepHighlightState = sinon.spy();
            $body.find('.ui-datepicker-prev').trigger(prevMonthClickEvent);
        });

        it('should prevent default if an event is passed', () => {
            expect(prevMonthClickEvent.isDefaultPrevented()).to.be.true;
        });

        it('should update the header elements', () => {
            expect(datePicker.updateHeaderElements).to.have.been.calledOnce;
        });

        it('should highlight the date in the new month', () => {
            expect(highlightUtils.prepHighlightState).to.have.been.calledOnce;
            expect(highlightUtils.prepHighlightState).to.have.been.calledWith($body.find('#ui-datepicker-div'));
        });

        it('should hide the today button', () => {
            expect($body.find('.ui-datepicker-current').hasClass('u-display-none')).to.be.true;
        });
    });
});
