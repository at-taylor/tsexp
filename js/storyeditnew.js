
console.log("storyEditNewPage storyeditnew.js: Executing");
//
//$(document).on('pageinit', '#storyEditNewPage', function(){
//
//    console.log('storyEditNewPage: pagebeforeshow()');
//
//    // initialize the rich text control
//    $('.jqte-test').jqte();
//});

$(document).on('pageinit', '#storyEditNewPage', function(){

    console.log("storyEditNewPage: pageinit(): begin");

    // initialize the rich text control
    console.log("storyEditNewPage: pageinit(): Initializing rich text control (jqte)");
    $('.jqte-test').jqte();

    console.log("storyEditNewPage: pageinit(): Attempting to retrieve categories from cache");
    var categoryArray = JSON.parse(sessionStorage.getItem("appCacheCatIds"));

    if (categoryArray == null) {
        console.log("storyEditNewPage: Category cache entries are null.  Need to rebuild cache.")     ;
        appCacheCategoryList("appCacheCat");
    }
    else
        console.log("storyEditNewPage: pageinit(): Categories succesfully retrieved from cache");

    $('#storyEditNewCategoryList option').remove();
    for (i = 0; i < categoryArray.length; i++) {
        var catDescr = sessionStorage.getItem("appCacheCat" + categoryArray[i]);
        //console.log("storyEditNewPage: category id/descr pull id: " + categoryArray[i] + " descr: " + catDescr);
        var optionListItem = "<option value='" + categoryArray[i] + "'>" + catDescr + "</option>";
        $('#storyEditNewCategoryList').append(optionListItem);
    }
    $('#storyEditNewCategoryList').selectmenu("refresh", true);

    console.log("storyEditNewPage: pageinit(): end");
});

$(document).on('pagebeforeshow', '#storyEditNewPage', function(){

    console.log('storyEditNewPage: pagebeforeshow()');

    //$('.jqte-test').jqte();

    //1a.  Initialize input fields on the page to remove any cached values
    $('#storyEditNewTitleTxt').val("");
    $('#storyEditNewDateTxt').val("");
    $('#storyEditNewContentTxt').val("");

    //1b. Carryover values from session storage as needed
    $('#storyEditNewTitleTxt').val(sessionStorage.getItem("storyTitle"));

    // 2. Set buttons to initialized state
    $('#storyEditNewNextBtn').removeClass('ui-disabled');

    // 3.  Set dynamic content     (note categories are fairly static and set thus in pageinit()
    console.log("Logging number of options that exist for media items.");
    console.log($('#controlgroup input').size());
    var theNumberOfMediaItems =$('#controlgroup input').size();
    if (theNumberOfMediaItems == 0) {
        $.getJSON(tsServiceURLDomain + "tssvc/resourcesS/media", function(data) {
            console.log("storyEditNewPage: pagebeforeshow(): getJSON for media library: start()");

            var media;
            var group = $( "#controlgroup" );
            $('.ui-checkbox').remove();
            var el;
            media = data.mediaModelList;
            $.each(media, function(index, item) {

                //console.log("Index from url: " + item.url + " is " + item.url.substring(item.url.lastIndexOf('.')+1) );
                var theExt = item.url.substring(item.url.lastIndexOf('.')+1);
                if ((theExt == "jpg") || (theExt == "png") || (theExt == "JPG"))  {
                    $el = $('<input type="checkbox" data-inline="true" id="mediaCheck' + item.id + '" class="mediaCheck" value=' + item.id +' ><label for="mediaCheck' + item.id +'"><img width=100 height=100 src= "' + item.url + '"></label>');
                    sessionStorage.setItem("storyAddMediaId" + item.id, item.url);
                }
                //console.log("Element :" + $el);
                $( "#controlgroup" ).controlgroup( "container" )["append"]( $el );

            });
            group.controlgroup( "refresh" );
            $('#controlgroup').trigger('create');
            console.log("commented out generic div create");
            //$('div').trigger('create');   // is this causing the category issue?

            console.log("storyEditNewPage: pagebeforeshow(): getJSON for media library: end()");
        });
    }

    // 4. Set event handlers
    $(document).off('click', '#storyEditNewNextBtn').on('click', '#storyEditNewNextBtn',function(event) {

        $('#storyEditNewNextBtn').addClass('ui-disabled');

        console.log("storyEditNewPage: storyEditNewNextBtn: onclick()");

        var val = new Array();
        $(':checkbox:checked').each(function(i){
            val[i] = $(this).val();
        //console.log("inner label html: " + $('#mediaCheck657 label').html());
        //alert("checked: " + $(this).val());
        });

        sessionStorage.setItem("storyMediaItems",JSON.stringify(val));
        console.log("storyEditNewPage: submitStoryEditNew: cached Media Items: " + sessionStorage.getItem("storyMediaItems"));

        sessionStorage.setItem("storyTitle", $('#storyEditNewTitleTxt').val()) ;
        console.log("storyEditNewPage: submitStoryEditNew: cached Story Title: " + sessionStorage.getItem("storyTitle"));

        sessionStorage.setItem("storyDate", $('#storyEditNewDateTxt').val()) ;
        console.log("storyEditNewPage: submitStoryEditNew: cached Story Date: " + sessionStorage.getItem("storyDate"));

        var theStoryContent = $('.jqte-test').val();
        sessionStorage.setItem("storyContent", theStoryContent);
        console.log("storyEditNewPage: submitStoryEditNew: cached Story Content: " + sessionStorage.getItem("storyContent"));

        var selectedValsArray = $('#storyEditNewCategoryList').val();
        var jsonStringArr = JSON.stringify(selectedValsArray);
        sessionStorage.setItem("storyCategories", jsonStringArr);
        console.log("storyEditNewPage: submitStoryEditNew: cached Story Categories: " + sessionStorage.getItem("storyCategories"));

        $.mobile.changePage('storypreview2.html');

    });

});