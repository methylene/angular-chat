angular-chat
============

Playing with [angular.js](https://github.com/angular/angular.js), I want to see how it works.

Using a [jsfiddle](http://jsfiddle.net/hCykg/1/) and the [angular-seed](https://github.com/angular/angular-seed) as starting points.

It runs in [thttpd](http://www.acme.com/software/thttpd/), using this command: (assuming the "app" folder is in the working directory)

	sudo thttpd -r -d "app" -h localhost -p 8000 -M 0

Later you can stop thttpd using following command:

	pgrep thttpd | xargs sudo kill
