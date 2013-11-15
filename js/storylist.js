var serviceURL = "http://localhost/emp/services/";

var stories;

$('#storyListPage').bind('pageinit', function(event) {
    getStoryList();
});

function getStoryList() {
    $.getJSON('getstorylist.html', function(data) {
        /*$.getJSON(serviceURL + 'getemployees.html', function(data) {*/
        $('#storyList li').remove();
        stories = data.items;
        $.each(stories, function(index, story) {
            $('#storyList').append('<li><a href="storydetails.html?id=' + story.id + '">' +
                '<h4>' + story.title + '</h4>' +
                '<p>' + story.storydate + '</p>' +
                '<p>' + story.categories + '</p>' +
                '<p>' + story.status + '</p>' +
                '</a></li>');
        });
        $('#storyList').listview('refresh');
    });
}