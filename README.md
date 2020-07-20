# ClientSideDemo
This is a current runnable demo for JS app. Now it could login the google auth and get metadata of all of the files in the user's drive. 
The service worker version is not finished yet.


After started, use the browser to access 127.0.0.1/authGapi to try it out.

You should open the console of the browser first(for some of the output are given by console.log)

Then click the authorize button to deal with the Oauth login, then the browser side will show the names and id of files,
the console will show some debugging data and finally show the time cost of retrieving those data.  

Now there's some problem about importing external scripts into web workers, related code is in static/index2.js and worker.js.
The routing code is in app/route.py. I'm suspecting there's some conflicts with npm.