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
obj.publish(25, "foo bar", { key : 2});
obj.detach(fun);
obj.publish(25, "foo bar", { key : 2});
obj.detachAll();

  ```
  ... in console
  ```
   25
   25 "foo bar"
   25 "foo bar" { key : 2}
   
   25
   25 "foo bar" {key: 2}
