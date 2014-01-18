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

function updateMediaItem(mediaId, mediaTitle, mediaDate, mediaDescr, mediaCategories, mediaAudioUrl, changePageTo, errorElement) {

    console.log("json-common: updateMediaItem() for media item id: " + mediaId);

    var jQErrorName = '#' + errorElement.id;

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
                if (changePageTo != null)
                    $.mobile.changePage(changePageTo);
                return;
            }
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName= "audio.wav";
            options.mimeType="audio/wav";

            var params = {};
            params.value1 = "test";
            params.value2 = "param";
            options.params = params;
            var ft = new FileTransfer();
            // error checking needed here
            ft.upload(mediaAudioUrl, encodeURI(tsServiceURLDomain + "tssvc/resourcesS/media/audio/" + mediaId), function() {
                $(jQErrorName).val("in audio upload success");
                if (changePageTo != null)
                    $.mobile.changePage(changePageTo);
            }, function() {
                $(jQErrorName).val("in audio upload fail");
            }, options);

        },
        error: function(xhr, status, error) {

            console.log("json-common: updateMediaItem(): error: resp=" + xhr.responseText);
            console.log("json-common: updateMediaItem(): error: status=" + status);
            console.log("json-common: updateMediaItem(): error: error=" + error);
            $(jQErrorName).val(xhr.responseText);
//            alert("in error");
//            alert("status: " + status) ;
//            alert("error: " + error);
//            alert(xhr.responseText);
            //$.mobile.changePage("index.html");
        }
    })   ;


}

function removeMediaItemStorage() {

    console.log("json-common: removeMediaItemStorage()");

    sessionStorage.removeItem("fileUrl");
    sessionStorage.removeItem("fileAudioUrl");
    sessionStorage.removeItem("fileName");
    sessionStorage.removeItem("fileType");
    sessionStorage.removeItem("fileDate");
    sessionStorage.removeItem("fileSize");
}

function removeNewStoryStorage() {

    console.log("json-common: removeNewStoryStorage()");

    sessionStorage.removeItem("storyStarterCategoryId");
    sessionStorage.removeItem("storyStarterId") ;
    sessionStorage.removeItem("storyMediaItems");
    sessionStorage.removeItem("storyContent");
    sessionStorage.removeItem("storyTitle");
    sessionStorage.removeItem("storyDate");
    sessionStorage.removeItem("storyCategories");
    sessionStorage.removeItem("storyPrivacy");
}