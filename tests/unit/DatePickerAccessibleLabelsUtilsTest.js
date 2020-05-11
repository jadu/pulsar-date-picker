import DatePickerUtils from '../../src/js/DatePickerUtils';
import DatePickerAccessibleLabelsUtils from '../../src/js/DatePickerAccessibleLabelsUtils';

describe('DatePickerAccessibleLabelsUtils', () => {
    let utils;
    let accessibleLabelUtils;
    let $container;
    let $prevLink;
    let $nextLink;

    beforeEach(() => {
        utils = new DatePickerUtils();
        accessibleLabelUtils = new DatePickerAccessibleLabelsUtils(utils);

        $container = $(`
            <div>
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
            </div>
        `);
        $prevLink = $container.find('.ui-datepicker-prev');
        $nextLink = $container.find('.ui-datepicker-next');
    });

    describe('addDateLabels()', () => {
        it('should add accessible labels to each date', () => {
            accessibleLabelUtils.addDateLabels($container);

            expect($container.find('[aria-label]').length).to.equal(7);
            expect($container.find('.ui-state-default').attr('aria-label')).to.equal('1 April 2020 Wednesday');
        });

        it('should add role="button" to each date', () => {
            accessibleLabelUtils.addDateLabels($container);

            expect($container.find('.ui-state-default').attr('role')).to.equal('button');
        });
    });

    describe('addControlLabels()', () => {
        it('should add a hidden span with accessible text to the prev link', () => {
            accessibleLabelUtils.addControlLabels($prevLink, $container);

            expect($container.find('.ui-datepicker-prev .ui-icon span.hide').text()).to.equal('Previous Month, March 2020');
        });

        it('should add a hidden span with accessible text to the next link', () => {
            accessibleLabelUtils.addControlLabels($nextLink, $container);

            expect($container.find('.ui-datepicker-next .ui-icon span.hide').text()).to.equal('Next Month, May 2020');
        });
    });

});
