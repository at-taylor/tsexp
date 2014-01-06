var serviceURL = tsServiceURLDomain + "tssvc/resourcesS/media";
var serviceCategoryURL = tsServiceURLDomain + "tssvc/resourcesS/categories";

console.log("media-edit.js: Executing");
console.log("mediaEditPage: executing using services at: " + serviceURL);
console.log("mediaEditPage: executing using category services at: " + serviceCategoryURL);

$(document).on('pagebeforeshow', '#mediaEditPage', function(){

    console.log('mediaEditPage: pagebeforeshow()');
    var mediaId = getUrlVars() ["id"];

    if (mediaId == null)   {
        var newPage = 'media-library-grid.html?nocache='+new Date().getTime();
        $.mobile.changePage(newPage);
    }
    console.log ("mediaEditPage: pagebeforeshow(): called with media id=" + mediaId);

    $('[type="submit"]').button('enable');

    //console.log("activePage: " + $.mobile.activePage.data('url')   );
    //console.log("urlHistory: " + $.mobile.urlHistory.getActive().url)   ;

    var categoryResultArray = new Array();
    $.getJSON(serviceURL + '/' + mediaId, function(data) {

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
        $('#editTitleTxt').val(data.title);
        $('#editDateTxt').val(data.mediaDateRaw);
        $('#editDescrTxt').val(data.descr);
        $('#editImage').attr("src", data.url);

        console.log("mediaEditPage: starting category load.");
        $.getJSON(serviceCategoryURL, function(data) {

            $('#editCategoryList option').remove();       // clear previous entries

            cat = data.categoryModelList;
            $.each(cat, function(index, item) {
                var optionListItem = "<option value='" + item.categoryId + "'>" +item.categoryDescr + "</option>";
                $('#editCategoryList').append(optionListItem);
            });

            // make selected any items that are in the result array
            //console.log("Category Array outer processing.  Length: " + categoryResultArray.length) ;
            for(i = 0; i < categoryResultArray.length; i++) {
                //console.log("value at index: " + i + " is " + categoryResultArray[i] )
                $("#editCategoryList option[value='"+categoryResultArray[i]+"']").attr('selected', 'selected');
            }
            $('#editCategoryList').selectmenu("refresh", true);
        });
        console.log("mediaEditPage: ending category load.");

    });

    $('#editBtn').click(function(event) {
        console.log("mediaEditPage: editBtn.click(): for id of: " + mediaId);

        $('[type="submit"]').button('disable');

        var selectedValsArray = $('#editCategoryList').val();
        console.log("mediaEditPage: editBtn.click(): selected Category Array" + selectedValsArray);
        var jsonStringArr = JSON.stringify(selectedValsArray);
        console.log("mediaEditPage: editBtn.click():  selected Category Array as JSON" + jsonStringArr);

        var theTime = new Date().getTime();
        var newPage = 'media-library-grid.html?nocache=' + theTime;
        updateMediaItem(mediaId, $('#editTitleTxt').val(), $('#editDateTxt').val(),$('#editDescrTxt').val(), jsonStringArr, newPage, document.getElementById('fileUploadTxt'));

    });

    $('#cancelEditBtn').click(function(event) {

        console.log("mediaEditPage: cancelBtn.click()");

        $('[type="submit"]').button('disable');

        //removeMediaItemStorage();

        var theTime = new Date().getTime();
        var newPage = 'media-library-grid.html?nocache=' + theTime;
        $.mobile.changePage(newPage);

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