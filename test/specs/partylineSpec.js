// assertion library
// /////////////////////////////////////////////////////////
var chai = require('chai').should();

// stubs
// /////////////////////////////////////////////////////////
var eventName = 'test';
var testFunc = function(num){
    x = num;
};



// modules to test
// /////////////////////////////////////////////////////////
var partyline = require('../../index');
var o, x;

describe('Partyline', function(){

    beforeEach(function(){

        o = partyline.derive();
        x = 0;
    });

    describe('#derive()', function(){

        it('should return a new constructor object', function(){

            o.should.be.a('Function');
            o.prototype.should.be.deep.equal(partyline.constructor.prototype);
        });
    });

    describe('#register()', function(){

        it('should update the registries object', function(){

            partyline.register(eventName, testFunc);

            partyline.registries[eventName].should.be.an('Array');
            partyline.registries[eventName].length.should.deep.equal(1);
            partyline.registries[eventName][0].should.deep.equal(testFunc);

        });
    });

    describe('#broadcast()', function(){

        it('should trigger all registered callbacks to defined event', function(){

            partyline.register(eventName, testFunc);
            partyline.broadcast('test', 3);

            x.should.deep.equal(3);
        });
    });

    describe('#registries', function(){

        it('should be an object', function(){

            partyline.registries.should.be.an('object');
        });
    });
});