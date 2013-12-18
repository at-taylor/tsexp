/**
 * Created with IntelliJ IDEA.
 * User: tparmer
 * Date: 12/9/13
 * Time: 5:05 PM
 * To change this template use File | Settings | File Templates.
 */
console.log("logout js: Executing");


$('#MainNavPage').live('pageinit', function(event) {
    alert('MainNavPage live: pageinit');
    console.log("logout js: binding click function on #login_submit");

    $("#logout_submit").click(function(event) {
        alert('you clicked the logout button');

        $.ajax({
            type: "GET",
//            url: "http://216.74.49.91:8080/tssvc/resourcesS/logout",
            url: "http://localhost:8080/tssvc/resourcesS/logout",
            //data:'user='+ $('#user').val() +'&pass='+ $('#pass').val(),
            cache: false,
            success: function(data) {
                //validate the response here, set variables... whatever needed
                //and if credentials are valid, forward to the next page
                alert ("in success");
                //alert("data is" + data)   ;
                $.mobile.changePage("index.html");
                //or show an error message
            },
            done: function (data) {
                alert("done : " + data);
            },
//            error: function(data) { // server couldn't be reached or other error
//                alert("Please try again");
//                alert("data: " + data);
//                $.mobile.changePage("index2.html");
//            }
            error: function(xhr, status, error) {
                alert("in error");
                alert("status: " + status) ;
                alert("error: " + error);
                alert(xhr.responseText);
            }
        })
    })
});
