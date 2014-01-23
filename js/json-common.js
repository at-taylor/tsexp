function appCacheConsol(prefix) {

    console.log("json-common: appCacheConsol(): start");

    var starterCatPrefix = prefix + "StarterCat";
    var starterCategoryStorageIdName = starterCatPrefix + "Ids";
    sessionStorage.removeItem(starterCategoryStorageIdName);

    var startersCatIdArr = new Array();
    $.getJSON(tsServiceURLDomain + "tssvc/resourcesS/stories/starters/categories/", function(data) {

        categories = data.storyStarterCategoryModelList;
        $.each(categories, function(index, category) {

            startersCatIdArr.push(category.starterCategoryId);

            console.log("json-common: appCacheStoryStarterCategoryList: item: " + category.starterCategoryId + " descr: " + category.starterCategoryTitle);
            sessionStorage.removeItem(starterCatPrefix + category.starterCategoryId );
            sessionStorage.setItem(starterCatPrefix + category.starterCategoryId , category.starterCategoryTitle);


        });

        sessionStorage.setItem(starterCategoryStorageIdName, JSON.stringify(startersCatIdArr));

        console.log("json-common: appCacheStoryStarterCategoryList(): story starter category id: " + sessionStorage.getItem(starterCategoryStorageIdName));
        console.log("json-common: appCacheStoryStarterCategoryList(): story starter category id (parsed): " + JSON.parse(sessionStorage.getItem(starterCategoryStorageIdName)));

        // done with starters so now do categories

        var catPrefix = prefix + "Cat";
        var categoryStorageIdName = catPrefix+ "Ids";
        sessionStorage.removeItem(categoryStorageIdName);

        $.getJSON(tsServiceURLDomain + "tssvc/resourcesS/categories", function(data) {
            var categoryIdArray = new Array();
            cat = data.categoryModelList;

            $.each(cat, function(index, item) {
                //$("option[value='" + item.categoryId + "'']").remove ();     // remove option if already exists
                console.log("json-common: appCacheCategoryList: item: " + item.categoryId + " descr: " + item.categoryDescr);
                sessionStorage.removeItem(catPrefix + item.categoryId);
                sessionStorage.setItem(catPrefix + item.categoryId, item.categoryDescr);
                categoryIdArray.push(item.categoryId);

            });
            sessionStorage.setItem(categoryStorageIdName, JSON.stringify(categoryIdArray));
            console.log("json-common: appCacheCategoryList(): category array: " + sessionStorage.getItem(categoryStorageIdName));

            $('#login_submit').removeClass('ui-disabled');
            console.log("json-common: appCacheConsol(): end");
        });

    });
}

function appCacheStoryStarterCategoryList(prefix) {

    console.log("json-common: appCacheStoryStarterCategoryList(): start");

    var starterCategoryStorageIdName = prefix + "Ids";
    sessionStorage.removeItem(starterCategoryStorageIdName);

    var startersCatIdArr = new Array();
    $.getJSON(tsServiceURLDomain + "tssvc/resourcesS/stories/starters/categories/", function(data) {

        categories = data.storyStarterCategoryModelList;
        $.each(categories, function(index, category) {

            startersCatIdArr.push(category.starterCategoryId);

            console.log("json-common: appCacheStoryStarterCategoryList: item: " + category.starterCategoryId + " descr: " + category.starterCategoryTitle);
            sessionStorage.removeItem(prefix + category.starterCategoryId );
            sessionStorage.setItem(prefix + category.starterCategoryId , category.starterCategoryTitle);


        });

        sessionStorage.setItem(starterCategoryStorageIdName, JSON.stringify(startersCatIdArr));

        console.log("json-common: appCacheStoryStarterCategoryList(): story starter category id: " + sessionStorage.getItem(starterCategoryStorageIdName));
        console.log("json-common: appCacheStoryStarterCategoryList(): story starter category id (parsed): " + JSON.parse(sessionStorage.getItem(starterCategoryStorageIdName)));

    });


    console.log("json-common: appCacheStoryStarterCategoryList(): end");

}

function appCacheCategoryList(prefix) {

    console.log("json-common: appCacheCategoryList()");

    var categoryStorageIdName = prefix + "Ids";
    sessionStorage.removeItem(categoryStorageIdName);

    $.getJSON(tsServiceURLDomain + "tssvc/resourcesS/categories", function(data) {
        var categoryIdArray = new Array();
        cat = data.categoryModelList;

        $.each(cat, function(index, item) {
            //$("option[value='" + item.categoryId + "'']").remove ();     // remove option if already exists
            console.log("json-common: appCacheCategoryList: item: " + item.categoryId + " descr: " + item.categoryDescr);
            sessionStorage.removeItem(prefix + item.categoryId);
            sessionStorage.setItem(prefix + item.categoryId, item.categoryDescr);
            categoryIdArray.push(item.categoryId);

        });
        sessionStorage.setItem(categoryStorageIdName, JSON.stringify(categoryIdArray));
        console.log("json-common: appCacheCategoryList(): category array: " + sessionStorage.getItem(categoryStorageIdName));
    });

}

function setCategoryList(element) {

    console.log("json-common: setCategoryList() for element id: " + element.id);

    var jQName = '#' + element.id;

    $.getJSON(tsServiceURLDomain + "tssvc/resourcesS/categories", function(data) {
        cat = data.categoryModelList;

        $(jQName + ' option').remove();       // clear previous entries
        $.each(cat, function(index, item) {
            //$("option[value='" + item.categoryId + "'']").remove ();     // remove option if already exists

            var optionListItem = "<option value='" + item.categoryId + "'>" +item.categoryDescr + "</option>";
            //console.log("option Item: " + optionListItem);
            $(jQName).append(optionListItem);
        });
        $(jQName).selectmenu("refresh", true);
    });

}

function yearDateEdit (dateCtl, dialogCtl) {

    var jDateCtl = '#' + dateCtl;
    var jDialogCtl =  '#' + dialogCtl;
    
    var xdateDate = new XDate();

    // see if not a number
    if (isNaN($(jDateCtl).val())) {
        $(jDateCtl).val("");
        $(jDialogCtl).popup( "open" )     ;
        return;
    }
    if ($(jDateCtl).val().length != 4) {
        $(jDateCtl).val("");
        $(jDialogCtl).popup( "open" )  ;
        return;
    }
    var dateNumber = Number($(jDateCtl).val());
    if ((dateNumber < 1800) || (dateNumber > xdateDate.getFullYear()))   {
        $(jDateCtl).val("");
        $(jDialogCtl).popup( "open" )   ;
        return;
    }
}


function fullDateEdit(dateCtl, dialogCtl) {

    var jDateCtl = '#' + dateCtl;
    var jDialogCtl =  '#' + dialogCtl;
    
    var xdateDate = new XDate($(jDateCtl).val());
    var xdateToday = new XDate();

    if (!xdateDate.valid()) {
        $(jDateCtl).val("");
        $(jDialogCtl).popup( "open" )     ;
        return;
    }

    if ((xdateDate.getFullYear < 1800) || (xdateDate.getFullYear() > xdateToday.getFullYear())) {
        $(jDateCtl).val("");
        $(jDialogCtl).popup( "open" )     ;
        return;
    }

    if (xdateDate.getFullYear() != xdateToday.getFullYear())
        return;

    if (xdateDate.getMonth() > xdateToday.getMonth())   {
        $(jDateCtl).val("");
        $(jDialogCtl).popup( "open" )  ;
        return;
    }

    if (xdateDate.getMonth() != xdateToday.getMonth())
        return;


    if (xdateDate.getDay() > xdateToday.getDay())   {
        $(jDateCtl).val("");
        $(jDialogCtl).popup( "open" )  ;
        return;
    }
}

function updateMediaItem(mediaId, mediaTitle, mediaDate, mediaDescr, mediaCategories, mediaAudioUrl, changePageTo, errorElement, audioErrorElement) {

    console.log("json-common: updateMediaItem() for media item id: " + mediaId);

    var jQErrorName = '#' + errorElement.id;
    var jQErrorAudio = '#' + audioErrorElement.id;

    $.ajax({
        type: "POST",
        url: tsServiceURLDomain + "tssvc/resourcesS/media" + "/" + mediaId,
        data:'mediaTitle='+ mediaTitle +'&mediaDate='+ mediaDate +'&mediaDescr='+ mediaDescr +'&catList='+ mediaCategories,
        cache: false,
        success: function(data) {
            console.log("json-common: updateMediaItem(): success: data=" + data.id);
            console.log("json-common: updateMediaItem(): success: value of mediaAudioUrl: " + mediaAudioUrl);
            console.log("json-common: updateMediaItem(): success: value pf changePageTo: " + changePageTo)
            if (mediaAudioUrl == null) {
                console.log("json-common: updateMediaItem(): no media audio file to upload.");
                removeMediaItemStorage();
                if (changePageTo != null)
                    $.mobile.changePage(changePageTo);
                return;
            }
            $(jQErrorAudio).val("Beginning audio upload for id= " + mediaId + " file: " + mediaAudioUrl + " ");

            var options = new FileUploadOptions();
            options.fileKey="file";
//            options.fileName= mediaAudioUrl.substr(mediaAudioUrl.lastIndexOf('/') + 1);
            options.fileName="audio.wav";
            options.mimeType="audio/wav";

            var params = {};
            params.value1 = "test";
            params.value2 = "param";
            options.params = params;

            var ft = new FileTransfer();
            // error checking needed here
            ft.upload(mediaAudioUrl, encodeURI(tsServiceURLDomain + "tssvc/resourcesS/media/audio/" + mediaId), function(fileUploadResult) {
                $(jQErrorAudio).val($(jQErrorAudio).val() + " success: " + fileUploadResult.response);
                removeMediaItemStorage();
                if (changePageTo != null)
                    $.mobile.changePage(changePageTo);
            }, function(error) {
                $(jQErrorAudio).val($(jQErrorAudio).val() + " code= " + error.code + " src = " + error.source + " target= " + error.target);

            }, options);

        },
        error: function(xhr, status, error) {

            console.log("json-common: updateMediaItem(): error: resp=" + xhr.responseText);
            console.log("json-common: updateMediaItem(): error: status=" + status);
            console.log("json-common: updateMediaItem(): error: error=" + error);
            $(jQErrorName).val(xhr.responseText);
            //alert("There was a problem adding this media.  Please check your connection and try again.");
//            alert("status: " + status) ;
//            alert("error: " + error);
//            alert(xhr.responseText);
            //$.mobile.changePage("index.html");
        }
    })   ;


}

function removeMediaItemStorage() {

    console.log("json-common: removeMediaItemStorage()");

    var theFile = sessionStorage.getItem("fileAudioUrl");

//    if (theFile != null)   {
//        //function onDeviceReady() {
//        console.log("json-common: removeMediaItemStorage():  Audio file to remove");
//        removeFile(theFile);
//    }
//    else
//        console.log("json-common: removeMediaItemStorage():  No audio file to remove");

    sessionStorage.removeItem("fileUrl");
    sessionStorage.removeItem("fileAudioUrl");
    sessionStorage.removeItem("fileName");
    sessionStorage.removeItem("fileType");
    sessionStorage.removeItem("fileDate");
    sessionStorage.removeItem("fileSize");

    //navigator.camera.cleanup(function() { console.log("Camera cleanup success.")}, function(message) { console.log("Camera cleanup failed.")});
}


function removeFile(theFile) {

    console.log("json-common: removeFile(): " + theFile);

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
        function (fileSystem) {
            console.log("Create File System OK");
            fileSystem.root.getFile(theFile, {create: false, exclusive: false}
                ,function (fileEntry) {
                    console.log("Create File Entry OK");
                    fileEntry.createWriter(
                        function (writer) {
                            console.log("Create Writer OK");
                            //audioLogLine("BEFORE TRUNCATE");
                            writer.truncate(0);
                            //audioLogLine("AFTER TRUNCATE");
                        },
                        function () {
                            console.log("Create Writer FAILED");
                        });
                }
                ,function() {
                    console.log("Create File Entry FAILED");
                });
        },
        function() {
            console.log("Create File System : FAILED");
        });
}
function removeNewStoryStorage() {

    console.log("json-common: removeNewStoryStorage()");

//    if (sessionStorage.getItem("storyAudioUrl") != null) {
//        var theFile = sessionStorage.getItem("storyAudioUrl");
//        theFile.createWriter(function (writer) {writer.truncate(0);}, function(evt) { alert("truncate failed: " + evt.errr.code);});
//    }

    sessionStorage.removeItem("storyStarterCategoryId");
    sessionStorage.removeItem("storyStarterId") ;
    sessionStorage.removeItem("storyMediaItems");
    sessionStorage.removeItem("storyContent");
    sessionStorage.removeItem("storyTitle");
    sessionStorage.removeItem("storyDate");
    sessionStorage.removeItem("storyCategories");
    sessionStorage.removeItem("storyPrivacy");
    sessionStorage.removeItem("storyAudioUrl");
    sessionStorage.removeItem("storyDateSlider");
}