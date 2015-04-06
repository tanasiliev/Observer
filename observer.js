(function (global){

    var isFunction = function(obj) {
      return !!(obj && obj.constructor && obj.call);
    };

    var Signal = function(){
        this.subscribers = [];
    };
    
    Signal.prototype = {
        subscribe : function(handler){
            if(!isFunction(handler))
               throw new Error("Invalid Function " + handler); 
            this.subscribers.push(handler);
        },
        publish: function(){
            var subs = this.subscribers;
            for(var i = 0; i < subs.length; ++i)
                subs[i].apply(null, arguments);
        },
        detach: function(handler){
            if(!isFunction(handler))
                throw new Error("Invalid Function " + handler);
            var subs = this.subscribers;
            for(var i = 0; i < subs.length; ++i){    
                if(subs[i] == handler){ 
                    subs.splice(i, 1);
                    break;  
              }
           }    
        },
        detachAll: function(){
            this.subscribers = [];
        },
        listeners : function(){
            return this.subscribers.slice(0);
        }
    };
    
    var observer = {
        create : function(){
            var signal = new Signal(),
                obj = {};
            for(var prop in Signal.prototype){
                obj[prop] = signal[prop].bind(signal);
            } 
            return obj;
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
