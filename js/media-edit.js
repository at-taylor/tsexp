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

    $('#editCategoryList option').remove();
    for (i = 0; i < categoryArray.length; i++) {
        var catDescr = sessionStorage.getItem("appCacheCat" + categoryArray[i]);
        //console.log("mediaEditPage: category id/descr pull id: " + categoryArray[i] + " descr: " + catDescr);
        var optionListItem = "<option value='" + categoryArray[i] + "'>" + catDescr + "</option>";
        $('#editCategoryList').append(optionListItem);
    }
    $('#editCategoryList').selectmenu("refresh", true);

    console.log("mediaEditPage: pageinit(): end");
});


$(document).on('pagebeforeshow', '#mediaEditPage', function(){

    console.log('mediaEditPage: pagebeforeshow(): start');
    //var mediaId = getUrlVars() ["id"];

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
    $('#editImage').attr("src", "");
    $('#editErrorTxt').val("");

    // 3. Initialize any buttons to initial state
    $('#editBtn').button('enable');
    $('#cancelEditBtn').button('enable');
    $('#editConfirmPopLink').removeClass('ui-disabled');

    //console.log("activePage: " + $.mobile.activePage.data('url')   );
    //console.log("urlHistory: " + $.mobile.urlHistory.getActive().url)   ;

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
        $('#editTitleTxt').val(data.title);
        $('#editDateTxt').val(data.mediaDateRaw);
        $('#editDescrTxt').val(data.descr);
        $('#editImage').attr("src", data.url);

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

        updateMediaItem(mediaId, $('#editTitleTxt').val(), $('#editDateTxt').val(),$('#editDescrTxt').val(), jsonStringArr, newPage, document.getElementById('editErrorTxt'));

    });

    // Must unload the event handler first to avoid multiple click event handlers firing when the page is loaded multiple times
    $(document).off('click', '#cancelEditBtn').on('click', '#cancelEditBtn',function(event) {
   // $('#cancelEditBtn').click(function(event) {

        console.log("mediaEditPage: cancelBtn.click()");

       // $('[type="submit"]').button('disable');
        $('#cancelEditBtn').button('disable');

        //removeMediaItemStorage();

        var theTime = new Date().getTime();
        //var newPage = 'media-library-grid.html?nocache=' + theTime;
        var newPage = 'media-library-grid.html';
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