var assert = require('assert');
describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });
});

describe('ES6 support', () => {

    it('should support ES6 grammar', () => {
        let result = sum(1, 1);
        assert.equal(result, 2);
    });

    function sum(...figures) {
        return figures.reduce((total, current) => {
            return total + current;
        });
    }
});


