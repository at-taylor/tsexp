/**
 * Created with IntelliJ IDEA.
 * User: tparmer
 * Date: 11/27/13
 * Time: 12:21 PM
 * To change this template use File | Settings | File Templates.
 */

var serviceURL = "http://216.74.49.91:8080/tssvc/resourcesS/stories/";
//var serviceURL = "http://localhost:8080/tssvc/resourcesS/stories";
//var serviceURL = "http://localhost:8080/tssvc/getstorylist2.html";

//var employees;
//var stories;

$('#mediaPage').bind('pagebeforecreate', function(event) {
    //alert('bind: pagebeforecreate');
    //getEmployeeList();
});
$('#mediaPage').bind('pagecreate', function(event) {
   // alert('bind: pagecreate');
    //getEmployeeList();
});

$('#mediaPage').bind('pageinit', function(event) {
    //alert('bind: pageinit');
    //getEmployeeList();
});

$('#mediaPage').live('pageinit', function(event) {
    alert('live: pageinit');
    app.initialize();
    alert('live: after app.init');
    //getEmployeeList();
});
$('#mediaPage').bind('pagebeforeload', function(event) {
   // alert('bind: pagebeforeload');
    //getEmployeeList();
});

$('#mediaPage').bind('pageload', function(event) {
   // alert('bind: pageload');
    //getEmployeeList();
});

$('#mediaPage').bind('pagebeforeshow', function(event) {
   // alert('bind: pagebeforeshow');
    //getEmployeeList();
});

$('#mediaPage').bind('pageshow', function(event) {
    //alert('bind: pageshow');
    //getEmployeeList();
});
$('#mediaPage').bind('pagebeforechange', function(event) {
    //alert('bind: pagebeforeshow');
    //getEmployeeList();
});

$('#mediaPage').bind('pagechange', function(event) {
   // alert('bind: pageshow');
    //getEmployeeList();
});


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        alert('before binding events');
// document.addEventListener('deviceready', this.onDeviceReady, false);
// document.getElementById('scan').addEventListener('click', this.scan, false);
// document.getElementById('encode').addEventListener('click', this.encode, false);
// document.getElementById('whitelist').addEventListener('click', this.whitelist, false);
        document.getElementById('camera').addEventListener('click', this.camera, false);
        document.getElementById('video').addEventListener('click', this.captureVideo, false);
        document.getElementById('audio').addEventListener('click', this.captureAudio, false);
        document.getElementById('getphoto').addEventListener('click', this.getphoto, false);
        alert('after binding events');
    },

// // deviceready Event Handler
// //
// // The scope of `this` is the event. In order to call the `receivedEvent`
// // function, we must explicity call `app.receivedEvent(...);`
// onDeviceReady: function() {
// app.receivedEvent('deviceready');
// console.log('CORDOVA VERSION: ' + window.device.cordova);
// window.addEventListener('batterystatus', app.onBatteryStatus, false);
// },
// // Update DOM on a Received Event
// receivedEvent: function(id) {
// var parentElement = document.getElementById(id);
// var listeningElement = parentElement.querySelector('.listening');
// var receivedElement = parentElement.querySelector('.received');
//
// listeningElement.setAttribute('style', 'display:none;');
// receivedElement.setAttribute('style', 'display:block;');
//
// console.log('Received Event: ' + id);
// },
// onBatteryStatus: function(info) {
// console.log("Level: " + info.level + " isPlugged: " + info.isPlugged);
// },
// scan: function() {
// console.log('scanning');
// var scanner = cordova.require("cordova/plugin/BarcodeScanner");
//
// scanner.scan( function (result) {
//
// alert("We got a barcode\n" +
// "Result: " + result.text + "\n" +
// "Format: " + result.format + "\n" +
// "Cancelled: " + result.cancelled);
//
// console.log("Scanner result: \n" +
// "text: " + result.text + "\n" +
// "format: " + result.format + "\n" +
// "cancelled: " + result.cancelled + "\n");
// document.getElementById("info").innerHTML = result.text;
// console.log(result);
// /*
// if (args.format == "QR_CODE") {
// window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
// }
// */
//
// }, function (error) {
// console.log("Scanning failed: ", error);
// } );
// },
//
// encode: function() {
// var scanner = cordova.require("cordova/plugin/BarcodeScanner");
//
// scanner.encode(scanner.Encode.TEXT_TYPE, "http://www.nhl.com", function(success) {
// alert("encode success: " + success);
// }, function(fail) {
// alert("encoding failed: " + fail);
// }
// );
//
// },
//
// whitelist: function() {
//
// app.xhr("https://tv.eurosport.com/", function(xhr) {
// console.log("eurosport is invalid " + xhr.status);
// console.log("eurosport: " + xhr.responseText.substring(0, 100));
// });
// /*
// app.xhr("http://ajax.googleapis.com/ajax/libs/prototype/1.7.1.0/prototype.js", function(xhr) {
// console.log("googleapis: should succeed: " + xhr.status);
// console.log("googleapis: " + xhr.responseText.substring(0, 100));
// });
//
// app.xhr("http://code.jquery.com/jquery-1.10.2.min.js", function(xhr) {
// console.log("jquery: should fail: " + xhr.status);
// console.log("jquery: " + xhr.responseText.substring(0, 100));
// });
//
// app.xhr("http://phonegap.com", function(xhr) {
// console.log("phonegap: should fail: " + xhr.status);
// console.log("phonegap: " + xhr.responseText.substring(0, 100));
// });
//
// app.xhr("http://googleapis.com", function(xhr) {
// console.log("googleapis.com: should succeed: " + xhr.status);
// console.log("googleapis.com: " + xhr.responseText.substring(0, 100));
// });
//
// app.xhr("http://jquery.com", function(xhr) {
// console.log("jquery.com: should succeed: " + xhr.status);
// console.log("jquery.com: " + xhr.responseText.substring(0, 100));
// });
// */
//
// },

    camera: function() {

        function onSuccess(imageData) {
            //console.log('success');

            document.getElementById('testMsg').value = "in onSuccess";

            //Anna
            //var image = document.getElementById('myImage');
            //image.src = "data:image/jpeg;base64," + imageData;

            var smallImage = document.getElementById('smallImage');

            // Unhide image elements
            //
            smallImage.style.display = 'block';

            // Show the captured photo
            // The inline CSS rules are used to resize the image
            //
            smallImage.src = "data:image/jpeg;base64," + imageData;

            // Get image handle
            //
            var largeImage = document.getElementById('largeImage');

            // Unhide image elements
            //
            largeImage.style.display = 'block';
            largeImage.src = "data:image/jpeg;base64," + imageData;

        }

        function onFail(message) {
            console.log('failed');
        }
        var cameraPopoverOptions = new CameraPopoverOptions(220, 600, 320, 480, Camera.PopoverArrowDirection.ARROW_DOWN) ;
        var cameraHandle = navigator.camera.getPicture(onSuccess, onFail, { quality: 50, saveToPhotoAlbum: true,
            destinationType: Camera.DestinationType.DATA_URL, popoverOptions:cameraPopoverOptions
        });
        //cameraHandle.setPosition(cameraPopoverOptions);

    },

    getphoto: function() {

        function onSuccess(imageData) {
            //console.log('success');

            document.getElementById('testMsg').value = "in onSuccess";

            //Anna
            //var image = document.getElementById('myImage');
            //image.src = "data:image/jpeg;base64," + imageData;

            var smallImage = document.getElementById('smallImage');

            // Unhide image elements
            //
            smallImage.style.display = 'block';

            // Show the captured photo
            // The inline CSS rules are used to resize the image
            //
            smallImage.src = "data:image/jpeg;base64," + imageData;

            // Get image handle
            //
            var largeImage = document.getElementById('largeImage');

            // Unhide image elements
            //
            largeImage.style.display = 'block';
            largeImage.src = "data:image/jpeg;base64," + imageData;

        }

        function onFail(message) {
            console.log('failed');
        }

        navigator.camera.getPicture(onSuccess, onFail, { quality: 50, saveToPhotoAlbum: true,
            destinationType: Camera.DestinationType.DATA_URL,sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            mediaType: Camera.MediaType.ALLMEDIA
        });

    },


    xhr: function(url, cb) {
        var xhr1 = new XMLHttpRequest();
        xhr1.onreadystatechange = function(args) {
            if(xhr1.readyState==4)
                cb(xhr1);
        };
        xhr1.open("GET", url, true);
        xhr1.send();
    },

    captureVideo: function() {
        navigator.device.capture.captureVideo(function(mediaFiles)
            {
                console.log('CALLBACK!');
                console.log(JSON.stringify(mediaFiles));
            }, function(error)
            {
                console.log('Video capture failed');
                alert ('video failed');
            },
            {
                limit: 1,
                duration: 12
            });


    },

 /*   // Record audio
//
     recordAudio: function() {
    var src = "myrecording.wav";
    var mediaRec = new Media(src,
        // success callback
        function() {
            console.log("recordAudio():Audio Success");
            alert('audio success');
        },

        // error callback
        function(err) {
            console.log("recordAudio():Audio Error: "+ err.code);
        }
    );

    // Record audio
    mediaRec.startRecord();

    // Stop recording after 10 seconds
    setTimeout(function() {
        mediaRec.stopRecord();
    }, 10000);
}*/

    captureAudio: function() {

        // Called when capture operation is finished
        //
        function captureSuccess(mediaFiles) {

            alert ('audio success');
            var i, len;
            for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                uploadFile(mediaFiles[i]);
            }


        }

        // Called if something bad happens.
        //
        function captureError(error) {
            var msg = 'An error occurred during capture: ' + error.code;
            navigator.notification.alert(msg, null, 'Uh oh!');
        }

        navigator.device.capture.captureAudio(function(mediaFiles)
            {
                console.log('CALLBACK!');
                console.log(JSON.stringify(mediaFiles));
            }, function(error)
            {
                console.log('Audio capture failed');
            },
            {
                limit: 1,
                duration: 12
            });

        // Upload files to server
//        function uploadFile(mediaFile) {
//            var ft = new FileTransfer(),
//                path = mediaFile.fullPath,
//                name = mediaFile.name;
//
//            ft.upload(path,
//                "http://my.domain.com/upload.php",
//                function(result) {
//                    console.log('Upload success: ' + result.responseCode);
//                    console.log(result.bytesSent + ' bytes sent');
//                },
//                function(error) {
//                    console.log('Error uploading file ' + path + ': ' + error.code);
//                },
//                { fileName: name });
//        }

    }
};
















