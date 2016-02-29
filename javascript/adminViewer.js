//fill user
function loadUser()
{
	var ls = localStorage.getItem("NewUserID");
		$.getJSON( "php/php_queries.php", { action:"fillUser", userID: ls})
	.done(function(json){
		fillUser(json);
		});
}
function fillUser(json)
{
	var str = "";
	str+= "<table><tr><td>"+json.Result[0].firstName + "</td><td> " + json.Result[0].userID + "</td><td> " + json.Result[0].lastName +"</td></tr>";
	str += "<tr><td>"+json.Result[0].city + "</td><td> " + json.Result[0].state + "</td><td> " + json.Result[0].zip + "</td><td> " + json.Result[0].phoneNumber + "</td></tr>";
	str+= "<tr><td> Admin:" + json.Result[0].isAdmin + "</td><td> Active: " + json.Result[0].isActive + "</td><td> Reported:" + json.Result[0].isReported + "</td><td> New: " + json.Result[0].isNew +"</td></tr>";
	str+="</table>";
	$('#User').html(str);
	var reported = json.Result[0].isReported;
	if(reported == true)
	{
		console.log("hi");
		var strr = '<input type="button" class="buttonTest" id="btnAccept" onclick ="btnSuspend()" value="Suspend" action="#"><input class="buttonTest" type="button" id="btnDecline" onclick ="btndeclineReport()"value="Decline" action="#">';
	}
	else
	{
		console.log("bye");
		var strr = '<input type="button" class="buttonTest" id="btnAccept" onclick ="btnAccept()" value="Accept" action="#"><input class="buttonTest" type="button" id="btnDecline" onclick ="btnDecline()" value="Decline" action="#">';
	}
	$('#buttons').html(strr);
}
//fill cover
function loadCover(){
	var ls = localStorage.getItem("NewUserID");
	
	$.getJSON( "php/php_queries.php", { action:"fillCover", userID: ls } )
	.done(function(json){
		fillCover(json);
		});
}
function fillCover(json){
	var coverLett = "<h4> Cover Letter </h4>";
		 coverLett += json.Result[0].coverLetter;
		if(coverLett.length !=0 || coverLett.length != null )
		{
			$('#Cover').html(coverLett);
		}
	}
//fill Video
function loadVideo(){
	var ls = localStorage.getItem("NewUserID");
	
	$.getJSON( "php/php_queries.php", { action:"fillVideo", userID: ls } )
	.done(function(json){
		
		fillVideo(json);
		
		});
	
	
}
function fillVideo(json){

	
	if(json.Result == false)
	{
	console.log(json.Result);
	}
	else
	{
		var videoLin = 'https://youtu.be/' + json.Result.videoLink;
	$("#txtLink").val(videoLin);
	var vidFrame = '<iframe width="450" height="253" src="https://www.youtube.com/embed/' + json.Result.videoLink + '?rel=0" frameborder="0" allowfullscreen></iframe>'
	$("#Video").html(vidFrame);
	}

}
function accept()
{
	var ls = localStorage.getItem("NewUserID");
				$.getJSON( "php/php_queries.php", { action:"acceptUser", userID: ls})
}
function decline()
{
	var ls = localStorage.getItem("NewUserID");
				$.getJSON( "php/php_queries.php", { action:"declineUser", userID: ls})
}
function suspend()
{
	var ls = localStorage.getItem("NewUserID");
				$.getJSON( "php/php_queries.php", { action:"suspendUser", userID: ls})
}
function declineReport()
{
	var ls = localStorage.getItem("NewUserID");
				$.getJSON( "php/php_queries.php", { action:"declineReport", userID: ls})
}
function btnAccept()
{
		accept();
			setTimeout(function () {
					window.location = "adminPage.html";
					}, 100)	
				
	}
function btnDecline()
{
				decline();
				setTimeout(function () {
					window.location = "adminPage.html";
					}, 100)	
	
}
function btnSuspend()
{
	suspend();
				setTimeout(function () {
					window.location = "adminPage.html";
					}, 100)	
}
function btndeclineReport()
{
	declineReport();
				setTimeout(function () {
					window.location = "adminPage.html";
					}, 100)	
}
function loadEducation()
{
var ls = localStorage.getItem("NewUserID");
	//ls = 113;
	$.getJSON( "php/php_queries.php", { action:"listEducation", userID: ls})
	.done(function(json){
		listSchoolsSecondStage(json);
		});
	
}
function listSchoolsSecondStage(json)
{
	
		var str = "<tr><th>Education History</th></tr>";
	
		for (i=0; i<json.Result.length; i++) {
			str += "<tr>";
			str += "<td>" + json.Result[i].school + "</td>";
			str += "<td>" + json.Result[i].degree + "</td>";
			
			
			str += "</tr>";
			console.log("k");
			
		}
	
		$('#Education').html(str);
}
function loadEmployer()
{
	var ls = localStorage.getItem("NewUserID");
	
	$.getJSON( "php/php_queries.php", { action:"listEmployer", userID: ls})
	.done(function(json){
		listEmployersSecondStage(json);
		});
}
function listEmployersSecondStage(json)
{
		var str = "<tr><th>Employment History</th></tr>";
		for (i=0; i<json.Result.length; i++) {
			str += "<tr>";
			str += "<td>" + json.Result[i].employerName + "</td>";
			str += "<td>" + json.Result[i].position + "</td>";
			
			str += "</tr>";
		
		}
		$('#Employer').html(str);
}
$(window).load(function(){
	loadUser();
	loadCover();
	loadVideo();
	loadEducation();
	loadEmployer();
	
	
	
	
});