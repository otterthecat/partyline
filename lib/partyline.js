var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Partyline = function(){};
util.inherits(Partyline, EventEmitter);

var _emptyConstruct = function(){

    return function(data){

        if(this.init !== undefined){

            this.init(data);
        }
    };
};

Partyline.prototype.registries = {};


Partyline.prototype.derive = function(fn){

    var func = arguments.length > 0 ? fn : _emptyConstruct();

    util.inherits(func, Partyline);
    return func;
};


Partyline.prototype.register = function(ev, fn){

    if(!this.registries[ev]){
        this.registries[ev] = [];
    }

    this.registries[ev].push(fn.bind(this));
};


Partyline.prototype.broadcast = function(ev, data){

    if(this.registries[ev]){

        this.registries[ev].forEach(function(val, idx, array){

            val.call(this, data);
        });
    }
};

module.exports = new Partyline();