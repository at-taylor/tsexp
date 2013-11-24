var serviceURL = "http://216.74.49.91:8080/tssvc/resourcesS/stories/";

var employees;
var stories;

$('#employeeListPage').bind('pagebeforecreate', function(event) {
    alert('bind: pagebeforecreate');
    //getEmployeeList();
});
$('#employeeListPage').bind('pagecreate', function(event) {
    alert('bind: pagecreate');
    //getEmployeeList();
});

$('#employeeListPage').bind('pageinit', function(event) {
    alert('bind: pageinit');
    getEmployeeList();
});

$('#employeeListPage').live('pageinit', function(event) {
    alert('live: pageinit');
    getEmployeeList();
});
$('#employeeListPage').bind('pagebeforeload', function(event) {
    alert('bind: pagebeforeload');
    //getEmployeeList();
});

$('#employeeListPage').bind('pageload', function(event) {
    alert('bind: pageload');
    //getEmployeeList();
});

$('#employeeListPage').bind('pagebeforeshow', function(event) {
    alert('bind: pagebeforeshow');
    getEmployeeList();
});

$('#employeeListPage').bind('pageshow', function(event) {
    alert('bind: pageshow');
    //getEmployeeList();
});
$('#employeeListPage').bind('pagebeforechange', function(event) {
    alert('bind: pagebeforeshow');
    //getEmployeeList();
});

$('#employeeListPage').bind('pagechange', function(event) {
    alert('bind: pageshow');
    //getEmployeeList();
});

function getEmployeeList() {
   // alert('running list()')        ;


//       // $.getJSON('getstorylist.html', function(data) {
//        $.getJSON(serviceURL, function(data) {
//        $('#employeeList li').remove();
//        stories = data.storyModelList;
//        $.each(stories, function(index, story) {
//            $('#employeeList').append('<li>Id ' + story.id    +   ' </li>');
////            $('#employeeList').append('<li><a href="storydetails.html?id=' + story.id + '">' +
////                '<h4>' + story.title + '</h4>' +
////                '<p>' + story.storyDateAgeHr  + story.categoryListHr + '</p>' +'<p>' + story.status + '</p>' +
////                '</a><a href="delete"></a> </li>');
//        });
//        $('#employeeList').listview('refresh');
//    });

  /*  // local version
    $.getJSON('getstorylist.html', function(data) {
        *//*$.getJSON(serviceURL + 'getemployees.html', function(data) {*//*
        $('#employeeList li').remove();
        stories = data.items;
        $.each(stories, function(index, story) {
            $('#employeeList').append('<li><a href="storydetails.html?id=' + story.id + '">' +
                '<h4>' + story.title + '</h4>' +
                '<p>' + story.storydate  + story.categories + '</p>' +'<p>' + story.status + '</p>' +
                '</a><a href="delete"></a> </li>');
        });
        $('#employeeList').listview('refresh');
    });*/

    // local version
    $.getJSON('getstorylist.html', function(data) {
        /*$.getJSON(serviceURL + 'getemployees.html', function(data) {*/
        $('#employeeList li').remove();
        stories = data.items;
        $.each(stories, function(index, story) {
            $('#employeeList').append('<li><a href="storydetails.html?id=' + story.id + '">' +
                '<div class="ui-grid-c" style="padding-left: 10px">' +
                '<div class="ui-block-a">' + '<h3  style="white-space: normal;">' + story.title + '</h3>' + '</div>' +
                '<div class="ui-block-b">' + '<h6 style="padding-left: 60px;">' + story.storydate + '</h6>' +'</div>' +
                '<div class="ui-block-c">' + '<h6 style="padding-left: 60px;">' + story.categories + '</h6>' + '</div>' +
                '<div class="ui-block-d">' + '<h6 style="padding-left: 60px;">' + story.status + '</h6>' + '</div>' +
            '</div>' + '</a><a href="delete"></a></li>');
        });
        $('#employeeList').listview('refresh');
    });

//	$.getJSON('getemployees.html', function(data) {
//            /*$.getJSON(serviceURL + 'getemployees.html', function(data) {*/
//		$('#employeeList li').remove();
//		employees = data.items;
//		$.each(employees, function(index, employee) {
//			$('#employeeList').append('<li><a href="employeedetails.html?id=' + employee.id + '">' +
//					'<img src="pics/' + employee.picture + '"/>' +
//					'<h4>' + employee.firstName + ' ' + employee.lastName + '</h4>' +
//					'<p>' + employee.title + '</p>' +
//					'<span class="ui-li-count">' + employee.reportCount + '</span></a></li>');
//		});
//		$('#employeeList').listview('refresh');
//	});
}