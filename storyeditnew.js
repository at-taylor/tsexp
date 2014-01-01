


console.log("storyEditNewPage js: Executing");

$('#storyEditNewPage').bind('pageinit', function(event) {
    console.log('storyEditNewPage: bind: pageinit()');
})

$(document).on('pagebeforeshow', '#storyEditNewPage', function(){

    console.log('storyEditNewPage: bind: pageinit()');

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