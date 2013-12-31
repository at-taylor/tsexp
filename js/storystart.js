
var serviceURL = tsServiceURLDomain + "tssvc/resourcesS/stories";
var starters;
var categories;
var numberOfCategories = 0;
var numberOfStarters = 0;

console.log("storyStartPage js: Executing");
console.log("storyStartPage: executing using services at: " + serviceURL);

$('#storyStartPage').bind('pageinit', function(event) {
    console.log('storyStartPage: bind: pageinit()');
})

$(document).on('pagebeforeshow', '#storyStartPage', function(){

    // Sample code to automatically open a side panel
    //var optionsHash = "";
    //console.log("About to open panel");
    //$( "#mypanel" ).panel( "open");
    //console.log("After open panel");

    // attempt to set a theme on a textinput, it did not work
    //    console.log("setting theme b");
    //    $( '.selector' ).textinput({ theme: "b" });

     getStarterList();

    // sample code on setting div html thru jquery functions
    //$('#storyStarterDiv').html("QUERY STYLE");

    });

function submitIt() {

    console.log("storyStartPage: submitIt()");

    sessionStorage.setItem("storyTitle", $('#storyStarterTitleTxt').val());
    console.log("storyStartPage: submitIt(): storing selected Title: " + sessionStorage.getItem("storyTitle"));
    $.mobile.changePage('storyeditnew.html');

}
function setIt(id) {

    console.log("storyStartPage: setIt(id=" + id + ")");

    console.log("storyStartPage: setIt: The number of starters are follows: " + numberOfCategories)  ;
    console.log("storyStartPage: setIt: Setting all categories to theme c");
    for (var i=1;i<numberOfStarters+1;i++)
    {
        $("#starterListItem" + i).buttonMarkup({theme: 'c'});
    }
    console.log("storyStartPage: showIt: Set only the selected Starter to theme a");
    $("#starterListItem" + id).buttonMarkup({theme: 'a'});

    //  Set the title with the associated story starter suggested story title
    $.getJSON(serviceURL + "/starters/" + id, function(data) {

        console.log("storyStartPage: setIt(): Title retrieved: " + data.starterTitle);

        $('#storyStarterTitleTxt').val(data.starterTitle);

        var theme = $( '#storyStarterTitleTxt' ).textinput( "option", "theme" );
        console.log("storyStartPage: setIt(): current Theme: " + theme);
        $('#storyStarterTitleTxt').textinput( "option", "theme", "b" );

        console.log("storyStartPage: setIt(): theme and title set");

    });

    console.log('storyStartPage: setIt() completed');
}
function showIt(id) {

    console.log("storyStartPage: showIt(id=" + id + ")");

    console.log("storyStartPage: showIt: The number of categories are follows: " + numberOfCategories)  ;
    console.log("storyStartPage: showIt: Setting all categories to theme c");
    for (var i=1;i<numberOfCategories+1;i++)
    {
        $("#catListItem" + i).buttonMarkup({theme: 'c'});
    }
    console.log("storyStartPage: showIt: Set only the selected category to theme a");
    $("#catListItem" + id).buttonMarkup({theme: 'a'});

    //  Fill the right-hand side of the grid with the corresponding story starters to selected category
    numberOfStarterCategories = 0;
    $.getJSON(serviceURL + "/starters/categories/" + id, function(data) {

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
    console.log('storyStartPage: showIt() completed');

}

function getStarterList() {

    console.log('storyStartPage: getStarterList() running');

    numberOfCategories = 0;
    console.log('storyStartPage: getStarterList(): initializing number of categories: ' + numberOfCategories);
    $.getJSON(serviceURL + "/starters/categories/", function(data) {

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

