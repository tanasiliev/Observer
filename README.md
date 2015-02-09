Observer
===
 
 A Pub/Sub implementation

Usage 
  ``` 
        var observer = observer.create();
        var f = observer.subscribe(function(num){ console.log(num)});
        var s = observer.subscribe(function(num, str){ console.log(num, str)});
        var th = observer.subscribe(function(num, str,data){ console.log(num, str,data)});
        observer.publish(25, "foo bar", { key : 2})
        observer.detach(th);
        observer.publish(25, "foo bar", { key : 2})
        observer.detachAll();
        observer.publish(25, "foo bar ", { key : 2})
  ```
  ... in console
  ```
   25
   25 "foo bar"
   25 "foo bar" { key : 2}
   
   25
   25 "foo bar"
