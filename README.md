Observer
===
 
 A Pub/Sub implementation

Usage 
  ``` 
var obj= observer.create();
var fun1 = function(num, str){ console.log("fun1")};
var fun2 = function(num, str){ console.log("fun2")};
obj.subscribe(fun1);
obj.subscribe(fun2);
obj.subscribe(function(num){ console.log(num)});
obj.subscribe(function(num, str,data){ console.log(num, str,data)});
obj.publish(25, "foo bar", { key : 1});
obj.detach(fun1);
obj.publish(25, "foo bar", { key : 1});
obj.detachAll();
obj.listeners().length

  ```
  ... in console
  ```
   fun1
   fun2
   25
   25 "foo bar" Object {key: 1}
   
   fun2
   25
   25 "foo bar" Object {key: 1}
   0
