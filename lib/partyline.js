var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Partyline = function(){};
util.inherits(Partyline, EventEmitter);

Partyline.prototype.registries = {};


Partyline.prototype.derive = function(){

    var func = function(){};

    util.inherits(func, Partyline);
    return func;
};


Partyline.prototype.register = function(ev, fn){

    if(!this.registries[ev]){
        this.registries[ev] = [];
    }

    this.registries[ev].push(fn);
};


Partyline.prototype.broadcast = function(ev, data){

    if(this.registries[ev]){

        this.registries[ev].forEach(function(val, idx, array){

            val(data);
        });
    }
};

module.exports = new Partyline();