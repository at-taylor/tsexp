/**
 * Created with IntelliJ IDEA.
 * User: tparmer
 * Date: 11/27/13
 * Time: 5:56 PM
 * To change this template use File | Settings | File Templates.
 */



var media;

console.log("mediaListPage js: Executing");

$(document).on('pagebeforeshow', '#mediaListPage', function(){

    console.log('mediaListPage: pagebeforeshow(): start');

    console.log('mediaListPage: pagebeforeshow(): Initialize buttons');
    // Initialize any buttons to initial state
    $('#mediaListBackBtn').removeClass('ui-disabled');
    $('#mediaListHomeBtn').removeClass('ui-disabled');

    getMediaList();

    console.log('mediaListPage: pagebeforeshow(): end');

});

$('#mediaListPage').bind('pageinit', function(event) {
   // alert('mediaListPage: live: pageinit');
    console.log('mediaListPage: bind: pageinit()');

});

function sendItList(theId) {
    console.log("mediaListPage: sendItList(): the Id = " + theId)     ;
    sessionStorage.setItem("mediaEditId", theId);
    $.mobile.changePage("media-edit.html")   ;
}

function getMediaList() {
    console.log('mediaListPage: getMediaList() running');

    $.getJSON( tsServiceURLDomain + "tssvc/resourcesS/media", function(data) {
        $('#mediaList li').remove();
        media = data.mediaModelList;
        $.each(media, function(index, item) {
            var videoOrImageTag;
            if (item.fileType == "mp4")
                videoOrImageTag = '<video height="80" width="80"><source  type="video/mp4" src=' + item.url + '></video>'
            else
                videoOrImageTag =  '<img height="80" width="80" src= '+ item.url +'>'

            //console.log("item = " + item.id + " fileType = " + item.fileType + " tag = " + videoOrImageTag);


            //$('#mediaList').append('<li><a href="media-edit.html?id=' + item.id + '">' +
            $('#mediaList').append('<li><a onclick=sendItList(' + item.id + ') href="#">' +

                '<div class="ui-grid-c" style="padding-left: 10px">' +
                '<div class="ui-block-a">' +
               // '<img height="80" width="80" src= '+ item.url +'>' +
                videoOrImageTag +
                '</div>' +
                '<div class="ui-block-b">' + '<h3 style="white-space: normal;">' + item.title + '</h3>' +'</div>' +
                '<div class="ui-block-c">' + '<h6 style="padding-left: 60px;">' + item.createdHr + '</h6>' + '</div>' +
                '<div class="ui-block-d">' + '<h6 style="padding-left: 60px;">' + item.fileType + '</h6>' + '</div>' +
                '</div>' + '</a><a href="confirm.html" data-rel="dialogue"></a></li>');
        });
$('#mediaList').listview('refresh');
});
    console.log('mediaListPage: getMediaList() completed');
}

console.log("mediaListPage js: Completed");