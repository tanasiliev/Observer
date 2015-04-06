Observer
===
 
 A Pub/Sub implementation

Usage 
  ``` 
var obj= observer.create();
var fun1 = function(num, str){ console.log("fun1")};
obj.subscribe(fun1);
obj.subscribe(function(num){ console.log(num)});
obj.subscribe(function(num, str,data){ console.log(num, str,data)});
obj.publish(25, "foo bar", { key : 1});
obj.detach(fun1);
obj.publish(25, "foo bar", { key : 1});
obj.detachAll();
obj.listeners().length
  ```
