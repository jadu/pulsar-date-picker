import DatePickerUtils from '../../src/js/DatePickerUtils';
import DatePickerHighlightUtils from '../../src/js/DatePickerHighlightUtils';

describe('DatePickerHighlightUtils', () => {
    let utils;
    let highlightUtils;
    let $container;
    let $newHighlight;

    beforeEach(() => {
        utils = new DatePickerUtils();
        highlightUtils = new DatePickerHighlightUtils(utils);

        $container = $(`
            <div>
                <a class="ui-state-highlight">1</a>
                <a class="ui-state-default">2</a>
                <a class="ui-state-default">3</a>
            </div>
        `);
    });

    describe('prepHighlightState()', () => {
        describe('When there is an existing highlight', () => {
            it('should reapply the highlight to the same date in the new month', () => {
                highlightUtils.prepHighlightState($container);

                expect($container.find('a').first().hasClass('ui-state-highlight')).to.be.true;
            });

            it('should not highlight any other dates in the month', () => {
                highlightUtils.prepHighlightState($container);

                expect($container.find('.ui-state-default').hasClass('ui-state-highlight')).to.be.false;
            });
        });

        describe('When there is no existing highlight', () => {
            beforeEach(() => {
                $container.find('.ui-state-highlight').removeClass('ui-state-highlight');
            });

            it('should apply the highlight to the first date in the new month', () => {
                highlightUtils.prepHighlightState($container);

                expect($container.find('.ui-state-default').first().hasClass('ui-state-highlight')).to.be.true;

            });

            it('should not highlight any other dates in the month', () => {
                highlightUtils.prepHighlightState($container);

                expect($container.find('.ui-state-default').last().hasClass('ui-state-highlight')).to.be.false;
            });
        });
    });

    describe('setHighlightState()', () => {
        it('should remove the old highlight and apply a new highlight', () => {
            $newHighlight = $container.find('.ui-state-default').first();

            highlightUtils.setHighlightState($newHighlight, $container);
        });
    });
});
