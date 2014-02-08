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
var Partyline = require('../../index');
var pl, o, x;

describe('Partyline', function(){

    beforeEach(function(){

        pl = new Partyline();
        o = pl.create();
        x = 0;
    });

    it('should be a constructor function', function(){

        Partyline.should.be.a('Function');
        pl.should.be.an.instanceOf(Partyline);
    });

    describe('#create()', function(){

        it('should return a new constructor object', function(){

            o.should.be.a('Function');
            o.prototype.should.be.deep.equal(Partyline.prototype);
        });
    });

    describe('#register()', function(){

        it('should update the registries object', function(){

            pl.register(eventName, testFunc);

            pl.registries[eventName].should.be.an('Array');
            pl.registries[eventName].length.should.deep.equal(1);
            pl.registries[eventName][0].should.deep.equal(testFunc);

        });
    });

    describe('#broadcast()', function(){

        it('should trigger all registered callbacks to defined event', function(){

            pl.register(eventName, testFunc);
            pl.broadcast('test', 3);

            x.should.deep.equal(3);
        });
    });

    describe('#registries', function(){

        it('should be an object', function(){

            pl.registries.should.be.an('object');
        });
    });
});