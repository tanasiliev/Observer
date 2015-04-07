(function (global) {
    
   'use strict';
   
    var isFunction = function (obj) {
        return !!(obj && obj.constructor && obj.call);
    };

    var Signal = function () {
        var _subscribers = [];
        var signal = {
            subscribe: function (handler) {
                if (!isFunction(handler))
                    throw new Error("Invalid Function " + handler);
                _subscribers.push(handler);
            },
            publish: function () {
                var subs = _subscribers;
                for (var i = 0; i < subs.length; ++i)
                    subs[i].apply(null, arguments);
            },
            detach: function (handler) {
                if (!isFunction(handler))
                    throw new Error("Invalid Function " + handler);
                var subs = _subscribers;
                for (var i = 0; i < subs.length; ++i) {
                    if (subs[i] == handler) {
                        subs.splice(i, 1);
                        break;
                    }
                }
            },
            detachAll: function () {
                _subscribers = [];
            },
            listeners: function () {
                return _subscribers;
            }
        };
        return signal;
    };

    var observer = {
        create: function () {
            return Signal();
        }
    };
    
    //exports to multiple environments
    if(typeof define === 'function' && define.amd){ 
        define(function () { return observer; });
    } else if (typeof module !== 'undefined' && module.exports){ 
        module.exports = observer;
    } else { 
        global['observer'] = observer;
    }

})(this);
