import DatePickerUtils from '../../src/js/DatePickerUtils';

describe('DatePickerUtils', () => {
    let utils;
    let $html;
    let $expected;
    let $currentDate

    beforeEach(() => {
        utils = new DatePickerUtils();

        $html = $(`
            <div>
                <a class="skip-link" aria-hidden="true">skip</a>
                <div class="container" aria-hidden="true">
                    <a class="ui-state-highlight">1</a>
                </div>
                <div class="footer" aria-hidden="true"></div>
            </div>
        `);
    });

    describe('getCurrentDate()', () => {
        it('should return the current date element', () => {
            $expected = $html.find('.ui-state-highlight');
            $currentDate = utils.getCurrentDate($html);

            expect($currentDate[0]).to.equal($expected[0]);
        });
    });

    describe('removeAria()', () => {
        it('should remove aria-hidden from main page elements', () => {
            utils.removeAria($html);

            expect($html.find('[aria-hidden="true"]').length).to.equal(0);
        });
    });

    describe('firstToCap()', () => {
        it('should capitalize the first letter of the string', () => {
            expect(utils.firstToCap('a lowercase string')).to.equal('A lowercase string');
        });
    });
});
