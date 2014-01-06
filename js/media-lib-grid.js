/**
 * Created with IntelliJ IDEA.
 * User: tparmer
 * Date: 11/27/13
 * Time: 5:56 PM
 * To change this template use File | Settings | File Templates.
 */

var media;

console.log("mediaLibGridPage js: Executing");

$(document).on('pagebeforeshow', '#mediaLibGridPage', function(){
      console.log("Grid: " + 'pagebeforeshow');
});

$(document).on('pagebeforecreate', '#mediaLibGridPage', function(){
    console.log("Grid: " + 'pagebeforecreate');
});

$(document).on('pageinit', '#mediaLibGridPage', function(){
    console.log("Grid: " + 'pageinit');
});

$(document).on('pageload', '#mediaLibGridPage', function(){
    console.log("Grid: " + 'pageload');
});

$(document).on('pageshow', '#mediaLibGridPage', function(){
    console.log("Grid: " + 'pageshow');
});


function sendItGrid(theId) {
    console.log("mediaLibGridPage: sendItGrid(): the Id = " + theId)     ;
    sessionStorage.setItem("mediaEditId", theId);
    $.mobile.changePage("media-edit.html")   ;
}

//$('#mediaLibGridPage').bind('pageinit', function(event) {
$(document).on('pageshow', '#mediaLibGridPage', function(){
    // alert('bind: pageinit');
    console.log("mediaLibGridPage: pagebeforeshow");

    $.getJSON(tsServiceURLDomain + "tssvc/resourcesS/media", function(data) {

        console.log("mediaLibGridPage: pagebeforeshow: removing list items");
        $('#mediaLibGridList li').remove();

        media = data.mediaModelList;
        console.log("media object");
        console.log(media);

        console.log("mediaLibGridPage: pagebeforeshow: pulled list about to iterate");
        $.each(media, function(index, item) {

            console.log("in iteration");
            console.log("url?" + item.url);
            console.log("file type?" + item.fileType)
            ;
            var videoOrImageTag;
            if (item.fileType == "mp4")
                videoOrImageTag = '<video ><source  type="video/mp4" src=' + item.url + '></video>'
            else
                videoOrImageTag =  '<img src= '+ item.url +'>'

            console.log("tag");
            console.log(videoOrImageTag);

            //$('#mediaLibGridList').append('<li><a onclick=sendIt(' + item.id + ') href="media-edit.html?id=' + item.id + '">' +
            $('#mediaLibGridList').append('<li><a onclick=sendItGrid(' + item.id + ') href="#">' +
                videoOrImageTag +
                '<h2>' + item.title + '</h2>' +
                '<p>' + item.createdHr + '</p>' +
                '<p class="ui-li-aside">' + item.fileType + '</p>' +
                '</a></li>');


        });
        console.log("mediaLibGridPage: pagebeforeshow: completed iterate");
        $('#mediaLibGridList').listview('refresh');
        $('#mediaLibGridList').trigger('create');

        console.log("mediaLibGridPage: pagebeforeshow: completed refresh and trigger");

    });



});


