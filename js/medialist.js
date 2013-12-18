/**
 * Created with IntelliJ IDEA.
 * User: tparmer
 * Date: 11/27/13
 * Time: 5:56 PM
 * To change this template use File | Settings | File Templates.
 */


var serviceURL = tsServiceURLDomain + "tssvc/resourcesS/media";
var media;

console.log("mediaListPage js: Executing");
console.log("mediaListPage: executing using services at: " + serviceURL);

$('#mediaListPage').live('pageinit', function(event) {
   // alert('mediaListPage: live: pageinit');
    console.log('mediaListPage: live: pageinit()');
    getMediaList();
});

function getMediaList() {
    console.log('mediaListPage: getMediaList() running');

    $.getJSON(serviceURL, function(data) {
        $('#mediaList li').remove();
        media = data.mediaModelList;
        $.each(media, function(index, item) {
            var videoOrImageTag;
            if (item.fileType == "mp4")
                videoOrImageTag = '<video height="80" width="80"><source  type="video/mp4" src=' + item.url + '></video>'
            else
                videoOrImageTag =  '<img height="80" width="80" src= '+ item.url +'>'

            //console.log("item = " + item.id + " fileType = " + item.fileType + " tag = " + videoOrImageTag);

            $('#mediaList').append('<li><a href="storydetails.html?id=' + item.id + '">' +

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