
console.log("storyNarratePage storyNarrate.js: Executing");

$(document).on('pageinit', '#storyNarratePage', function(){

    console.log("storyNarratePage: pageinit(): begin");

    // initialize the rich text control
//    console.log("storyNarratePage: pageinit(): Initializing player control");
//
//    $('#jquery_jplayer_1').jPlayer({
//        ready: function (event) {
//            $(this).jPlayer("setMedia", {
////                        m4a:"http://www.jplayer.org/audio/m4a/TSP-01-Cro_magnon_man.m4a",
////                        oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg"
//                wav: "G2MTestSound.wav" //fileName
//            });
//        },
//        swfPath: "js",
//        //supplied: "m4a, oga",
//        supplied: "wav",
//        wmode: "window",
//        smoothPlayBar: true,
//        keyEnabled: true
//    });


    console.log("storyNarratePage: pageinit(): end");
});

$(document).on('pagebeforeshow', '#storyNarratePage', function(){

    console.log("storyNarratePage: pagebeforeshow(): begin");

    $('#storyNarrateBackBtn').removeClass('ui-disabled');
    $('#storyNarrateNextBtn').removeClass('ui-disabled');

    $('#narrateAudioJsDebugArea').val("");

    audioInitialize("narrateStartRecID", "narrateStopRecID", "narrateMediaAudioPlayCtl", "jquery_jplayer_1", "narrateRecStatusID", "narrateRecPos","storyAudioUrl", "narrateAudioJsDebugArea");

    var audioUrl = sessionStorage.getItem("storyAudioUrl");
    console.log("storyNarratePage: Checking for existing session Audio Url.  Session value: " + audioUrl);
    if (audioUrl != null)   // reset the player's file
        audioSetPlayerFileName( "jquery_jplayer_1", audioUrl);
    
    // Event Handlers

    $(document).off('click', '#storyNarrateBackBtn').on('click', '#storyNarrateBackBtn',function(event) {

        $('#storyNarrateNextBtn').addClass('ui-disabled');
        $('#storyNarrateBackBtn').addClass('ui-disabled');

        console.log("storyNarratePage: storyNarrateBackBtn: onclick()");

        $.mobile.changePage('storyeditnew.html');
    });

    $(document).off('click', '#storyNarrateNextBtn').on('click', '#storyNarrateNextBtn',function(event) {

        $('#storyNarrateNextBtn').addClass('ui-disabled');
        $('#storyNarrateBackBtn').addClass('ui-disabled');

        console.log("storyNarratePage: storyNarrateNextBtn: onclick()");

        $.mobile.changePage('storypreview2.html');

    });
    console.log("storyNarratePage: pagebeforeshow(): begin");    

});