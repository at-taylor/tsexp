
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
$(document).on('pagebeforeshow', '#mediaLibGridPage', function(){
    // alert('bind: pageinit');
    console.log("mediaLibGridPage: pagebeforeshow");

    $('#mediaLibGridBackBtn').removeClass('ui-disabled');

    $.getJSON(tsServiceURLDomain + "tssvc/resourcesS/media", function(data) {

        console.log("mediaLibGridPage: pagebeforeshow: removing list items");
        $('#mediaLibGridList li').remove();

        media = data.mediaModelList;
        //console.log("media object");
        //console.log(media);

        console.log("mediaLibGridPage: pagebeforeshow: pulled list about to iterate");
        $.each(media, function(index, item) {

//            console.log("url?" + item.url);

            var videoOrImageTag;
            if ((item.fileType == "mp4")   || (item.fileType == "mov") || (item.fileType == "MOV"))
               // videoOrImageTag = '<video ><source  type="video/mp4" src=' + item.url + '></video>'
                videoOrImageTag =  "<img src='img/navbut/blank-video.jpg''>"
            else
                videoOrImageTag =  '<img src= '+ item.url +'>'

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

    $(document).off('click', '#mediaLibGridBackBtn').on('click', '#mediaLibGridBackBtn',function(event) {

        console.log("mediaLibGridPage: mediaLibGridBackBtn.click()");
        $('#mediaLibGridBackBtn').addClass('ui-disabled');
        $.mobile.changePage('tsnav.html');

    });

});


