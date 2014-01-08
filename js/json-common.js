
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

function updateMediaItem(mediaId, mediaTitle, mediaDate, mediaDescr, mediaCategories, changePageTo, errorElement) {

    console.log("json-common: updateMediaItem() for media item id: " + mediaId);

    var jQErrorName = '#' + errorElement.id;

    $.ajax({
        type: "POST",
        url: tsServiceURLDomain + "tssvc/resourcesS/media" + "/" + mediaId,
        data:'mediaTitle='+ mediaTitle +'&mediaDate='+ mediaDate +'&mediaDescr='+ mediaDescr +'&catList='+ mediaCategories,
        cache: false,
        success: function(data) {
            console.log("json-common: updateMediaItem(): success: data=" + data.id);
            if (changePageTo != null)
                $.mobile.changePage(changePageTo);

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
    })
}

function removeMediaItemStorage() {

    console.log("json-common: removeMediaItemStorage()");

    sessionStorage.removeItem("fileUrl");
    sessionStorage.removeItem("fileName");
    sessionStorage.removeItem("fileType");
    sessionStorage.removeItem("fileDate");
    sessionStorage.removeItem("fileSize");
}

function removeNewStoryStorage() {

    console.log("json-common: removeNewStoryStorage()");

    sessionStorage.removeItem("storyMediaItems");
    sessionStorage.removeItem("storyContent");
    sessionStorage.removeItem("storyTitle");
    sessionStorage.removeItem("storyDate");
    sessionStorage.removeItem("storyCategories");
}