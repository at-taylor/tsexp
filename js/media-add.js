var serviceMediaUploadURL = tsServiceURLDomain + "tssvc/resourcesS/upload";

console.log("mediaAddPage js: Executing media-add.js");

$(document).on('pagebeforeshow', '#mediaAddPage', function()
{

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

        var fileUrl = sessionStorage.getItem("fileUrl");
        var mediaId;
        if (Number(fileUrl.indexOf("http")) > 0)  {
           console.log("url contains http: " + fileUrl);
           mediaId = uploadFileFromUrl();
            console.log("id returned: " + mediaId)
        }
        else
           console.log("url does not contain http: " + fileUrl);
    });
});

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

                    updateMediaItem(respObj.id, $('#titleTxt').val(), $('#dateTxt').val(),$('#descrTxt').val(), 'test.html', document.getElementById('fileUploadTxt'));

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



