var serviceURL = "http://localhost/emp/services/";

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
        $.getJSON('getstorylist.html', function(data) {
        /*$.getJSON(serviceURL + 'getemployees.html', function(data) {*/
        $('#employeeList li').remove();
        stories = data.items;
        $.each(stories, function(index, story) {
            $('#employeeList').append('<li><a href="storydetails.html?id=' + story.id + '">' +
                '<h4>' + story.title + '</h4>' +
                '<p>' + story.storydate + '</p>' +
                '<p>' + story.categories + '</p>' +
                '<p>' + story.status + '</p>' +
                '</a></li>');
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