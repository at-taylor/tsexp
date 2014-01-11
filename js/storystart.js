
console.log("storyStartPage js: Executing storystart.js");

var starters;
var categories;
var numberOfCategories = 0;
var numberOfStarters = 0;

console.log("storyStartPage js: Executing");

$(document).on('pageinit', '#storyStartPage', function(){

    console.log("storyStartPage: init(): begin");
    // the elements of this content do not change from user selection, just the values
    var starterCatIdArr    = JSON.parse(sessionStorage.getItem(("appCacheStarterCatIds")));

    if (starterCatIdArr  == null) {
        console.log("storyStartPage: Starter Category cache entries are null.  Need to rebuild cache.");
        appCacheCategoryList("appCacheStarterCat");
    }
    else
        console.log("storyStartPage: pageinit(): Starter Categories succesfully retrieved from cache");

    $('#showStoryStartersList li').remove();
    for (i = 0; i < starterCatIdArr.length; i++) {
        var starterCatDescr = sessionStorage.getItem("appCacheStarterCat" + starterCatIdArr[i]);

        var listItemLine = "<li id=catListItem" + starterCatIdArr[i] + " onclick='showIt(" + starterCatIdArr[i] + ");'> <a href='#'>" + starterCatDescr+ '</a></li>' ;
        console.log("storyStartPage: pageinit(): List Item Line = " + listItemLine);
        $('#showStoryStartersList').append(listItemLine);
    }
    $('#showStoryStartersList').listview('refresh');
    console.log("storyStartPage: pageinit(): Resetting theme of Starter Categories after refresh");
    for (var i=1;i<starterCatIdArr.length+1;i++)
    {
        $("#catListItem" + i).buttonMarkup({theme: 'c'});
    }

    console.log("storyStartPage: init(): end");

});

$(document).on('pagebeforeshow', '#storyStartPage', function(){

    console.log("storyStartPage: pagebeforeshow(): begin and return");

    //
    //1a.  Initialize input fields on the page to remove any cached values
    //
    $('#storyStarterTitleTxt').val("");
    $('#storyStarterTitleTxt').val(sessionStorage.getItem("storyTitle"));

    //
    // 1b.  Pull and set values as needed from session storage
    //
    console.log("storyStartPage: pagebeforeshow(): Resetting theme of Starter Categories.");
    var starterCatIdArr    = JSON.parse(sessionStorage.getItem(("appCacheStarterCatIds")));
    for (var i=1;i<starterCatIdArr.length+1;i++)
    {
        $("#catListItem" + i).buttonMarkup({theme: 'c'});
    }

    console.log("storyStartPage: pagebeforeshow(): Reset starters to a null state.");
    $('#showStoryStarters').listview( "option", "theme", "d" );
    $('#showStoryStarters li').remove();

    console.log("storyStartPage: pagebeforeshow(): Pulling a previously selected category, if exists.");
    console.log("storyStartPage: pagebeforeshow():     Previous Starter Category Value: " + sessionStorage.getItem("storyStarterCategoryId"));
    var storyStarterCategoryId = sessionStorage.getItem("storyStarterCategoryId");
    if (storyStarterCategoryId != null)
        showIt(storyStarterCategoryId);

    console.log("storyStartPage: pagebeforeshow(): Pulling a previously selected starter, if exists.");
    console.log("storyStartPage: pagebeforeshow():     Previous Starter  Value: " + sessionStorage.getItem("storyStarterId"));
    var storyStarterId = sessionStorage.getItem("storyStarterId");
    if (storyStarterId != null)
        setIt(storyStarterId);

    // 2. Set buttons to initialized state
    $('#storyStartNextBtn').removeClass('ui-disabled');
    $('#storyStartBackBtn').removeClass('ui-disabled');

    // 3.  Reset the dyanmic content - note done above

    // 4. Set any event handlers remembering to unset them first
    $(document).off('click', '#storyStartNextBtn').on('click', '#storyStartNextBtn',function(event) {

        $(this).addClass('ui-disabled');

        console.log("storyStartPage: storyStartNextBtn: onclick()");

        sessionStorage.setItem("storyTitle", $('#storyStarterTitleTxt').val());

        console.log("storyStartPage: submitIt(): storing selected Title: " + sessionStorage.getItem("storyTitle"));

        console.log("Stack");
        console.log($.mobile.stack);

        $.mobile.changePage('storyeditnew.html');
    });

    $(document).off('click', '#storyStartBackBtn').on('click', '#storyStartBackBtn',function(event) {

        console.log("storyStartPage: storyStartBackBtn: onclick()");

        $(this).addClass('ui-disabled');

        $('#controlgroup .ui-checkbox').remove(); // get rid of media checkbox items (storyEditNewPage)
        removeNewStoryStorage();

        $.mobile.changePage('tsnav.html');
    });


    console.log("storyStartPage: pagebeforeshow(): end");

});

function setIt(id) {

    console.log("storyStartPage: setIt(id=" + id + "): begin");

    console.log("storyStartPage: setIt: The number of starters are follows: " + numberOfStarters)  ;
    //console.log("storyStartPage: setIt: Setting all categories to theme c");
    for (var i=1;i<numberOfStarters+1;i++)
    {
        $("#starterListItem" + i).buttonMarkup({theme: 'c'});
    }

    console.log("storyStartPage: showIt: Set only the selected Starter to theme a and refreshing with mouseout/create: " + "#starterListItem" + id);
    $("#starterListItem" + id).buttonMarkup({theme: 'a'});
    $("#starterListItem" + id).trigger('mouseout');
    $("#starterListItem" + id).trigger('create');
    //$('#showStoryStartersList').listview('refresh');

    //console.log("storyStartPage: setIt: Update session stored Story Starter Id");
    sessionStorage.setItem("storyStarterId", id);

    //  Set the title with the associated story starter suggested story title
    $.getJSON(tsServiceURLDomain + "tssvc/resourcesS/stories/starters/" + id, function(data) {

        //console.log("storyStartPage: setIt(): Title retrieved: " + data.starterTitle);

        $('#storyStarterTitleTxt').val(data.starterTitle);

        var theme = $( '#storyStarterTitleTxt' ).textinput( "option", "theme" );
        //console.log("storyStartPage: setIt(): current Theme: " + theme);
        $('#storyStarterTitleTxt').textinput( "option", "theme", "b" );

        //console.log("storyStartPage: setIt(): theme and title set.  Refreshing.");

    });

    console.log("storyStartPage: setIt(id=" + id + "): end");
}
function showIt(id) {

    console.log("storyStartPage: showIt(id=" + id + "): begin");

    var starterCatIdArr    = JSON.parse(sessionStorage.getItem(("appCacheStarterCatIds")));
    //console.log("storyStartPage: showIt: The number of categories are follows: " + starterCatIdArr.length)  ;
    //console.log("storyStartPage: showIt: Setting all categories to theme c");
    for (var i=1;i<starterCatIdArr.length+1;i++)
    {
        $("#catListItem" + i).buttonMarkup({theme: 'c'});
    }

//    for (var i=1;i<numberOfCategories+1;i++)
//    {
//        $("#catListItem" + i).buttonMarkup({theme: 'c'});
//    }
    //console.log("storyStartPage: showIt: Set only the selected category to theme a");
    $("#catListItem" + id).buttonMarkup({theme: 'a'});

    //console.log("storyStartPage: showIt: Update session stored Story Starter CateogryId");
    sessionStorage.setItem("storyStarterCategoryId", id);

    //  Fill the right-hand side of the grid with the corresponding story starters to selected category
    numberOfStarterCategories = 0;
    $.getJSON(tsServiceURLDomain + "tssvc/resourcesS/stories/starters/categories/" + id, function(data) {

        $('#showStoryStarters').listview( "option", "theme", "d" );
        $('#showStoryStarters li').remove();

        starters = data.storyStarterModelList;
        $.each(starters, function(index, starter) {

            //console.log("Index: " + index + " Question: " + starter.starterQuestion + " id: " + starter.starterId);
            //var listItemLine = "<li>" + starter.starterQuestion + '</li>'   ;
            var listItemLine = "<li id=starterListItem" + starter.starterId + " onclick='setIt(" + starter.starterId + ");'> <a href='#'>" + starter.starterQuestion + '</a></li>'
            //console.log("storyStartPage: showIt: List Item Line = " + listItemLine);
            $('#showStoryStarters').append(listItemLine);

            numberOfStarters = Number(numberOfStarters) + 1;
        });
        $('#showStoryStarters').listview('refresh');
    });
    console.log("storyStartPage: showIt(id=" + id + "): end");

}

function getStarterList() {

    console.log('storyStartPage: getStarterList() running');

    numberOfCategories = 0;
    console.log('storyStartPage: getStarterList(): initializing number of categories: ' + numberOfCategories);
    $.getJSON(tsServiceURLDomain + "tssvc/resourcesS/stories/starters/categories/", function(data) {

        $('#showStoryStartersList li').remove();

        categories = data.storyStarterCategoryModelList;
        $.each(categories, function(index, category) {

            //console.log("storyStartPage: getStarterList(): Index: " + index + " Title: " + category.starterCategoryTitle + " id: " + category.starterCategoryId);
            var listItemLine = "<li id=catListItem" + category.starterCategoryId + " onclick='showIt(" + category.starterCategoryId + ");'> <a href='#'>" + category.starterCategoryTitle + '</a></li>'
            //console.log("storyStartPage: getStarterList(): List Item Line = " + listItemLine);
            $('#showStoryStartersList').append(listItemLine);

            //console.log("Before :" + numberOfCategories);
            numberOfCategories = Number(numberOfCategories) + 1;
            //console.log("After: " + numberOfCategories) ;
        });
        $('#showStoryStartersList').listview('refresh');

    });
    console.log('storyStartPage: getStarterList(): completed');

}

console.log("storyStartPage js: Completed");

