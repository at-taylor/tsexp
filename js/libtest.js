/**
 * Created with IntelliJ IDEA.
 * User: tparmer
 * Date: 11/27/13
 * Time: 5:56 PM
 * To change this template use File | Settings | File Templates.
 */
var serviceURL = tsServiceURLDomain + "tssvc/resourcesS/media";
var media;

console.log("libtestPage js: Executing");
console.log("libtestPage: executing using services at: " + serviceURL);



;

$('#libTestPage').bind('pageinit', function(event) {
    // alert('bind: pageinit');
    console.log("libTestPage: in bind(): pageinit");
    getMediaList();
});



function getMediaList() {
     //alert('running list()7') ;
     console.log("libTestPage: getMediaList(): running")     ;



    $.getJSON(serviceURL, function(data) {
        $('#libTest li').remove();
        media = data.mediaModelList;
        $.each(media, function(index, item) {

            var videoOrImageTag;
            if (item.fileType == "mp4")
                videoOrImageTag = '<video ><source  type="video/mp4" src=' + item.url + '></video>'
            else
                videoOrImageTag =  '<img src= '+ item.url +'>'


            $('#libTest').append('<li><a href="media-edit.html?id=' + item.id + '">' +
                videoOrImageTag +
                '<h2>' + item.title + '</h2>' +
                '<p>' + item.createdHr + '</p>' +
                '<p class="ui-li-aside">' + item.fileType + '</p>' +
                '</a></li>');


        });
        $('#libTest').listview('refresh');
        console.log("libTestPage: getMediaList(): complete")     ;
    });








}