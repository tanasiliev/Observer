(function (global){

    var topics = {}; 
    
    var isFunction = function(obj) {
      return !!(obj && obj.constructor && obj.call);
    };
    
    var error = function(message){
        throw new Error(message)
    };
    
    var GUID = function (){
        var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
             var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
             return v.toString(16).toUpperCase();
        });
        return guid;
    };
    
    var Event = function(){
        var _guid = GUID();
        topics[_guid] = [];
        this.guid = function(){
           return _guid;
        }
    };
    
    var subscribers = function(){
        return topics[this.guid()];
    };
    
    Event.prototype = {
        subscribe : function(handler){
            if(!isFunction(handler))
                return error("Invalid Function " + handler); 
            var length = subscribers.call(this).push(handler);
            return this.guid() + (length - 1);
        },
        publish: function(){
            var subs = subscribers.call(this);
            for(var i in subs)
                subs[i] && subs[i].apply(null, arguments);
        },
        detach: function(argment){
           var subs = subscribers.call(this);    
		   if (typeof argment == 'string'){
		        var index = argment.slice(36);
				if(index && index !== - 1) 
					delete subs[index];
           } else if(isFunction(argment)){
			   for(var i in subs) 
				   if(subs[i] == argment) 
                       delete subs[i];
           }
           else return error("Invalid Function or Identifier " + argment);   
        },
        detachAll: function(){
          topics[this.guid()] = [];
        },
        destroy: function(){
          topics[this.guid()] = null;
          delete topics[this.guid()];
        }
    };
    var observer = {
         create : function(){
            return new Event();
         }
    };

    if(typeof define === 'function' && define.amd){ 
        define(function () { return observer; });
    } else if (typeof module !== 'undefined' && module.exports){ 
        module.exports = observer;
    } else { 
        global['observer'] = observer;
    }
    
})(this);

