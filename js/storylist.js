/**
 * Created with IntelliJ IDEA.
 * User: tparmer
 * Date: 11/27/13
 * Time: 5:56 PM
 * To change this template use File | Settings | File Templates.
 */


var serviceURL = tsServiceURLDomain + "tssvc/resourcesS/stories";
var stories;

console.log("storyListPage js: Executing");
console.log("storyListPage: executing using services at: " + serviceURL);

$('#storyListPage').bind('pageinit', function(event) {
    //alert('live: pageinit');
    console.log('storyListPage: bind: pageinit()');

});


$(document).on('pagebeforeshow', '#storyListPage', function(){

    console.log('storyListPage: pagebeforeshow(): calling details in line');

    $('#storyListBackBtn').removeClass('ui-disabled');
    $('#storyListHomeBtn').removeClass('ui-disabled');

    $.getJSON(serviceURL, function(data) {
        $('#storyList li').remove();
        stories = data.storyModelList;
        $.each(stories, function(index, story) {
            var listItem = '<li><a href="storydetails.html?id=' + story.id + '">' +
                '<div class="ui-grid-c" style="padding-left: 10px">' +
                '<div class="ui-block-a">' + '<h3 style="white-space: normal;">' + story.title + '</h3>' + '</div>' +
                '<div class="ui-block-b">' + '<h6 style="padding-left: 60px;">' + story.storyDateAgeHr + '</h6>' +'</div>' +
                '<div class="ui-block-c">' + '<h6 style="padding-left: 60px;">' + story.categoryListHr + '</h6>' + '</div>' +
                '<div class="ui-block-d">' + '<h6 style="padding-left: 60px;">' + story.status + '</h6>' + '</div>' +
                '</div>' + '</a><a href="delete"></a></li>';

            console.log("story-list: "+ story.categoryListHr + " id: " + story.id);

            $('#storyList').append(listItem);
        });
        $('#storyList').listview('refresh');
    });

    $(document).off('click', '#storyListBackBtn').on('click', '#storyListBackBtn',function(event) {

        console.log("storyListPage: storyListBackBtn.click()");
        $('#storyListBackBtn').addClass('ui-disabled');
        $.mobile.changePage('tsnav.html');

    });

    $(document).off('click', '#storyListHomeBtn').on('click', '#storyListHomeBtn',function(event) {

        console.log("storyListage: storyListHomeBtn.click()");
        $('#storyListHomeBtn').addClass('ui-disabled');
        $.mobile.changePage('tsnav.html');

    });
});


function callbackStoryFunc(data) {
    alert("in callback");
    //alert(JSON.stringify(data));
}

function getEmployeeList() {

    console.log('storyListPage: getstoryList() running');


    console.log('storyListPage: getStoryList() completed');

}

console.log("storyListPage js: Completed");