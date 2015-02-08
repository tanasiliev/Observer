(function (){
   
    var _events = {};
    
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
        _events[_guid] = [];
        this.subscribers = function(){
           return _events[_guid];
        }
        this.guid = function(){
           return _guid;
        }
    };
    
    Event.prototype = {
        subscribe : function(handler){
            if(!isFunction(handler)){
                return error("Invalid Function " + handler); 
            }
            var length = this.subscribers().push(handler);
            return this.guid() + (length - 1);
        },
        publish: function(){
            var subscribers = this.subscribers();
            for(var i in subscribers)
                subscribers[i] && subscribers[i].apply(null, arguments);
        },
        detach: function(identifier){
            if (typeof identifier !== 'string'){
                return error("Invalid Identifier " + identifier); 
            }
            var index = identifier.slice(36);
            if(index && index !== - 1) {
                delete this.subscribers()[index];
                return true;
            }
        },
        detachAll: function(){
          _events[this.guid()] = [];
        }
    };
    var Observer = {
         create : function(){
            return new Event();
         }
    };
    
    if(!window.Observer){
       window.Observer = Observer;
    }
})();