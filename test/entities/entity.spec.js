const {removeTableNameFromEntity} = require('../../entities/entity');
const assert = require('assert');

describe('Entity', () => {

    describe('#removeTableNameFromEntity()', () => {

        it('should remove tableName attribute from entity when entity includes the tableName', () => {
            //given
            const entity = {
                userName: 'Joy',
                age: 18,
                tableName: 'users'
            };
            const expected = {
                userName: 'Joy',
                age: 18
            };
            //when
            const acutal = removeTableNameFromEntity(entity);
            //then
            console.log(JSON.stringify(acutal));
            assert.deepEqual(acutal, expected);
        });

    });
});
