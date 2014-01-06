var serviceMediaUploadURL = tsServiceURLDomain + "tssvc/resourcesS/upload";
//var serviceCategoryURL = tsServiceURLDomain + "tssvc/resourcesS/categories";

console.log("mediaAddPage js: Executing media-add.js");

//function setCategoryList(element) {
//
//    console.log("json-common: setCategoryList() for element id: " + element.id);
//
//    var jQName = '#' + element.id;
//
//    $.getJSON(serviceCategoryURL, function(data) {
//        cat = data.categoryModelList;
//
//        $.each(cat, function(index, item) {
//
//            var optionListItem = "<option value='" + item.categoryId + "'>" +item.categoryDescr + "</option>";
//            //console.log("option Item: " + optionListItem);
//            $(jQName).append("<option value='" + item.categoryId + "'>" +item.categoryDescr + "</option>");
//        });
//        $(jQName).selectmenu("refresh", true);
//    });
//
//}



$(document).on('pagebeforeshow', '#mediaAddPage', function()
{
//    console.log("stack");
//    console.log( $.mobile.urlHistory.stack );


    console.log("mediaAddPage: pagebeforeshow()");
//    if (sessionStorage.getItem("fileUrl") == null) { // page access thru a back button
//        console.log("mediaAddPage: pagebeforeshow(): accessed with null");
//        console.log("mediaAddPage: pagebeforeshow(); going back in history to:")
//        console.log($.mobile.urlHistory.activeIndex-1);
//        console.log($.mobile.urlHistory.stack[$.mobile.urlHistory.activeIndex-1]);
//        $.mobile.changePage($.mobile.urlHistory.stack[$.mobile.urlHistory.activeIndex-1].pageUrl)
//    }

    console.log("mediaAddPageAdd: starting category load");
    setCategoryList(document.getElementById('categoryList'));

    $("#theImage").attr("src",sessionStorage.getItem("fileUrl"));
    var theFileInfo = "Name: " + sessionStorage.getItem("fileName") + " Type: " + sessionStorage.getItem("fileType") +
        " Size: " + sessionStorage.getItem("fileSize") + " Date: " + sessionStorage.getItem("fileDate");
    $("#fileInfoTxt").attr("value",theFileInfo);
    var theFileLoc = "Loc: " + sessionStorage.getItem("fileUrl");
    $("#fileLocTxt").attr("value",theFileLoc);

    $('#uploadBtn').click(function(event) {
        console.log("mediaAddPageAdd: uploadBtn.click()");

        $('[type="submit"]').button('disable');

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

    $('#cancelBtn').click(function(event) {

        console.log("mediaAddPageAdd: cancelBtn.click()");

        $('[type="submit"]').button('disable');

        removeMediaItemStorage();

        $.mobile.changePage('media-capture.html',{
            transition: "pop",
            reverse: false,
            changeHash: false
        });

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
    ft.upload(imageURI, encodeURI(serviceMediaUploadURL), fileok, filefail, options);

}
function fileok(r) {
   var theResp = "Success. Code = " + r.responseCode + " Resposne = " + r.response + " sent = " + r.byteSent;
    $("#fileUploadTxt").attr("value",theResp);

    var respObj = JSON.parse(r.response);
    var selectedValsArray = $('#categoryList').val();
    console.log("mediaAddPageAdd: fileOK(): selected Category Array" + selectedValsArray);

    var jsonStringArr = JSON.stringify(selectedValsArray);
    console.log("mediaAddPageAdd: fileOK(): selected Category Array as JSON" + jsonStringArr);

    var newPage = 'media-library-grid.html?nocache='+new Date().getTime();
    updateMediaItem(respObj.id, $('#titleTxt').val(), $('#dateTxt').val(),$('#descrTxt').val(), jsonStringArr, newPage, document.getElementById('fileUploadTxt'));

    removeMediaItemStorage();

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
            xhr.open('post', serviceMediaUploadURL, true);
            xhr.onreadystatechange=function() {
                if (xhr.readyState==4) {

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


                    var newPage = 'media-library-grid.html?nocache='+new Date().getTime();
                    updateMediaItem(respObj.id, $('#titleTxt').val(), $('#dateTxt').val(),$('#descrTxt').val(), jsonStringArr, newPage, document.getElementById('fileUploadTxt'));

                    removeMediaItemStorage();

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
        //$.mobile.changePage('testadd.html');
        //alert("Starting upload...ajax")
//                  $.ajax({
//                      type: "POST",
//                      url: "http://localhost:8080/tssvc/resourcesS/uploadloc",
//                      //data: form,
//                      data: 'file='+ theFile,
//                      //data:'user='+ $('#user').val() +'&pass='+ $('#pass').val(),
//                      cache: false,
//                      contentType: false,
//                      processData: false,
//                      success: function(data) {
//                          //validate the response here, set variables... whatever needed
//                          //and if credentials are valid, forward to the next page
//                          alert ("in success");
//                          alert("data: " + data);
//                          //alert("data is" + data)   ;
//                          // $.mobile.changePage("index.html");
//                          //or show an error message
//                      },
//                      done: function (data) {
//                          alert("done : " + data);
//                      },
//                      error: function(xhr, status, error) {
//                          alert("in error");
//                          alert("status: " + status) ;
//                          alert("error: " + error);
//                          alert(xhr.responseText);
//                      }
//                   })



