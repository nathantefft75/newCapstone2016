function loadReports(){
	loadNew();
	loadReported();

}
function loadNew()
{
		$.getJSON( "php/adminPhp.php", { action:"listNew"})
	.done(function(json){
		fillNew(json);
		});
}
function fillNew(json)
{
	var count = 0;
	var str ="<table class = 'adminTable'><tr><td>First Name</td><td>User ID</td><td> Last Name</td></tr>";
	for(i=0; i<json.Result.length; i++)
	{
	str+= "<tr><td>"+json.Result[i].firstName + "</td><td> " + json.Result[i].userID + "</td><td> " + json.Result[i].lastName +"</td><td><input type='button' class='buttonTest' id='suspendBtn_"+ i +"'onclick ='singleRecord("+json.Result[i].userID+")' value='View' action='#'></td></tr>";

	
	count = i+1;
	}
	
	str+="</table>";
	$('#reviewDiv').html(str);
	var strrr = "# Of New Profiles To be Checked:" + count;
	$('#newUserHeader').html(strrr);
}
function singleRecord(ids)
{
	 localStorage.setItem("NewUserID", ids );
	setTimeout(function () {
					window.location = "adminViewer.html";
					}, 100);
}
function loadReported()
{
		$.getJSON( "php/adminPhp.php", { action:"listReported"})
	.done(function(json){
		fillReported(json);
		});
}
function fillReported(json)
{
		var count = 0;
	var str ="<table class = 'adminTable'><tr><th>First Name</th><th>User ID</th><th> Last Name</th></tr>";
	for(i=0; i<json.Result.length; i++)
	{
	str+= "<tr><td>"+json.Result[i].firstName + "</td><td> " + json.Result[i].userID + "</td><td> " + json.Result[i].lastName +"</td><td><input type='button' class='buttonTest' id='suspendBtn_"+ i +"'onclick ='singleRecord("+json.Result[i].userID+")' value='View' action='#'></td></tr>";

	
	count = i+1;
	}
	
	str+="</table>";
	$('#reportedDiv').html(str);
	var strrr = "# Of Reported Profiles:" + count;
	$('#reportedUserHeader').html(strrr);
}
function resetLocalStorage()
{
	 localStorage.setItem("userID", "" );
}
function pageSecurity(json)
{
	var ls = localStorage.getItem("userID");
		if(ls == 101 )
	{
		loadReports();
	}
	else
	{
		window.location = "index.html";
	}
}
$(document).ready(function(){
	$("#logout").click(function(){
		resetLocalStorage();
		setTimeout(function () {
					window.location = "index.html";
					}, 100);
	});		
}); 
$(window).load(function(){
	var ls = localStorage.getItem("userID");
 console.log(ls);
		$.getJSON( "php/adminPhp.php", { action:"checkAdmin", ls})
	.done(function(json){
		pageSecurity(json);
		});
	
	
});

