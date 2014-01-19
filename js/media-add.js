
console.log("mediaAddPage js: Executing media-add.js");

$(document).on('pageinit', '#mediaAddPage', function() {


    $('#mediaAddDateSwitch').change(function() {
        var myswitch = $(this);
        var show     = myswitch[0].selectedIndex == 1 ? true:false;

        if(show) {

            $('#mediaAddApxDateDiv').fadeIn('slow');
            $('#mediaAddExactDateDiv').fadeOut();
        } else {

            $('#mediaAddExactDateDiv').fadeIn('slow');
            $('#mediaAddApxDateDiv').fadeOut();
        }
    });
});

$(document).on('pagebeforeshow', '#mediaAddPage', function()
{
//    console.log( $.mobile.urlHistory.stack );
    console.log("mediaAddPage: pagebeforeshow()");

    audioInitialize("audioStartRecID", "audioStopRecID", "audioMediaAudioPlayCtl", "jquery_jplayer_1", "audioRecStatusID", "audioRecPos","fileAudioUrl", "audioJsDebugArea");

//    function audioInitialize(_audioStartRecFieldId, _audioStopRecFieldId, _audioPlayerFieldId, _audioJPlayerFieldId,
//                             _audioRecordStatusDiv, _audioRecordStatusCounterDiv, _audioPlayerUrlSessionKeyName, _audioDebugFieldId

    // AN ADD PAGE SEQUENCE OF EVENTS

    // 1. Reset input fields to initialized state to unset any cached content prior to dynamic content load
    $('#mediaAddTitleTxt').val("");
    $('#mediaAddDateTxt').val("");
    $('#mediaAddApxDateTxt').val("");
    $('#mediaAddDescrTxt').val("");
    $('#mediaAddImage').attr("src", "");
    $("#audioFileInfoTxt").val("");
    $("#fileInfoTxt").val("");
    $("#fileLocTxt").val("");
    $('#audioJsDebugArea').val("");
    $('#audioRecStatusID').html("");
    $('#audioRecPos').html("");

    // 2, Reset buttons to initialized state
    $('#uploadBtn').button('enable');
    $('#cancelBtn').button('enable');
    $('#uploadConfirmPopLink').removeClass('ui-disabled');
    $('#uploadCancelPopLink').removeClass('ui-disabled');


    // 3a. Load Dynamic content
    console.log("mediaAddPageAdd: starting category load");
    setCategoryList(document.getElementById('categoryList'));


    // 3b. Load content from session state (if applicable)
    $("#mediaAddImage").attr("src",sessionStorage.getItem("fileUrl"));
    var theFileInfo = "Name: " + sessionStorage.getItem("fileName") + " Type: " + sessionStorage.getItem("fileType") +
        " Size: " + sessionStorage.getItem("fileSize") + " Date: " + sessionStorage.getItem("fileDate");
    $("#fileInfoTxt").val(theFileInfo);
    var theFileLoc = "Loc: " + sessionStorage.getItem("fileUrl");
    $("#fileLocTxt").val(theFileLoc);

    // 4. Set any button event handlers remembering to unset them first

    // Must unload the event handler first to avoid multiple click event handlers firing when the page is loaded multiple times
    $(document).off('click', '#uploadBtn').on('click', '#uploadBtn',function(event) {
        console.log("mediaAddPageAdd: uploadBtn.click()");

        $('#uploadBtn').button('disable');
        $('#cancelBtn').button('disable');
        $('#uploadConfirmPopLink').addClass('ui-disabled');
        $('#uploadCancelPopLink').addClass('ui-disabled');

        var fileUrl = sessionStorage.getItem("fileUrl");
        var mediaId;
        if (Number(fileUrl.indexOf("http")) > 0)  {
           console.log("url contains http: " + fileUrl);
           uploadFileFromUrl();
            console.log("id returned: " + mediaId)
        }
        else   {
           console.log("url does not contain http: " + fileUrl);
           uploadFileFromFileHandle () ;
        }
    });

    $(document).off('click', '#cancelBtn').on('click', '#cancelBtn',function(event) {
   // $('#cancelBtn').click(function(event) {

        console.log("mediaAddPageAdd: cancelBtn.click()");

        $('#cancelBtn').button('disable');
        $('#uploadBtn').button('disable');
        $('#uploadConfirmPopLink').addClass('ui-disabled');
        $('#uploadCancelPopLink').addClass('ui-disabled');

        removeMediaItemStorage();
        $.mobile.changePage('media-capture.html');

    });

});

function uploadFileFromFileHandle ()
{
    console.log("mediaAddPageAdd: uploadFileFromFileHandle()");

    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName= sessionStorage.getItem("fileName");
    options.mimeType=sessionStorage.getItem("fileType");

    var params = {};
    params.value1 = "test";
    params.value2 = "param";
    options.params = params;

    statusDom = document.querySelector('#mediaAddStatus');
    statusDom.innerHTML = "";
    var ft = new FileTransfer();
    ft.onprogress = function(progressEvent) {
        if (progressEvent.lengthComputable) {
            var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
            statusDom.innerHTML = perc + "% loaded...";
        } else {
            if(statusDom.innerHTML == "") {
                statusDom.innerHTML = "Loading";
            } else {
                statusDom.innerHTML += ".";
            }
        }
    };
    var imageURI = sessionStorage.getItem("fileUrl");
    ft.upload(imageURI, encodeURI(tsServiceURLDomain + "tssvc/resourcesS/upload"), fileok, filefail, options);

}
function fileok(r) {
   var theResp = "Success. Code = " + r.responseCode + " Resposne = " + r.response + " sent = " + r.byteSent;
    $("#fileUploadTxt").attr("value",theResp);

    var respObj = JSON.parse(r.response);
    var selectedValsArray = $('#categoryList').val();
    console.log("mediaAddPageAdd: fileOK(): selected Category Array" + selectedValsArray);

    var jsonStringArr = JSON.stringify(selectedValsArray);
    console.log("mediaAddPageAdd: fileOK(): selected Category Array as JSON" + jsonStringArr);

    var theTime = new Date().getTime();
    //var newPage = 'media-library-grid.html?nocache=' + theTime;
    var newPage=    'media-capture.html';
    var dateForSvc = null;
    if ($('#mediaAddDateSwitch').val() == 0)       // exact
        dateForSvc = $('#mediaAddDateTxt').val();
    else
        dateForSvc = $('#mediaAddApxDateTxt').val();

    updateMediaItem(respObj.id, $('#mediaAddTitleTxt').val(), dateForSvc,$('#mediaAddDescrTxt').val(), jsonStringArr, sessionStorage.getItem("fileAudioUrl"), newPage,
        document.getElementById('fileUploadTxt'), document.getElementById('audioFileInfoTxt'));

    //removeMediaItemStorage();

    navigator.camera.cleanup(function() { console.log("Camera cleanup success.")}, function(message) { console.log("Camera cleanup failed.")});
}


function filefail(error) {

    var theResp = "Error. Code = " + error.code + " source = " + error.source + " target = " + error.target;
    $("#fileUploadTxt").attr("value",theResp);
    //alert("An error has occurred: Code = " + error.code);
    //console.log("upload error source " + error.source);
    //console.log("upload error target " + error.target);
}

function uploadFileFromUrl() {

    console.log("mediaAddPageAdd: uploadFileFromUrl()");
    //var values = $('#categoryList').val();

    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', sessionStorage.getItem("fileUrl"), true);
    xhr2.responseType = 'blob';
    xhr2.onload = function(e) {
        if (this.status == 200) {
            console.log("mediaAddPageAdd: uploadFileFromUrl(): successful retrieval of blob");
            var theBlob = this.response;

            var form = new FormData(),
                xhr = new XMLHttpRequest();
            var theFileName = sessionStorage.getItem("fileName");
            if (theFileName == null)
                theFileName = "uploadedFile";

            console.log("mediaAddPageAdd: uploadFileFromUrl():attempting to upload file name: " + theFileName);
            form.append('file', theBlob, theFileName);
            xhr.open('post', tsServiceURLDomain + "tssvc/resourcesS/upload", true);
            xhr.onreadystatechange=function() {
                if (xhr.readyState==4) {

                    removeMediaItemStorage();

                    console.log("mediaAddPageAdd: uploadFileFromUrl():file upload response: " + xhr.responseText);
                    var respObj = JSON.parse(xhr.responseText)  ;
                    console.log("mediaAddPageAdd: uploadFileFromUrl():file assigned media id: " + respObj.id);

                    var theResp = "Resp Text: " + xhr.responseText + " Status: " + xhr.status + " Status Text: " + xhr.statusText;
                    $("#fileUploadTxt").attr("value",theResp);
                    URL.revokeObjectURL(sessionStorage.getItem("fileUrl"))   ;

                    var selectedValsArray = $('#categoryList').val();
                    console.log("mediaAddPageAdd: uploadFileFromUrl(): selected Category Array" + selectedValsArray);
                    var jsonStringArr = JSON.stringify(selectedValsArray);
                    console.log("mediaAddPageAdd: uploadFileFromUrl: selected Category Array as JSON" + jsonStringArr);

                    var theTime = new Date().getTime();
                    //var newPage = 'media-library-grid.html?nocache='+ theTime;
                    var newPage = 'media-capture.html';
                    console.log("mediaAddPageAdd: uploadFileFromUrl(): calling update media with page change of :" + newPage);
                    var dateForSvc = null;
                    if ($('#mediaAddDateSwitch').val() == 0)       // exact
                        dateForSvc = $('#mediaAddDateTxt').val();
                    else
                        dateForSvc = $('#mediaAddApxDateTxt').val();
                    updateMediaItem(respObj.id, $('#mediaAddTitleTxt').val(), dateForSvc, $('#mediaAddDescrTxt').val(), jsonStringArr,  sessionStorage.getItem("fileAudioUrl"), newPage,
                        document.getElementById('fileUploadTxt'), document.getElementById('audioFileInfoTxt'));



                }
            }
            xhr.send(form);

        }
    };
    console.log("the xhr2 request");
    console.log(xhr2);
    xhr2.send();

    $( "#uploadConfirm" ).popup( "close" );

}




