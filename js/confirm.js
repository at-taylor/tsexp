/**
 * Created with IntelliJ IDEA.
 * User: tparmer
 * Date: 12/11/13
 * Time: 3:51 PM
 * To change this template use File | Settings | File Templates.
 */


var serviceURL = "http://216.74.49.91:8080/tssvc/resourcesS/media/";
//var serviceURL = "http://localhost:8080/tssvc/resourcesS/media";



$('#confirm').live('pagebeforeshow', function(event) {
    var id = getUrlVars()["id"];
    alert('hi');
    $.getJSON('confirm.html', displayEmployee);
    /*$.getJSON(serviceURL + 'getemployee.html', displayEmployee);*/
    /*$.getJSON(serviceURL + 'getemployee.php?id='+id, displayEmployee);*/

});

//$(document).on("pagebeforeshow", "#confirm", function () {
//    //get the  Id from data
//    var chapterId=  $(this).data("id");
//    //do anything you want with it.
//    $(this).find('[data-role="content"] p').html("<b>Chapter ID : </b>" +));
//});


//function displayEmployee(data) {
//    var employee = data.item;
//    console.log(employee);
//    $('#employeePic').attr('src', 'pics/' + employee.picture);
//    $('#fullName').text(employee.firstName + ' ' + employee.lastName);
//    $('#employeeTitle').text(employee.title);
//    $('#city').text(employee.city);
//    console.log(employee.officePhone);
//    if (employee.managerId>0) {
//        $('#actionList').append('<li><a href="employeedetails.html?id=' + employee.managerId + '"><h3>View Manager</h3>' +
//            '<p>' + employee.managerFirstName + ' ' + employee.managerLastName + '</p></a></li>');
//    }
//    if (employee.reportCount>0) {
//        $('#actionList').append('<li><a href="reportlist.html?id=' + employee.id + '"><h3>View Direct Reports</h3>' +
//            '<p>' + employee.reportCount + '</p></a></li>');
//    }
//    if (employee.email) {
//        $('#actionList').append('<li><a href="mailto:' + employee.email + '"><h3>Email</h3>' +
//            '<p>' + employee.email + '</p></a></li>');
//    }
//    if (employee.officePhone) {
//        $('#actionList').append('<li><a href="tel:' + employee.officePhone + '"><h3>Call Office</h3>' +
//            '<p>' + employee.officePhone + '</p></a></li>');
//    }
//    if (employee.cellPhone) {
//        $('#actionList').append('<li><a href="tel:' + employee.cellPhone + '"><h3>Call Cell</h3>' +
//            '<p>' + employee.cellPhone + '</p></a></li>');
//        $('#actionList').append('<li><a href="sms:' + employee.cellPhone + '"><h3>SMS</h3>' +
//            '<p>' + employee.cellPhone + '</p></a></li>');
//    }
//    $('#actionList').listview('refresh');


function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}