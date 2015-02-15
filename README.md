Observer
===
 
 A Pub/Sub implementation

Usage 
  ``` 
var obj= observer.create();
obj.subscribe(function(num){ console.log(num)});
var fun = function(num, str){ console.log(num, str)};
obj.subscribe(fun);
obj.subscribe(function(num, str,data){ console.log(num, str,data)});
obj.publish(25, "foo bar", { key : 1});
obj.detach(fun);
obj.publish(25, "foo bar", { key : 1});
obj.detachAll();
obj.listeners().length

  ```
  ... in console
  ```
   25
   25 "foo bar"
   25 "foo bar" { key : 1}
   
   25
   25 "foo bar" {key: 1}
   2
