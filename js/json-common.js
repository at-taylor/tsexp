var serviceCategoryURL = tsServiceURLDomain + "tssvc/resourcesS/categories";
var serviceMediaUpdateURL = tsServiceURLDomain + "tssvc/resourcesS/media";

function setCategoryList(element) {

    console.log("json-common: setCategoryList() for element id: " + element.id);

    var jQName = '#' + element.id;

    $.getJSON(serviceCategoryURL, function(data) {
        cat = data.categoryModelList;

        $.each(cat, function(index, item) {

            var optionListItem = "<option value='" + item.categoryId + "'>" +item.categoryDescr + "</option>";
            //console.log("option Item: " + optionListItem);
            $(jQName).append("<option value='" + item.categoryId + "'>" +item.categoryDescr + "</option>");
        });
        $(jQName).selectmenu("refresh", true);
    });

}

function updateMediaItem(mediaId, mediaTitle, mediaDate, mediaDescr, changePageTo, errorElement) {

    console.log("json-common: updateMediaItem() for media item id: " + mediaId);

    var jQErrorName = '#' + errorElement.id;

    $.ajax({
        type: "POST",
        url: serviceMediaUpdateURL + "/" + mediaId,
        data:'mediaTitle='+ mediaTitle +'&mediaDate='+ mediaDate +'&mediaDescr='+ mediaDescr,
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