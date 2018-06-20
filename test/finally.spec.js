
describe('Promise: finally function', () => {

    const expected = 'then';

    it('should then function receive the RESOLVED VALUE when it chained after finally', () => {

        return start()
            .then(thenResolve)
            .finally(() => {
                //do something...
            })
            .then(val => {
                assert.strictEqual(val, expected);
            });
    });

    it('should then function receive the RETURNED VALUE when it chained after finally', () => {

        return start()
            .then(thenReturn)
            .finally(() => {
                //do something...
            })
            .then(val => {
                assert.strictEqual(val, expected);
            });
    });

    it('should then function receive the undefined when it chained after finally', () => {

        return start()
            .then(thenReturnUndefined)
            .finally(() => {
                //do something...
            })
            .then(val => {
                //the val is undefined here, I think it is returned by thenReturnUndefined function
                //because the function default return is undefined
                assert.isUndefined(val);
            });
    });


    function start() {
        return Promise.resolve(1);
    }

    function thenResolve() {
        return Promise.resolve('then');
    }

    function thenReturn() {
        return 'then';
    }

    function thenReturnUndefined() {
        //function default return is undefined
    }
});
