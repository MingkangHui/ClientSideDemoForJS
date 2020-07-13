//tried to move some of the functions here, but since sw can't receive api as message, it's a lot harder than I've thought before,
//currently I'm still looking for a way to send the api or a login token(but I don't know where to find one) in here.

self.addEventListener('install', function(event) {
  console.log("Installed")
  console.log("added")

});

self.addEventListener('activate', function(event) {
  console.log("Activated1?");


});

self.addEventListener('fetch', function(event) {
  console.log("Fetched")
});

self.addEventListener('message', function(ev) {
    var gapi = ev.data;
    console.log("Get Message");
    console.log(ev.data)

  });


function waitToGetFiles(){

          var newFiles=[];
          console.time('all time');
          //used to calculate the time consumed
          listAllFiles(null,newFiles);
      };




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
              console.log(file.name + ' (' + file.id + ')');
              //pushing some of the metadata of files into the list
            }
            //console.log(newFiles)
              if(hasNext){
              listAllFiles(hasNext,newFiles);
              }else{
                  console.log(newFiles);
                  hasNext = "finished"
                  obj.hasNext = "finished"
                  saveMetaData(newFiles);
                  //this function is used to save data in browser side
              }
              if(hasNext=="finished"){
                  console.log("in wait success")

              }
              return newFiles;

          } else {
            console.log('No files found.');

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