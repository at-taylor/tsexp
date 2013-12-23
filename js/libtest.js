/**
 * Created with IntelliJ IDEA.
 * User: tparmer
 * Date: 11/27/13
 * Time: 5:56 PM
 * To change this template use File | Settings | File Templates.
 */
//var serviceURL = "http://216.74.49.91:8080/tssvc/resourcesS/media/";
var serviceURL = "http://localhost:8080/tssvc/resourcesS/media";
//var serviceURL = "http://localhost:8080/tstest/getmedialist.html";

var employees;
var media;

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
            $('#libTest').append('<li><a href="storydetails.html?id=' + item.id + '">' +
                '<img src= '+ item.url +'>' +
                '<h2>' + item.title + '</h2>' +
                '<p>' + item.createdHr + '</p>' +
                '<p class="ui-li-aside">' + item.fileType + '</p>' +
                '</a></li>');


        });
        $('#libTest').listview('refresh');
        console.log("libTestPage: getMediaList(): complete")     ;
    });








}