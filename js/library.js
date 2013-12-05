/**
 * Created with IntelliJ IDEA.
 * User: tparmer
 * Date: 11/27/13
 * Time: 5:56 PM
 * To change this template use File | Settings | File Templates.
 */
var serviceURL = "http://216.74.49.91:8080/tssvc/resourcesS/media/";
//var serviceURL = "http://localhost:8080/tssvc/resourcesS/media";
//var serviceURL = "http://localhost:8080/tssvc/getstorylist2.html";

var employees;
var media;

$('#mediaListPage').bind('pagebeforecreate', function(event) {
    //alert('bind: pagebeforecreate');
    //getEmployeeList();
});
$('#mediaListPage').bind('pagecreate', function(event) {
    //alert('bind: pagecreate');
    //getEmployeeList();
});

$('#mediaListPage').bind('pageinit', function(event) {
    alert('bind: pageinit');
    getMediaList();
});

$('#mediaListPage').live('pageinit', function(event) {
    alert('live: pageinit');
    getMediaList();
});
$('#mediaListPage').bind('pagebeforeload', function(event) {
    //alert('bind: pagebeforeload');
    //getEmployeeList();
});

$('#mediaListPage').bind('pageload', function(event) {
    //alert('bind: pageload');
    //getEmployeeList();
});

$('#mediaListPage').bind('pagebeforeshow', function(event) {
    //alert('bind: pagebeforeshow');
    //getEmployeeList();
});

$('#mediaListPage').bind('pageshow', function(event) {
    //alert('bind: pageshow');
    //getEmployeeList();
});
$('#mediaListPage').bind('pagebeforechange', function(event) {
    //alert('bind: pagebeforeshow');
    //getEmployeeList();
});

$('#mediaListPage').bind('pagechange', function(event) {
    //alert('bind: pageshow');
    //getEmployeeList();
});

function callbackStoryFunc(data) {
    alert("in callback");
    //alert(JSON.stringify(data));
}

function getMediaList() {
    alert('running list()7')        ;


    $.getJSON(serviceURL, function(data) {
        $('#mediaList li').remove();
        media = data.mediaModelList;
        $.each(media, function(index, item) {
            $('#mediaList').append('<li><a href="storydetails.html?id=' + item.id + '">' +

                '<div class="ui-grid-c" style="padding-left: 10px">' +
                '<div class="ui-block-a">' + '<img height="80" width="80" src= '+ item.url +'>' + '</div>' +
                '<div class="ui-block-b">' + '<h3  style="white-space: normal;">' + item.title + '</h3>' +'</div>' +
                '<div class="ui-block-c">' + '<h6 style="padding-left: 60px;">' + item.createdHr + '</h6>' + '</div>' +
                '<div class="ui-block-d">' + '<h6 style="padding-left: 60px;">' + item.fileType + '</h6>' + '</div>' +
                '</div>' + '</a><a href="delete"></a></li>');
        });
        $('#mediaList').listview('refresh');
    });








}