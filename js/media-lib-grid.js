/**
 * Created with IntelliJ IDEA.
 * User: tparmer
 * Date: 11/27/13
 * Time: 5:56 PM
 * To change this template use File | Settings | File Templates.
 */
var serviceURL = tsServiceURLDomain + "tssvc/resourcesS/media";
var media;

console.log("mediaLibGridPage js: Executing");
console.log("mediaLibGridPage: executing using services at: " + serviceURL);

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

//$('#mediaLibGridPage').bind('pageinit', function(event) {
$(document).on('pagebeforeshow', '#mediaLibGridPage', function(){
    // alert('bind: pageinit');
    console.log("mediaLibGridPage: pagebeforeshow");

    $.getJSON(serviceURL, function(data) {

        console.log("mediaLibGridPage: pagebeforeshow: removing list items");
        $('#mediaLibGridList li').remove();
        media = data.mediaModelList;

        console.log("mediaLibGridPage: pagebeforeshow: pulled list about to iterate");
        $.each(media, function(index, item) {

            var videoOrImageTag;
            if (item.fileType == "mp4")
                videoOrImageTag = '<video ><source  type="video/mp4" src=' + item.url + '></video>'
            else
                videoOrImageTag =  '<img src= '+ item.url +'>'


            $('#mediaLibGridList').append('<li><a href="media-edit.html?id=' + item.id + '">' +
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


