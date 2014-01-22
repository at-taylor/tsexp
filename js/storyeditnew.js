
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
    console.log("storyEditNewPage: pageinit(): jqte init removed.");

    console.log("storyEditNewPage: pageinit(): Attempting to retrieve categories from cache");
    var categoryArray = JSON.parse(sessionStorage.getItem("appCacheCatIds"));

    if (categoryArray == null) {
        console.log("storyEditNewPage: Category cache entries are null.  Need to rebuild cache.")     ;
        appCacheCategoryList("appCacheCat");
    }
    else
        console.log("storyEditNewPage: pageinit(): Categories succesfully retrieved from cache");

    $('#storyEditNewDateTxt').blur(function() {

        fullDateEdit("storyEditNewDateTxt", "storyEditNewDateDialog");

    } );

    $('#storyEditApproxDateTxt').blur(function() {
        yearDateEdit("storyEditApproxDateTxt","storyEditNewYearDialog" );

    } );

    $('#storyEditNewDateSwitch').change(function() {

        console.log("storyEditNew: storyEditNewDateSwitch: change()");

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

function flipDateSwitch (val) {

    console.log("storyEditNew: flipDateSwitch: " + val);

    if(val == "0") {

        $('#approxdate').fadeIn('slow');
        $('#exactdate').fadeOut();
    } else {

        $('#exactdate').fadeIn('slow');
        $('#approxdate').fadeOut();
    }
}

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
    $('#storyEditApproxDateTxt').val("");
    $('#storyEditNewContentTxt').val("");
    $('#storyEditNewDateSwitch').val("0").slider("refresh");

    //1b. Carryover values from session storage as needed
    $('#storyEditNewTitleTxt').val(sessionStorage.getItem("storyTitle"));
    if (sessionStorage.getItem("storyContent") != null)
        $('#storyEditNewContentTxt').val(sessionStorage.getItem("storyContent"));

    // Rich Text Control (jqte)
//    console.log("Full re-initialization of JQTE 2");
//    var jqteCtr = Number(0);
//    if (sessionStorage.getItem("jqteCtr") == null)
//        sessionStorage.setItem("jqteCtr", "0");
//    else {
//        jqteCtr = Number(sessionStorage.getItem("jqteCtr")) + Number(1);
//        sessionStorage.setItem("jqteCtr", jqteCtr);
//    }
//    if (sessionStorage.getItem("storyContent") == null) {
//        console.log("INITIALIZE");
//        $('.jqte-test').jqte();
//    } else  {
//        $('.jqte').remove();
//        //$('.jqte-test').jqte();
//        $('#jqteContainer').html("");
//        var appendString = "<textarea id='storyEditNewContentTxt" + jqteCtr + "' class='jqte-test" + jqteCtr + "'>" +   sessionStorage.getItem("storyContent") + "</textarea>";
//        $('#jqteContainer').html(appendString);
//        $('.jqte-test' + jqteCtr).jqte();
//        console.log("REENRTY - Full");
    //}

    //$('.jqte_editor').html("");  // clear the innards of the rich text editor
    //$('.jqte_editor').html(sessionStorage.getItem("storyContent"));
//    if (sessionStorage.getItem("storyContent") == null)
//        $('#storyEditNewContentTxt').jqte({placeholder: "Please write your story here"});
//    else
//        $('#storyEditNewContentTxt').jqteVal(sessionStorage.getItem("storyContent"));
    //$('#storyEditNewContentTxt').jqteVal("New article in pageshow");

    // Privacy Setting Switch: reset from session
    if (sessionStorage.getItem("storyPrivacy") != null)
        $('#storyEditNewPrivacySwitch').val(sessionStorage.getItem("storyPrivacy")).slider("refresh");
    else
        $('#storyEditNewPrivacySwitch').val("0").slider("refresh");

    // Date Switch

    var dateSliderSwitchState = sessionStorage.getItem("storyDateSlider");
    console.log("storyEditNewPage: pagebeforeshow(): Date Switch session State follows:");
    console.log(dateSliderSwitchState);

    if (dateSliderSwitchState == "1")
        $('#storyEditNewDateSwitch').val("1").slider("refresh");
    var dateValue =    sessionStorage.getItem("storyDate");
    console.log("storyEditNewPage: pagebeforeshow(): Date from session State follows:");
    console.log(dateValue);
    if (dateValue != null)
        if ($('#storyEditNewDateSwitch').val() == 0)
            $('#storyEditNewDateTxt').val(dateValue);
        else if ($('#storyEditNewDateSwitch').val() == 1)
            $('#storyEditApproxDateTxt').val(dateValue);
        else
            console.log("storyEditNewPage:pagebeforeshow(): unknown switch value:" + $('#storyEditNewDateSwitch').val());
    else
        flipDateSwitch("1");


//    if (sessionStorage.getItem("storyDateSlider") != null)
//        $('#storyEditNewDateSwitch').val(sessionStorage.removeItem("storyDateSlider")).slider("refresh");
//        if (sessionStorage.getItem("storyDateSlider") == "0")
//            flipDateSwitch("0");
//        else (sessionStorage.getItem("storyDateSlider") == "1")
//            flipDateSwitch("1");
//        if (sessionStorage.getItem("storyDate") != null)
//            if (sessionStorage.getItem("storyDateSlider") == "0")
//                $('#storyEditNewDateTxt').val(sessionStorage.getItem("storyDate"));
//            else
//                $('#storyEditApproxDateTxt').val(sessionStorage.getItem("storyDate"));
//        //storyEditApproxDateTxt
//    else
//        $('#storyEditNewDateSwitch').val("0").slider("refresh");

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
               // var theExt = item.url.substring(item.url.lastIndexOf('.')+1);
                //<img width=100 height=100 src= "' + item.url + '">
                var videoOrImageTag;
                var theFileType = item.fileType;
                var theFileUrl = item.url;
                if ((theFileType == "mp4")   || (theFileType == "mov") || (theFileType == "MOV"))
                    videoOrImageTag = '<img width=100 height=100 src=' + "img/navbut/blank-video.jpg" + '>';
                else
                    videoOrImageTag =  '<img width=100 height=100  src= '+ theFileUrl +'>';
                console.log("tag: " + videoOrImageTag);
                if ((theFileType == "jpg") || (theFileType == "png") || (theFileType == "JPG"))  {
                //$el = $('<input type="checkbox" data-inline="true" id="mediaCheck' + item.id + '" class="mediaCheck" value=' + item.id +' ><label for="mediaCheck' + item.id +'">' + videoOrImageTag                          + '"></label>');
                    $el = $('<input type="checkbox" data-inline="true" id="mediaCheck' + item.id + '" class="mediaCheck" value=' + item.id +' ><label for="mediaCheck' + item.id +'"><img width=100 height=100 src= "' + item.url + '"></label>');
                    sessionStorage.setItem("storyAddMediaId" + item.id, item.url);
                    //console.log("Element :" + $el);
                    $( "#controlgroup" ).controlgroup( "container" )["append"]( $el );
                }

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



