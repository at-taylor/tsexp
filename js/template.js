/**
 * Created with IntelliJ IDEA.
 * User: tparmer
 * Date: 11/27/13
 * Time: 12:21 PM
 * To change this template use File | Settings | File Templates.
 */

//var serviceURL = "http://216.74.49.91:8080/tssvc/resourcesS/stories/";
//var serviceURL = "http://localhost:8080/tssvc/resourcesS/stories";
//var serviceURL = "http://localhost:8080/tssvc/getstorylist2.html";

//var employees;
//var stories;

$('#templatePage').bind('pagebeforecreate', function(event) {
    alert('bind: pagebeforecreate');
    getEmployeeList();
});
$('#templatePage').bind('pagecreate', function(event) {
    alert('bind: pagecreate');
    getEmployeeList();
});

$('#templatePage').bind('pageinit', function(event) {
    alert('bind: pageinit');
    getEmployeeList();
});

$('#templatePage').live('pageinit', function(event) {
    alert('live: pageinit');
    getEmployeeList();
});
$('#templatePage').bind('pagebeforeload', function(event) {
    alert('bind: pagebeforeload');
    getEmployeeList();
});

$('#templatePage').bind('pageload', function(event) {
    alert('bind: pageload');
    //getEmployeeList();
});

$('#templatePage').bind('pagebeforeshow', function(event) {
    alert('bind: pagebeforeshow');
    //getEmployeeList();
});

$('#templatePage').bind('pageshow', function(event) {
    alert('bind: pageshow');
    //getEmployeeList();
});
$('#templatePage').bind('pagebeforechange', function(event) {
    alert('bind: pagebeforeshow');
    //getEmployeeList();
});

$('#templatePage').bind('pagechange', function(event) {
    alert('bind: pageshow');
    //getEmployeeList();
});

