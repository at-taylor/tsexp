console.log("mediaEditPage: media-edit.js: Executing");

$(document).on('pageinit', '#mediaEditPage', function(){

    console.log("mediaEditPage: pageinit(): begin");
    console.log("mediaEditPage: Attempting to retrieve categories from cache");
    var categoryArray = JSON.parse(sessionStorage.getItem("appCacheCatIds"));

    if (categoryArray == null) {
        console.log("mediaEditPage: Category cache entries are null.  Need to rebuild cache.")     ;
        appCacheCategoryList("appCacheCat");
    }
    else
        console.log("mediaEditPage: Categories succesfully retrieved from cache");

    $('#mediaEditDateSwitch').change(function() {

        console.log("mediaEditPage: mediaEditDateSwitchChange()");

        var myswitch = $(this);
        var show     = myswitch[0].selectedIndex == 1 ? true:false;

        if(show) {

            $('#mediaEditApxDateDiv').fadeIn('slow');
            $('#mediaEditExactDateDiv').fadeOut();
        } else {

            $('#mediaEditExactDateDiv').fadeIn('slow');
            $('#mediaEditApxDateDiv').fadeOut();
        }
    });

    console.log("mediaEditPage: pageinit(): end");
});


function flipEditMediaDateSwitch (val) {

    console.log("mediaEditPage: flipEditMediaDateSwitch: " + val);

    if(val == "0") {

        $('#mediaEditApxDateDiv').fadeIn('slow');
        $('#mediaEditExactDateDiv').fadeOut();
    } else {

        $('#mediaEditExactDateDiv').fadeIn('slow');
        $('#mediaEditApxDateDiv').fadeOut();
    }
}


$(document).on('pagebeforeshow', '#mediaEditPage', function(){

    console.log('mediaEditPage: pagebeforeshow(): start');

    // Initialize any buttons to initial state
    console.log('mediaEditPage: pagebeforeshow(): Initialize buttons');
    $('#editBtn').button('enable');
    $('#cancelEditBtn').button('enable');
    $('#editConfirmPopLink').removeClass('ui-disabled');
    $('#mediaEditBackBtn').removeClass('ui-disabled');
    $('#mediaEditHomeBtn').removeClass('ui-disabled');

    //var mediaId = getUrlVars() ["id"];
    console.log('mediaEditPage: pagebeforeshow(): checking in-process flag');

    var inProcessFlag = sessionStorage.getItem("mediaEditProcessFlag");
    if (inProcessFlag == "true")     {
        console.log('mediaEditPage: in-process.  Returning');
        return;
    }
    console.log('mediaEditPage: pagebeforeshow(): continuing');
    sessionStorage.setItem("mediaEditProcessFlag", "true");

    // AN EDIT PAGE SEQUENCE OF EVENTS

    // 1. Get the id of what is being editing - retrieve parameter from session storage.  There were caching issues potentially with getting id from querystring
    var mediaId = sessionStorage.getItem("mediaEditId");
    if (mediaId == null)   {              // if the id is missing return to a logical page, no point in proceeding
        console.log("missing mediaId....changing page");
        var newPage = 'media-library-grid.html';
        $.mobile.changePage(newPage);

    }
    console.log ("mediaEditPage: pagebeforeshow(): Sucessfully called with media id=" + mediaId);

    // 2.  Wipe out any previous values in the fields prior to the dynamic content load below
    $('#editTitleTxt').val("");
    $('#editDateTxt').val("");
    $('#editDescrTxt').val("");
    //$('#editImage').attr("src", "");
    $('#mediaEditMediaContainer').html("");
    $('#editErrorTxt').val("");
    $('#mediaEditDateTxt').val("");
    $('#mediaEditApxDateTxt').val("");
    $('#mediaEditDateSwitch').val("0").slider("refresh");



    //4.  Get the content of what is being edited
    var categoryResultArray = new Array();
    $.getJSON(tsServiceURLDomain + "tssvc/resourcesS/media" + '/' + mediaId, function(data) {

        console.log("mediaEditPage: Title : " + data.title);
        console.log("mediaEditPage: Created : " + data.mediaDateRaw);
        console.log("mediaEditPage: Descr : " + data.descr);

        // Build array of selected categories, use to set the 'selected' values
        var iItr = 0;
        for(var i in data.categoryList)    {
            //console.log("index: " + iItr);
            //console.log("value: " + i)  ;
            categoryResultArray.push([i])  ;
            iItr = Number(iItr) + 1;
        }
        //refresh title
        $('#editTitleTxt').val(data.title);

        //refresh date
        var dateValue = data.mediaDateRaw;
        console.log("mediaEditPage: Date Raw: " + dateValue);
        //console.log("date length: " + dateValue.length)
        if (dateValue != null) {  // if date is missing just leave the page defaults
            var dateValueAsXDate = new XDate(dateValue);
            console.log(" xDate Valid result: " + dateValueAsXDate.valid());
            console.log(" length check      : " + dateValue.length);
            if (dateValueAsXDate.valid() && (dateValue.length > 4)) {   // this is a legitimate date
                $('#mediaEditDateTxt').val(dateValue);
                console.log("IN VALID DATE");
                $('#mediaEditDateSwitch').val("0").slider("refresh");
                flipEditMediaDateSwitch("1");
            } else
                if ((!isNaN(dateValue)) && (dateValue.length == 4)) {
                    console.log("IN VALID YEAR");
                    $('#mediaEditApxDateTxt').val(dateValue);
                    $('#mediaEditDateSwitch').val("1").slider("refresh");
                    flipEditMediaDateSwitch("0");
                }
        }

//
//        if ((dateValue != null)    && (dateValue != ""))    {
//            console.log("mediaEditPage: Date Raw Length: " + dateValue.length);
//            if (dateValue.length == 10)  {
//                $('#mediaEditDateTxt').val(dateValue);
//                $('#mediaEditDateSwitch').val("0").slider("refresh");  //exact date
//                console.log("mediaEditPage: Setting date switch exact.");
//            }
//            else if (dateValue.length == 4) {
//                $('#mediaEditApxDateTxt').val(dateValue);
//                $('#mediaEditDateSwitch').val("1").slider("refresh");  //non-exact date
//                console.log("mediaEditPage: Setting date switch non-exact.");
//            }
//        }   else
//        console.log("mediaEditPage: Date not present.");

        $('#editDescrTxt').val(data.descr);
        //$('#editImage').attr("src", data.url);
        var videoOrImageTag;
        var theFileType = data.fileType;
        var theFileUrl = data.url;
        if ((theFileType == "mp4")   || (theFileType == "mov") || (theFileType == "MOV"))
            videoOrImageTag = "<video width=320 poster='img/navbut/blank-video.jpg' controls src='" + theFileUrl + "'></video>"
        else
            videoOrImageTag =  '<img width=320 src= '+ theFileUrl +'>';
        //image/mov
        console.log("mediaEditPage: video/image tag: " + videoOrImageTag);
        $('#mediaEditMediaContainer').append(videoOrImageTag);

        //data.recordingUrl;
        console.log("mediaEditPage: destroy and recreate JPlayer");
        var audioFileName = data.recordingUrl;
        if (audioFileName == null)
            audioFileName = "no.wav";
        $('#jquery_jplayer_mediaEdit').jPlayer( "destroy" );
        $('#jquery_jplayer_mediaEdit').jPlayer({
            ready: function (event) {
                console.log("mediaEditPage: in JPlayer ready function")     ;
                $(this).jPlayer("setMedia", {
//                        m4a:"http://www.jplayer.org/audio/m4a/TSP-01-Cro_magnon_man.m4a",
//                        oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg"
                    wav: audioFileName
                }).jPlayer("play");
            },
            swfPath: "js",
            //supplied: "m4a, oga",
            supplied: "wav",
            wmode: "window",
            smoothPlayBar: true,
            keyEnabled: true
        });

        console.log("mediaEditPage: pagebeforeshow(): Pull Categories");
        var categoryArray = JSON.parse(sessionStorage.getItem("appCacheCatIds"));
        $('#editCategoryList option').remove();
        for (i = 0; i < categoryArray.length; i++) {
            var catDescr = sessionStorage.getItem("appCacheCat" + categoryArray[i]);
            //console.log("mediaEditPage: category id/descr pull id: " + categoryArray[i] + " descr: " + catDescr);
            var optionListItem = "<option value='" + categoryArray[i] + "'>" + catDescr + "</option>";
            $('#editCategoryList').append(optionListItem);
        }
        $('#editCategoryList').selectmenu("refresh", true);

        console.log("mediaEditPage: pagebeforeshow(): Start: Preselect already selected category options for this media item.");
        for(i = 0; i < categoryResultArray.length; i++) {
            //console.log("value at index: " + i + " is " + categoryResultArray[i] )
            $("#editCategoryList option[value='"+categoryResultArray[i]+"']").attr('selected', 'selected');
        }
        $('#editCategoryList').selectmenu("refresh", true);
        console.log("mediaEditPage: pagebeforeshow(): End: Preselect already selected category options for this media item.");

        console.log("mediaEditPage: pagebeforeshow(): end");

    });

    // 5.  Attach event handlers remembering to unset them first

    // Must unload the event handler first to avoid multiple click event handlers firing when the page is loaded multiple times
    $(document).off('click', '#editBtn').on('click', '#editBtn',function(event) {

        console.log("mediaEditPage: editBtn.click(): for id of: " + mediaId);

        var theActiveEditMediaId = sessionStorage.getItem("mediaEditId");

        console.log("mediaEditPage: editBtn.click(): integrity checking of current active: " + theActiveEditMediaId);

        if (mediaId != theActiveEditMediaId)   {
            console.log("mediaEditPage: editBtn.click(): integrity checking failed, returning. ");
            return;
        }

        //$('[type="submit"]').button('disable');
        $('#editBtn').button('disable');

        var selectedValsArray = $('#editCategoryList').val();
        console.log("mediaEditPage: editBtn.click(): selected Category Array" + selectedValsArray);
        var jsonStringArr = JSON.stringify(selectedValsArray);
        console.log("mediaEditPage: editBtn.click():  selected Category Array as JSON" + jsonStringArr);

        var theTime = new Date().getTime();
       // var newPage = 'media-library-grid.html?nocache=' + theTime;
        var newPage = 'media-library-grid.html';

        sessionStorage.setItem("mediaEditProcessFlag", "false");

        // sort out date value to pass in update
        var dateValue;
        if ($('#mediaEditDateSwitch').val() == "0")
            dateValue = $('#mediaEditDateTxt').val();
        else
            dateValue = $('#mediaEditApxDateTxt').val();
        console.log("mediaEditPage: editBtn.click():  Data Value for Update: " + dateValue);
        updateMediaItem(mediaId, $('#editTitleTxt').val(), dateValue,$('#editDescrTxt').val(), jsonStringArr, null, newPage, document.getElementById('editErrorTxt'), document.getElementById('editErrorTxt'));

    });

    // Must unload the event handler first to avoid multiple click event handlers firing when the page is loaded multiple times
    $(document).off('click', '#cancelEditBtn').on('click', '#cancelEditBtn',function(event) {
   // $('#cancelEditBtn').click(function(event) {

        console.log("mediaEditPage: cancelBtn.click()");

       // $('[type="submit"]').button('disable');
        $('#cancelEditBtn').button('disable');
        sessionStorage.setItem("mediaEditProcessFlag", "false");
        //removeMediaItemStorage();

        var theTime = new Date().getTime();
        //var newPage = 'media-library-grid.html?nocache=' + theTime;
        var newPage = 'media-library-grid.html';
        $.mobile.changePage(newPage);

    });

    $(document).off('click', '#mediaEditHomeBtn').on('click', '#mediaEditHomeBtn',function(event) {

        console.log("mediaEditPage: mediaEditHomeBtn.click()");

        $('#mediaEditHomeBtn').addClass('ui-disabled');
        sessionStorage.setItem("mediaEditProcessFlag", "false");

        $.mobile.changePage('tsnav.html');

    });

    $(document).off('click', '#mediaEditBackBtn').on('click', '#mediaEditBackBtn',function(event) {

        console.log("mediaEditPage: mediaEditBackBtn.click()");

        $('#mediaEditBackBtn').addClass('ui-disabled');
        sessionStorage.setItem("mediaEditProcessFlag", "false");

        $.mobile.changePage('media-library-grid.html');

    });

});    // end of pagebeforeshow

function getUrlVars() {

    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}