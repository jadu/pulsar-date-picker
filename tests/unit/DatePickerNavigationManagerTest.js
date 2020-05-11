import DatePickerUtils from '../../src/js/DatePickerUtils';
import DatePickerHighlightUtils from '../../src/js/DatePickerHighlightUtils';
import DatePickerNavigationManager from '../../src/js/DatePickerNavigationManager';

describe('DatePickerNavigationManagerUtils', () => {
    let utils;
    let highlightUtils;
    let navigationManager;
    let $container;
    let $prevLink;
    let $nextLink;
    let $currentDate;
    let $newMonth;
    let $body = $('body');

    beforeEach(() => {
        utils = new DatePickerUtils();
        highlightUtils = new DatePickerHighlightUtils(utils);
        navigationManager = new DatePickerNavigationManager(utils, highlightUtils);

        $container = $(`
            <div id="datepicker-wrapper">
                <a class="ui-datepicker-prev">
                    <span class="ui-icon"></span>
                </a>
                <a class="ui-datepicker-next">
                    <span class="ui-icon"></span>
                </a>
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
            </div>
        `).appendTo($body);

        $newMonth = $(`
            <a class="ui-datepicker-prev">
                <span class="ui-icon"></span>
            </a>
            <a class="ui-datepicker-next">
                <span class="ui-icon"></span>
            </a>
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
        `);
        $prevLink = $container.find('.ui-datepicker-prev');
        $nextLink = $container.find('.ui-datepicker-next');
    });

    afterEach(() => {
        $container.remove();
    });

    describe('navigateOneMonth()', () => {
        it('should click the prev month link if the direction is not next', () => {
            const clickSpy = sinon.spy();
            $prevLink.on('click', clickSpy);
            $currentDate = $container.find('.ui-state-default').first();

            navigationManager.navigateOneMonth($currentDate, 'prev', $container, $nextLink, $prevLink);

            expect(clickSpy).to.have.been.calledOnce;
        });

        it('should click the next month link if the direction is next', () => {
            const clickSpy = sinon.spy();
            $nextLink.on('click', clickSpy);
            $currentDate = $container.find('.ui-state-default').first();

            navigationManager.navigateOneMonth($currentDate, 'next', $container, $nextLink, $prevLink);

            expect(clickSpy).to.have.been.calledOnce;
        });

        it('should highlight and focus the same date as the previously selected month in the new month', () => {
            const changeMonth = () => {
                $container.empty();
                $container.append($newMonth);
            };
            $nextLink.on('click', changeMonth);
            $currentDate = $container.find('.ui-state-default').first();

            navigationManager.navigateOneMonth($currentDate, 'next', $container, $nextLink, $prevLink);

            expect($container.find('.ui-state-highlight').length).to.equal(1);
            expect($container.find('.ui-state-default').first().hasClass('ui-state-highlight')).to.be.true;
            expect($container.find('.ui-state-highlight').is(':focus')).to.be.true;
        });
    });

    describe('goToPreviousDay()', () => {
        it('should highlight and focus the previous day, when the previous day is in the same week', () => {
            $currentDate = $container.find('.qa-selected');

            navigationManager.goToPreviousDay($currentDate, $container);

            expect($container.find('.ui-state-default').first().hasClass('ui-state-highlight')).to.be.true;
            expect($container.find('.ui-state-default').first().is(':focus')).to.be.true;
        });

        it('should highlight and focus the previous day in the previous week, when the previous day is in the previous week', () => {
            navigationManager.goToPreviousDayInPreviousWeek = sinon.spy();
            $currentDate = $container.find('.second-row a').first();

            navigationManager.goToPreviousDay($currentDate, $container);

            expect(navigationManager.goToPreviousDayInPreviousWeek).to.have.been.calledOnce;
        });
    });

    describe('goToPreviousDayInPreviousWeek()', () => {
        it('should highlight and focus the previous day in the previous week, when the previous day is in the previous week', () => {
            $currentDate = $container.find('.second-row a').first();

            navigationManager.goToPreviousDay($currentDate, $container);

            expect($container.find('.first-row a').last().hasClass('ui-state-highlight')).to.be.true;
            expect($container.find('.first-row a').last().is(':focus')).to.be.true;
        });

        it('should highlight and focus the previous day in the previous month, when the previous day is in the previous month', () => {
            navigationManager.goToPreviousMonth = sinon.spy();
            $currentDate = $container.find('.first-row a').first();

            navigationManager.goToPreviousDayInPreviousWeek($currentDate, $container);

            expect(navigationManager.goToPreviousMonth).to.have.been.calledOnce;
        });
    });

    describe('goToPreviousMonth()', () => {
        it('should click the previous month control link', () => {
            const clickSpy = sinon.spy();
            $prevLink.on('click', clickSpy);

            navigationManager.goToPreviousMonth($container);

            expect(clickSpy).to.have.been.calledOnce;
        });

        it('should highlight and focus the last day of the previous month', () => {
            const changeMonth = () => {
                $container.empty();
                $container.append($newMonth);
            };
            $prevLink.on('click', changeMonth);

            navigationManager.goToPreviousMonth($container);

            expect($container.find('.ui-state-default').last().hasClass('ui-state-highlight')).to.be.true;
            expect($container.find('.ui-state-default').last().is(':focus')).to.be.true;
        });
    });

    describe('goToNextDay()', () => {
        it('should highlight and focus the next day, when the next day is in the same week', () => {
            $currentDate = $container.find('.ui-state-default').first();

            navigationManager.goToNextDay($currentDate, $container);

            expect($container.find('.qa-selected').hasClass('ui-state-highlight')).to.be.true;
            expect($container.find('.qa-selected').is(':focus')).to.be.true;
        });

        it('should highlight and focus the next day in the next week, when the next day is in the next week', () => {
            navigationManager.goToNextDayInNextWeek = sinon.spy();
            $currentDate = $container.find('.first-row a').last();

            navigationManager.goToNextDay($currentDate, $container);

            expect(navigationManager.goToNextDayInNextWeek).to.have.been.calledOnce;
        });
    });

    describe('goToNextDayInNextWeek()', () => {
        it('should highlight and focus the next day in the next week, when the next day is in the next week', () => {
            $currentDate = $container.find('.first-row a').last();

            navigationManager.goToNextDayInNextWeek($currentDate, $container);

            expect($container.find('.second-row a').first().hasClass('ui-state-highlight')).to.be.true;
            expect($container.find('.second-row a').first().is(':focus')).to.be.true;
        });

        it('should highlight and focus the next day in the next month, when the next day is in the next month', () => {
            navigationManager.goToNextMonth = sinon.spy();
            $currentDate = $container.find('.second-row a').last();

            navigationManager.goToNextDayInNextWeek($currentDate, $container);

            expect(navigationManager.goToNextMonth).to.have.been.calledOnce;
        });
    });

    describe('goToNextMonth()', () => {
        it('should click the next month control link', () => {
            const clickSpy = sinon.spy();
            $nextLink.on('click', clickSpy);

            navigationManager.goToNextMonth($container);

            expect(clickSpy).to.have.been.calledOnce;
        });

        it('should highlight and focus the first day of the next month', () => {
            const changeMonth = () => {
                $container.empty();
                $container.append($newMonth);
            };
            $nextLink.on('click', changeMonth);

            navigationManager.goToNextMonth($container);

            expect($container.find('.ui-state-default').first().hasClass('ui-state-highlight')).to.be.true;
            expect($container.find('.ui-state-default').first().is(':focus')).to.be.true;
        });
    });

    describe('goUp()', () => {
        it('should highlight and focus the date immediately above, when the above date is in the same month', () => {
            $currentDate = $container.find('.second-row a').first();

            navigationManager.goUp($currentDate, $container);

            expect($container.find('.first-row a').first().hasClass('ui-state-highlight')).to.be.true;
            expect($container.find('.first-row a').first().is(':focus')).to.be.true;
        });

        it('should click the previous month link when the date is in the previous month', () => {
            const clickSpy = sinon.spy();
            $prevLink.on('click', clickSpy);
            $currentDate = $container.find('.first-row a').first();

            navigationManager.goUp($currentDate, $container);

            expect(clickSpy).to.have.been.calledOnce;
        });

        it('should highlight and focus the corresponding date in the previous month', () => {
            const changeMonth = () => {
                $container.empty();
                $container.append($newMonth);
            };
            $prevLink.on('click', changeMonth);
            $currentDate = $container.find('.first-row a').first();

            navigationManager.goUp($currentDate, $container);

            expect($container.find('.ui-state-default').first().hasClass('ui-state-highlight')).to.be.true;
            expect($container.find('.ui-state-default').first().is(':focus')).to.be.true;
        });
    });

    describe('goDown()', () => {
        it('should highlight and focus the date immediately below, when the below date is in the same month', () => {
            $currentDate = $container.find('.first-row a').first();

            navigationManager.goDown($currentDate, $container);

            expect($container.find('.second-row a').first().hasClass('ui-state-highlight')).to.be.true;
            expect($container.find('.second-row a').first().is(':focus')).to.be.true;
        });

        it('should click the next month link when the date is in the next month', () => {
            const clickSpy = sinon.spy();
            $nextLink.on('click', clickSpy);
            $currentDate = $container.find('.second-row a').first();

            navigationManager.goDown($currentDate, $container);

            expect(clickSpy).to.have.been.calledOnce;
        });

        it('should highlight and focus the corresponding date in the next month', () => {
            const changeMonth = () => {
                $container.empty();
                $container.append($newMonth);
            };
            $nextLink.on('click', changeMonth);
            $currentDate = $container.find('.second-row a').first();

            navigationManager.goDown($currentDate, $container);

            expect($container.find('.ui-state-default').first().hasClass('ui-state-highlight')).to.be.true;
            expect($container.find('.ui-state-default').first().is(':focus')).to.be.true;
        });
    });
});
