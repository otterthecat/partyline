# Partyline

Turn your modules into a busybody.

## What is it?

Partyline is a NodeJS module that extends the EventEmitter object.
It can be used as a mediator, or can return a new contructor function
for your modules/objects that can listen/observe all events across any/all
other inherited objects that are set using the `.register()` method.


## How to use it?

Include it as you would any other module, and derive a new instance

```javascript
var pl = require('./partyline');
```
Now you can use the Partyline instance's `.derive()` method to be the basis for your custom module/constructor(s)

```javacript
var MyModule = pl.derive();

var MyOtherModule = pl.derive();

var objectA = new MyModule();
var objectB = new MyOtherModule();
```

With your modules inheriting from Partyline, they all can register events which will be observed by any instance that inherits from Partyline. Expanding from the code above, we can do this:

```javascript
objectA.register('someEvent', function(){
    console.log("This is objectA");
});

objectB.register('someEvent', function(){
    console.log("objectB here");
});
```

This has registered 2 objects to the 'someEvent' event. Now `objectA`, `objectB`, and `pl` are all able
to trigger 'someEvent' by using the `.broadcast()` method.

```javascript
// you cant trigger "someEvent" in this way
objectA.broadcast('someEvent');

// as will this
objectB.broadcast('someEvent');

// and also this
pl.broadcast('someEvent');

// any one of the above object's broadcast calls will produce the same log output of:
// "This is objectA"
// "objectB here"
```

Also remember, that since Partyline extend NodeJS' `events.EventEmitter` object, all instances above are
able to use `.on()` and `.emit()` methods as you would do so with EventEmitter. Note that using events in this manner are not broadcasted to children of Partlyline.

Lastly, if using Browserify, you can include Partyline into your clientside scripts as well.

## API

`.derive()`

Returns a function who's prototype matches Partyline's prototype. This function can then be further extended as needed with your own functionality.

`.register(ev, callback)`

Adds and event with callback to the `.registries` object. Can be triggered by any descendant of Partyline.

`.broadcast(ev, data)`

Fires an event (ev) to all descendants of Partyline that registered the emitted event name

`.registries`

An object that stores all the events/callbacks set with `.register()`