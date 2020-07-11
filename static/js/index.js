   const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.language = 'JavaScript';
        document.body.appendChild(script);







      // Client ID and API key from the Developer Console
      //console.log('localforage is: ', localforage);
      var CLIENT_ID = '697344318458-dqc0g8jigivniq6ajsmnlih7gmscu1rd.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyCG8xfIDXOdkCq1aUJ4jzNI6qaLVq_T-sw';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

      var authorizeButton = document.getElementById('authorize_button');
      var signoutButton = document.getElementById('signout_button');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        }, function(error) {
          appendPre(JSON.stringify(error, null, 2));
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';



          run();





            //here's the damn annotation!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //waitToGetFiles();
            //some syncronizing problem here

        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }

      function waitToGetFiles(){

          var newFiles=[];
          appendPre('Files:');
          console.time('all time');
          //used to calculate the time consumed
          listAllFiles(null,newFiles);



      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

      /**
       * Print files.
       */
      function listFiles() {
          //this function is never used now, forget about it
        gapi.client.drive.files.list({
          'pageSize': 1000,
          'fields': "nextPageToken, files(id, name,kind,size,webContentLink,shared,parents,ownedByMe)"
            //'fields': "*"
        }).then(function(response) {

          var files = response.result.files;
          console.log(response.result);
          if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              appendPre(file.name + ' (' + file.id + ')');
            }
          } else {
            appendPre('No files found.');
          }
        });
      }


      function listAllFiles(pageToken,newFiles) {
          var hasNext = null

        gapi.client.drive.files.list({
          'pageSize': 100,
            'pageToken':pageToken,
          'fields': "nextPageToken, files(id, name,kind,size,webContentLink,shared,parents,ownedByMe,createdTime,modifiedTime,modifiedByMeTime,fileExtension,mimeType,imageMediaMetadata,videoMediaMetadata)"
            //'fields': "*"
        }).then(function(response) {

          var files = response.result.files;
            hasNext = response.result.nextPageToken;
            //get the nextPageToken
          console.log("has next?");
          console.log(hasNext);
          //for testing
          if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              newFiles.push(file);
              appendPre(file.name + ' (' + file.id + ')');
              //pushing some of the metadata of files into the list
            }
            //console.log(newFiles)
              if(hasNext){
              listAllFiles(hasNext,newFiles);
              }else{
                  console.log(newFiles);
                  saveMetaData(newFiles);
                  //this function is used to save data in browser side
              }
              return newFiles;

          } else {
            appendPre('No files found.');
          }
        });



      }

      function saveMetaData(newList){



            //console.log(newList)
            localforage.setItem('response', newList).then(function (value) {
                            // saved value
                console.log("save success")
                console.log(value);
            }).catch(function(err) {

            console.log(err);
            });
            localforage.getItem('response').then(function(values){
                console.log("Get Success")
                console.log(values);
                console.log("Time Cost:");
                console.timeEnd('all time');
            }).catch(function (err) {
                console.log(err);
            })
  }






function run() {
    console.log("Test2");

    // if ('serviceWorker' in navigator) {
    //   window.addEventListener('load', function() {
    //     navigator.serviceWorker.register('/sw.js').then(function(registration) {
    //       // Registration was successful
    //       console.log('ServiceWorker registration successful with scope: ', registration.scope);
    //     }, function(err) {
    //       // registration failed :(
    //       console.log('ServiceWorker registration failed: ', err);
    //     });
    //   });
    // }else{
    //     console.log("fuck")
    // }


    if ('serviceWorker' in navigator) {
        console.log("in navi");
        //deleted an onload here, since there's already one in the html
        navigator.serviceWorker.register('static/js/sw.js').then(function(registration){
        console.log("Registration complete for ",registration.scope);
    },function(err){
        console.log("Error ",err);
    });

}


    console.log("Finished?")

}






