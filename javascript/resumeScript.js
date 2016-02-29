/*resumeScript page is the static page that is viewable only. No editing can be done on this page*/

////slice url
function searchLink(){
		var linkID = window.location.search;
		if(linkID.charAt(0)=== '?')
		{
			linkID = linkID.slice(1);
		}
			
		
		$.getJSON( "php/php_queries.php", { action:"searchLink", linkID: linkID})
	.done(function(json){
		direct(json);
		});
}
//direct
function direct(json){
	
	
	if(json.Result == false){
		window.location = "index.html";
	}
	else{
		
			 localStorage.setItem("userID", json.Result.userID );
		pullBasic();
			
		
		
	}
}
//pull all data from user
function pullBasic()
{
	var ls = localStorage.getItem("userID");
		$.getJSON( "php/php_queries.php", { action:"fillUser", userID: ls})
	.done(function(json){
		fillBasic(json);
		});
}
////fill title box
function fillBasic(json){
	var active = json.Result[0].isActive
	if(active == 0)
	{
		window.location = "index.html";
	}
	else
	{
		var str ="";
	str+= "<table><tr><td><p>"+json.Result[0].firstName + " " + json.Result[0].lastName +"</p></td></tr>"
	str+="<tr><td><p>" + json.Result[0].phoneNumber + json.Result[0].email + "</p></td></tr>";

	str+="<tr><td><p>" + json.Result[0].city + " " + json.Result[0].state +", " + json.Result[0].zip + "</p></td></tr>";
	str+="</table>";
	$('#meBasic').html(str);
	}
	
	
}
$(window).load(function(){
	searchLink();
	
});