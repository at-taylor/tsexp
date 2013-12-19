<label for="descrTxt">Description:</label><textarea id="descrTxt" name="descrTxt">   </textarea>
// Test version for local embeeded
var storyList = {"storyModelList": [
    {"id":223,
        "title":"Programatically Created Story",
        "createdEpoch":1383856440,
        "createdHr":"11/07/2013",
        "updatedEpoch":1385142286,
        "updatedHr":"11/22/2013",
        "descr":"<p>My story <b> content </b>.</p>\n",
        "excerpt":null,
        "categoryList":{"1":"Love","2":"Work","3":"Family","4":"Friends","6":"Spirituality","12":"Marriage"},
        "categoryListHr":"Love, Work, Family, Friends, Spirituality, Marriage",
        "recordingUrl":"http://app.treasuredstories.com/uploaded/media/audio/audio-attachment-storyid-223-1052072947-1383860040.wav",
        "archived":0,
        "age":"1",
        "storyDateAgeHr":"01/14/1930 (1)",
        "status":"Published"},
    {"id":22,
        "title":"Programatically Created Story2",
        "createdEpoch":1383856440,
        "createdHr":"11/07/2013",
        "updatedEpoch":1385142286,
        "updatedHr":"11/22/2013",
        "descr":"<p>My story <b> content </b>.</p>\n",
        "excerpt":null,
        "categoryList":{"1":"Love","2":"Work","3":"Family","4":"Friends","6":"Spirituality","12":"Marriage"},
        "categoryListHr":"Love, Work, Family, Friends, Spirituality, Marriage",
        "recordingUrl":"http://app.treasuredstories.com/uploaded/media/audio/audio-attachment-storyid-223-1052072947-1383860040.wav",
        "archived":0,
        "age":"1",
        "storyDateAgeHr":"01/14/1930 (1)",
        "status":"Published"}
]
};

//    $('#employeeList li').remove();
//    $.each(storyList.storyModelList, function(index, value) {
//        $('#employeeList').append('<li>' + value.id + ': ' + value.title + '</li>');
//    });
//    $('#employeeList').listview('refresh');

// a jsonp try


//$.getJSON('getstorylist2.html', function(data) {
//
//   alert("pull from url: " + serviceURL);
//
//    (function($) {
//        $.ajax({
//            type: 'GET',
//            url: serviceURL,
//            async: false,
//            jsonpCallback:   'callbackStoryFunc',
//            dataType: 'jsonp',
//            success: function(json) {console.log("ok");},
//            error: function(e) { alert(e.message); }
//        })      ;
//    })(jQuery);

//    $(["<div id=\"progressbar-overlay\" class=\"ui-tolito-progressbar-overlay\">",
//        "<div class=\"ui-tolito-progressbar-overlay-box\">",
//        "<div class=\"ui-tolito-progressbar-overlay-box-corner-top ui-tolito-progressbar-overlay-box-corner-bottom ui-tolito-progressbar-overlay-box-content ui-tolito-progressbar-overlay-box-body-c\">",
////        "<h1>Loading data..</h1>",
////        "<p>Place the desired text here in order to inform the user for the procedure which is in progress.</p>",
//        "<div id=\"progressbar\"></div>",
//        "</div>",
//        "</div>",
//        "</div>"].join(""))
//        .css({
//            "opacity": 0.15
//        })
//        .appendTo($.mobile.pageContainer)
//        .show(function () {
//            TolitoProgressBar('progressbar')
//                .setOuterTheme('d')
//                .setInnerTheme('b')
//                .isMini(true)
//                .setMax(100)
//                .setStartFrom(0)
//                .setInterval(10)
//                .showCounter(true)
//                .logOptions()
//                .build()
//                .run();
//        });
//    alert("after prog bar");
//
//    setTimeout(function () {
//        alert("in set timeout");
//        var pbDiv = document.getElementById("progressbar-overlay");
//        if (pbDiv != null)
//            pbDiv.parentNode.removeChild(pbDiv);
//    }, 2000);

//<!--<script src="js/jquery.mobile-1.3.2.min.js"></script>-->
<!--<style>-->
<!--input[type='file'] {-->
<!--background: rgb(0, 0, 0);-->
<!--border-radius: 5px;-->
<!--color: rgb(255, 255, 255);-->
<!--font-family: 'Lucida Grande';-->
<!--padding: 0px 0px 0px 0px;-->
<!--font-size: 16px;-->
<!--margin-bottom: 20px;-->
<!--width: 210px;-->
<!--vertical-align: top;-->
<!--margin-top: -2px;-->
<!--webkit-appearence: none;-->
<!--}-->
//<!--</style>-->

//alert("Starting upload...ajax")
//        $.ajax({
//            type: "POST",
//            url: "http://localhost:8080/tssvc/resourcesS/uploadloc",
//            data: 'file='+ event.target.files[0],
//            //data:'user='+ $('#user').val() +'&pass='+ $('#pass').val(),
//            cache: false,
//            success: function(data) {
//                //validate the response here, set variables... whatever needed
//                //and if credentials are valid, forward to the next page
//                alert ("in success");
//                alert("data: " + data);
//                //alert("data is" + data)   ;
//               // $.mobile.changePage("index.html");
//                //or show an error message
//            },
//            done: function (data) {
//                alert("done : " + data);
//            },
//            error: function(xhr, status, error) {
//                alert("in error");
//                alert("status: " + status) ;
//                alert("error: " + error);
//                alert(xhr.responseText);
//            }
//        })


//        var form = new FormData(),
//                xhr = new XMLHttpRequest();
//
//        form.append('file', event.target.files[0]);
//        xhr.open('post', 'http://localhost:8080/tssvc/resourcesS/uploadloc', true);
//        xhr.onreadystatechange=function() {
//            if (xhr.readyState==4) {
//                //alert the user that a response now exists in the responseTest property.
//                alert(xhr.responseText);
//                // And to view in firebug
//                console.log('xhr',xhr)
//            }
//        }
//        xhr.send(form);
//
//        alert("resp: " + xhr.response);
//        alert(" resp text: " + xhr.responseText);
//        alert("status : " + xhr.status)   ;
//        alert ("status text: " + xhr.statusText);


<!--<div id="testCapturePage" data-role="page" data-add-back-btn="true" data-back-btn-text="back" data-back-btn-theme="c">-->

<!--<div data-theme="c" data-role="header" >-->
<!--<h1>File Upload with Jersey</h1>-->
<!--</div> &lt;!&ndash; end of header &ndash;&gt;-->

<!--<div data-role="content">-->

<!--<p>I am the media test capture.</p>-->

<!--&lt;!&ndash;<form action="http://localhost:8080/tssvc/resourcesS/uploadloc" method="post" enctype="multipart/form-data">&ndash;&gt;-->
<!--&lt;!&ndash;<p>&ndash;&gt;-->
<!--&lt;!&ndash;Select a file : <input type="file" name="file" size="45" />&ndash;&gt;-->
<!--&lt;!&ndash;</p>&ndash;&gt;-->

<!--&lt;!&ndash;<input type="submit" value="Upload It" />&ndash;&gt;-->
<!--&lt;!&ndash;<br/>&ndash;&gt;-->
<!--&lt;!&ndash;</form>&ndash;&gt;-->

<!--Test Camera Capture <input type="file" capture accept="image/*" id="takePictureField" onchange="gotPic(event);">-->

<!--<img id="yourimage" heigth=100 width=100>-->
<!--<br/>-->

<!--&lt;!&ndash;Test Video Capture <input type="file" capture accept="video/*" id="takeVideoField" onchange="gotVid(event);">&ndash;&gt;-->
<!--&lt;!&ndash;<video id="yourvid" src="none" height=100 width=100> </video>&ndash;&gt;-->
<!--&lt;!&ndash;<br/>&ndash;&gt;-->
<!--&lt;!&ndash;Test Audio Capture <input type="file" capture="camera" accept="audio/*" id="takeAudioField" >&ndash;&gt;-->

<!--</div> &lt;!&ndash; end of content div &ndash;&gt;-->


<!--<script>-->

<!--var desiredWidth;-->

<!--$('#testCapturePage').live('pageinit', (function() {-->

<!--console.log("In live of testCapturePage");-->

<!--}));-->

<!--$('#testCapturePage').bind('pageinit', (function() {-->
<!--console.log("In bind of testCapturePage");-->

<!--}));-->


<!--$(document).bind('pageinit', (function() {-->

<!--console.log('in document bind live()');-->
<!--alert("in document bind live()");-->

<!--if(typeof(Storage)!=="undefined") {-->
<!--alert("Local Storage available");-->
<!--localStorage.setItem("name","Anna");-->
<!--localStorage.setItem("last","Taylor");-->

<!--alert("last name: " + localStorage.getItem("name"));-->
<!--}-->

<!--//$("#takePictureField").on("change",gotPic);-->
<!--//$("#takePictureField").onchange(gotPic);-->
<!--//$("#yourimage").load(getSwatches);-->
<!--desiredWidth = window.innerWidth;-->
<!--if(!("url" in window) && ("webkitURL" in window)) {-->
<!--window.URL = window.webkitURL;-->
<!--}-->

<!--}));-->


<!--//Credit: <a href="https://www.youtube.com/watch?v=EPYnGFEcis4&;feature=youtube_gdata_player">https://www.youtube.com/watch?v=EPYnGFEcis4&;feature=youtube_gdata_player</a>-->
<!--function gotPic(event) {-->
<!--alert ("in gotpic()");-->

<!--if(event.target.files.length == 1 &&-->
<!--event.target.files[0].type.indexOf("image/") == 0) {-->
<!--$("#yourimage").attr("src",URL.createObjectURL(event.target.files[0]));-->
<!--localStorage.setItem("file", URL.createObjectURL(event.target.files[0]));-->
<!--alert("after set item");-->
<!--//$.mobile.changePage("#testCapturePageAdd");-->
<!--}-->
<!--$.mobile.changePage('#testCapturePageAdd');-->
<!--}-->

<!--function gotVid(event) {-->
<!--alert ("in gotvid()");-->
<!--if(event.target.files.length == 1 &&-->
<!--event.target.files[0].type.indexOf("video/") == 0) {-->

<!--$("#yourvid").attr("src",URL.createObjectURL(event.target.files[0]));-->
<!--}-->
<!--}-->

<!--</script>-->
<!--</div>          &lt;!&ndash; end of testCapturePage page &ndash;&gt;-->
