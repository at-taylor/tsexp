
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
//
//    $('#storyEditNewCategoryList option').remove();
//    for (i = 0; i < categoryArray.length; i++) {
//        var catDescr = sessionStorage.getItem("appCacheCat" + categoryArray[i]);
//        //console.log("storyEditNewPage: category id/descr pull id: " + categoryArray[i] + " descr: " + catDescr);
//        var optionListItem = "<option value='" + categoryArray[i] + "'>" + catDescr + "</option>";
//        $('#storyEditNewCategoryList').append(optionListItem);
//    }
//    $('#storyEditNewCategoryList').selectmenu("refresh", true);

    console.log("storyEditNewPage: pageinit(): end");
});

$(document).on('pagebeforeshow', '#storyEditNewPage', function(){

    console.log('storyEditNewPage: pagebeforeshow()');
    console.log('storyEditNewPage: pagebeforeshow(): checking in-process flag');

    var inProcessFlag = sessionStorage.getItem("storyEditNewProcessFlag");
    if (inProcessFlag == "true")     {
        console.log('storyEditNewPage: in-process.  Returning');
        return;
    }
    console.log('storyEditNewPage: pagebeforeshow(): continuing');
    sessionStorage.setItem("storyEditNewProcessFlag", "true");

    //$('.jqte-test').jqte();
      //1a.  Initialize input fields on the page to remove any cached values
    $('#storyEditNewTitleTxt').val("");
    $('#storyEditNewDateTxt').val("");
    $('#storyEditNewContentTxt').val("");
    // clear selected both in categories and media

    //1b. Carryover values from session storage as needed
    $('#storyEditNewTitleTxt').val(sessionStorage.getItem("storyTitle"));
    $('#storyEditNewDateTxt').val(sessionStorage.getItem("storyDate"));
    $('#storyEditNewContentTxt').val(sessionStorage.getItem("storyContent"));
    $('.jqte_editor').html("");  // clear the innards of the rich text editor
    $('.jqte_editor').html(sessionStorage.getItem("storyContent"));

    console.log("try resetting text in the text control on reload of page");
    //$('.jqte-test').jqte();  // try rebuilding

    if (sessionStorage.getItem("storyPrivacy") != null)
        $('#storyEditNewPrivacySwitch').val(sessionStorage.getItem("storyPrivacy")).slider("refresh");
    else
        $('#storyEditNewPrivacySwitch').val("0").slider("refresh");











    // categories

    console.log("storyEditNewPage: pagebeforeshow(): Start: categories");
    var categoryArray = JSON.parse(sessionStorage.getItem("appCacheCatIds"));

    $('#storyEditNewCategoryList option').remove();
    for (i = 0; i < categoryArray.length; i++) {
        var catDescr = sessionStorage.getItem("appCacheCat" + categoryArray[i]);
        var optionListItem = "<option value='" + categoryArray[i] + "'>" + catDescr + "</option>";
        $('#storyEditNewCategoryList').append(optionListItem);
    }
    $('#storyEditNewCategoryList').selectmenu("refresh", true);

    console.log("storyEditNewPage: pagebeforeshow(): Start: Preselect already selected category options for this  item.");
    var categoryResultArray = new Array();
    categoryResultArray = JSON.parse(sessionStorage.getItem("storyCategories"));
    console.log("categoryResultArray: (parsed)" + categoryResultArray);
    console.log("categoryResultArray: (raw) " + sessionStorage.getItem("storyCategories"));

    if (categoryResultArray != null) {
        for(i = 0; i < categoryResultArray.length; i++) {
        console.log("value at index: " + i + " is " + categoryResultArray[i] )
        $("#storyEditNewCategoryList option[value='"+categoryResultArray[i]+"']").attr('selected', 'selected');
        }
    }
    $('#storyEditNewCategoryList').selectmenu("refresh", true);
    console.log("storyEditNewPage: pagebeforeshow(): End: Preselect already selected category options for this  item.");

    console.log("storyEditNewPage: pagebeforeshow(): End: categories");


    // 2. Set buttons to initialized state
    $('#storyEditNewNextBtn').removeClass('ui-disabled');
    $('#storyEditNewBackBtn').removeClass('ui-disabled');

    // 3.  Set dynamic content     (note categories are fairly static and set thus in pageinit()
    console.log("Logging number of options that exist for media items.");
    console.log($('#controlgroup input').size());
    var theNumberOfMediaItems =$('#controlgroup input').size();

    //note: if media items are already there don't rebuild them.  this will avoid a rebuild every time the edit page
    //   is invoked in a single tell story session.  The checkboxes will be removed at the end of tell story
    //    to force a refresh
    if (theNumberOfMediaItems == 0)  {
        $.getJSON(tsServiceURLDomain + "tssvc/resourcesS/media", function(data) {
            console.log("storyEditNewPage: pagebeforeshow(): getJSON for media library: start()");

            var media;
            var group = $( "#controlgroup" );
            $('#controlgroup .ui-checkbox').remove();
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

            console.log("storyEditNewPage: pagebeforeshow(): getJSON for media library: end()");
        });
    }

    // 4. Set event handlers

    $(document).off('click', '#storyEditNewBackBtn').on('click', '#storyEditNewBackBtn',function(event) {

        $('#storyEditNewNextBtn').addClass('ui-disabled');
        $('#storyEditNewBackBtn').addClass('ui-disabled');

        console.log("storyEditNewPage: storyEditNewBackBtn: onclick()");

        storyEditNewSetItems();

        $.mobile.changePage('storystart.html');
    });

    $(document).off('click', '#storyEditNewNextBtn').on('click', '#storyEditNewNextBtn',function(event) {

        $('#storyEditNewNextBtn').addClass('ui-disabled');
        $('#storyEditNewBackBtn').addClass('ui-disabled');

        console.log("storyEditNewPage: storyEditNewNextBtn: onclick()");

        storyEditNewSetItems();
        $.mobile.changePage('storyNarrate.html');

//        var val = new Array();
//        $(':checkbox:checked').each(function(i){
//            val[i] = $(this).val();
//        //console.log("inner label html: " + $('#mediaCheck657 label').html());
//        //alert("checked: " + $(this).val());
//        });
//
//        sessionStorage.setItem("storyMediaItems",JSON.stringify(val));
//        console.log("storyEditNewPage: submitStoryEditNew: cached Media Items: " + sessionStorage.getItem("storyMediaItems"));
//
//        sessionStorage.setItem("storyTitle", $('#storyEditNewTitleTxt').val()) ;
//        console.log("storyEditNewPage: submitStoryEditNew: cached Story Title: " + sessionStorage.getItem("storyTitle"));
//
//        sessionStorage.setItem("storyDate", $('#storyEditNewDateTxt').val()) ;
//        console.log("storyEditNewPage: submitStoryEditNew: cached Story Date: " + sessionStorage.getItem("storyDate"));
//
//        var theStoryContent = $('.jqte-test').val();
//        sessionStorage.setItem("storyContent", theStoryContent);
//        console.log("storyEditNewPage: submitStoryEditNew: cached Story Content: " + sessionStorage.getItem("storyContent"));
//
//        var selectedValsArray = $('#storyEditNewCategoryList').val();
//        var jsonStringArr = JSON.stringify(selectedValsArray);
//        sessionStorage.setItem("storyCategories", jsonStringArr);
//        console.log("storyEditNewPage: submitStoryEditNew: cached Story Categories: " + sessionStorage.getItem("storyCategories"));
//
//        sessionStorage.setItem("storyEditNewProcessFlag", "false");

    });

});

//    $(function() {
//
//        console.log("storyEditNewDateSwitch:in ");
//
//        $("#storyEditNewDateSwitch").slider({
//            slide: function(event, ui) {
//                if (ui.value = 0) {
//                    $("#exactdate").fadeIn("slow");
//                    $("#approxdate").fadeOut("slow");
//                }
//                else if (ui.value = 1){
//                    $("#exactdate").fadeOut("slow");
//                    $("#approxdate").fadeIn("slow");
//                }
//
//            }
//        });
//    });


$('#storyEditNewDateSwitch').change(function() {
    var myswitch = $(this);
    var show     = myswitch[0].selectedIndex == 1 ? true:false;

    if(show) {

        $('#approxdate').fadeIn('slow');
        $('#exactdate').fadeOut();
    } else {

        $('#exactdate').fadeIn('slow');
        $('#approxdate').fadeOut();
    }
});





    function storyEditNewSetItems()
{
    console.log("storyEditNewPage: storyEditNewSetItems: Start");

    var val = new Array();
    $(':checkbox:checked').each(function(i){
        val[i] = $(this).val();
        //console.log("inner label html: " + $('#mediaCheck657 label').html());
        //alert("checked: " + $(this).val());
    });

    sessionStorage.setItem("storyMediaItems",JSON.stringify(val));
    console.log("storyEditNewPage: storyEditNewSetItems: cached Media Items: " + sessionStorage.getItem("storyMediaItems"));

    sessionStorage.setItem("storyTitle", $('#storyEditNewTitleTxt').val()) ;
    console.log("storyEditNewPage: storyEditNewSetItems: cached Story Title: " + sessionStorage.getItem("storyTitle"));

    if ($('#storyEditNewDateSwitch').val() == 0)           //exact
        sessionStorage.setItem("storyDate", $('#storyEditNewDateTxt').val()) ;
    else
        sessionStorage.setItem("storyDate", $('#storyEditApproxDateTxt').val());
    console.log("storyEditNewPage: storyEditNewSetItems: cached Story Date: " + sessionStorage.getItem("storyDate"));

    var theStoryContent = $('.jqte-test').val();
    sessionStorage.setItem("storyContent", theStoryContent);
    console.log("storyEditNewPage: storyEditNewSetItems: cached Story Content: " + sessionStorage.getItem("storyContent"));

    var selectedValsArray = $('#storyEditNewCategoryList').val();
    var jsonStringArr = JSON.stringify(selectedValsArray);
    sessionStorage.setItem("storyCategories", jsonStringArr);
    console.log("storyEditNewPage: storyEditNewSetItems: cached Story Categories: " + sessionStorage.getItem("storyCategories"));

    sessionStorage.setItem("storyPrivacy", $('#storyEditNewPrivacySwitch').val());
    sessionStorage.setItem("storyDateSlider", $('#storyEditNewDateSwitch').val());

    sessionStorage.setItem("storyEditNewProcessFlag", "false");

}



