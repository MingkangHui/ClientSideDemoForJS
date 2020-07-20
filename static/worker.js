


if( 'function' === typeof importScripts) {
// importing external scripts

    importScripts('https://apis.google.com/js/api.js');
    // this one won't work if I tried to import the urls
   addEventListener('message', onMessage);
   function onMessage(e) {
     self.postMessage('You said: ' + e.data);
    gapi.load('client:auth2', initClient);
    // haven't try it yet
    console.log(e.data);
   }
}




var CLIENT_ID = '697344318458-dqc0g8jigivniq6ajsmnlih7gmscu1rd.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyCG8xfIDXOdkCq1aUJ4jzNI6qaLVq_T-sw';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';


      var hasNext = null




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

        }, function(error) {
          console.log(JSON.stringify(error, null, 2));
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {

          waitToGetFiles();

          // promise1 = new Promise(function (resolve) {
          //     //waitToGetFiles();
          //     if(hasNext=="finished"){
          //         resolve("success")
          //     }
          //
          // })
          //   promise1.then(function(value){
          //       console.log("loading success")
          //   })





            //here's the damn annotation!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            //some syncronizing problem here

        } else {
        }
      }

      function waitToGetFiles(){

          var newFiles=[];
          console.time('all time');
          //used to calculate the time consumed
          listAllFiles(null,newFiles);



      }

      function listAllFiles(pageToken,newFiles) {
        hasNext = null

        gapi.client.drive.files.list({
          'pageSize': 100,
            'pageToken':pageToken,
          'fields': "nextPageToken, files(id, name,kind,size,webContentLink,shared,parents,ownedByMe,createdTime,modifiedTime,modifiedByMeTime,fileExtension,mimeType,imageMediaMetadata,videoMediaMetadata)"
            //'fields': "*"
        }).then(function(response) {

          var files = response.result.files;
            hasNext = response.result.nextPageToken;
            obj.hasNext = response.result.nextPageToken;
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
                  hasNext = "finished"
                  obj.hasNext = "finished"
                  //saveMetaData(newFiles);
                  //this function is used to save data in browser side
              }
              if(hasNext=="finished"){
                  console.log("in wait success")

              }
              return newFiles;

          } else {

          }


        });



      }