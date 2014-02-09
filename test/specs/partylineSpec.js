// assertion library
// /////////////////////////////////////////////////////////
var chai = require('chai').should();

// stubs
// /////////////////////////////////////////////////////////
var eventName = 'test';
var testConstructor = function(){};
var testFunc = function(num){
    x = num;
};



// modules to test
// /////////////////////////////////////////////////////////
var partyline = require('../../index');
var P, p, x;

describe('Partyline', function(){

    beforeEach(function(){

        P = partyline.derive();

        var p = new P();

        x = 0;
    });

    describe('#derive()', function(){

        describe('if no argument is passed,', function(){

            it('should return a new constructor function', function(){

                P.should.be.a('Function');
                P.prototype.should.be.deep.equal(partyline.constructor.prototype);
            });

            it('should include a call to .init() function within returned constructor', function(){

                P.prototype.init = function(){
                    this.y = "why";
                };

                var pInit = new P();
                pInit.y.should.deep.equal('why');
            });
        });

        describe('if a function is passed as argument, ', function(){

            it('should return the function with inherited prototype', function(){

                var extendedFunc = partyline.derive(testConstructor);
                extendedFunc.should.deep.equal(testConstructor);
            });
        });
    });

    describe('#register()', function(){

        it('should update the registries object', function(){

            partyline.register(eventName, testFunc);

            partyline.registries[eventName].should.be.an('Array');
            partyline.registries[eventName].length.should.deep.equal(1);
            partyline.registries[eventName][0].should.be.a('Function');

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