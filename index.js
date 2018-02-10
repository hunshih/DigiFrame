const express = require('express')
const fs = require('fs');
const url = require('url');
var firebase = require("firebase");
const app = express()
const port = 3000
var displayImage;

/**
 * Setup firebase
 * */
 var config = {
    apiKey: "AIzaSyB-FaMMS6rcpdToqG8DKrbSTKSz5KxUkvY",
    authDomain: "digiframe-2671a.firebaseapp.com",
    databaseURL: "https://digiframe-2671a.firebaseio.com",
    projectId: "digiframe-2671a",
    storageBucket: "digiframe-2671a.appspot.com",
    messagingSenderId: "296678610989"
};
firebase.initializeApp(config);
//var storageRef = firebase.storage().ref();
//var imageRef = storageRef.child('Henry/photos/profile.png');
var database = firebase.database();

//Ref & Listener in database
var photoCountRef = database.ref('/Henry/PhotoCount');
photoCountRef.on('value', function(snapshot) {
    console.log('PhotoCount is now: ' + snapshot.val());
    database.ref('/Henry/PhotoUpdate').set(dateString());
});

app.get('/', (req, res) => {
    fs.readFile('./index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    })
    //var img = fs.readFileSync('./angela.jpg');
    //response.writeHead(200, {'Content-Type': 'image/gif' });
    //response.end(img, 'binary');
    //response.send('Hello from Express!')
    //downloadFile(response);
})

app.use(express.static('public'));

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

function downloadFile(httpResponse)
{
    imageRef.getDownloadURL().then(function(url) {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
        var img = xhr.response;
        response.writeHead(200, {'Content-Type': 'image/gif' });
        response.end(img, 'binary');
    };
    xhr.open('GET', url);
    xhr.send();
    }).catch(function(error) {
        // Handle any errors
    });
}

function dateString()
{
    var time = new Date();
    return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
}
