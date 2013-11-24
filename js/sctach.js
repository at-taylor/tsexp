// Test version for local embeeded
var storyList = {"storyModelList": [
    {"id":223,
        "title":"Programatically Created Story",
        "createdEpoch":1383856440,
        "createdHr":"11/07/2013",
        "updatedEpoch":1385142286,
        "updatedHr":"11/22/2013",
        "descr":"<p>My story <b> content </b>.</p>\n",
        "excerpt":null,
        "categoryList":{"1":"Love","2":"Work","3":"Family","4":"Friends","6":"Spirituality","12":"Marriage"},
        "categoryListHr":"Love, Work, Family, Friends, Spirituality, Marriage",
        "recordingUrl":"http://app.treasuredstories.com/uploaded/media/audio/audio-attachment-storyid-223-1052072947-1383860040.wav",
        "archived":0,
        "age":"1",
        "storyDateAgeHr":"01/14/1930 (1)",
        "status":"Published"},
    {"id":22,
        "title":"Programatically Created Story2",
        "createdEpoch":1383856440,
        "createdHr":"11/07/2013",
        "updatedEpoch":1385142286,
        "updatedHr":"11/22/2013",
        "descr":"<p>My story <b> content </b>.</p>\n",
        "excerpt":null,
        "categoryList":{"1":"Love","2":"Work","3":"Family","4":"Friends","6":"Spirituality","12":"Marriage"},
        "categoryListHr":"Love, Work, Family, Friends, Spirituality, Marriage",
        "recordingUrl":"http://app.treasuredstories.com/uploaded/media/audio/audio-attachment-storyid-223-1052072947-1383860040.wav",
        "archived":0,
        "age":"1",
        "storyDateAgeHr":"01/14/1930 (1)",
        "status":"Published"}
]
};

//    $('#employeeList li').remove();
//    $.each(storyList.storyModelList, function(index, value) {
//        $('#employeeList').append('<li>' + value.id + ': ' + value.title + '</li>');
//    });
//    $('#employeeList').listview('refresh');

// a jsonp try


//$.getJSON('getstorylist2.html', function(data) {
//
//   alert("pull from url: " + serviceURL);
//
//    (function($) {
//        $.ajax({
//            type: 'GET',
//            url: serviceURL,
//            async: false,
//            jsonpCallback:   'callbackStoryFunc',
//            dataType: 'jsonp',
//            success: function(json) {console.log("ok");},
//            error: function(e) { alert(e.message); }
//        })      ;
//    })(jQuery);