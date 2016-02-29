var str = "";
function insertLanding()
{			
	$.getJSON( "php/php_queries.php", { action: "insertLanding", email: $('#txtEmail').val(), firstName:$('#txtFirstName').val(), lastName:$('#txtLastName').val(), pw:$('#txtPw').val()} );
	
}
function addBasicInfo()
{
	var phoneNumber1 = $('#txtPhoneNumber1').val();
	var phoneNumber2 = $('#txtPhoneNumber2').val();
	var phoneNumber3 = $('#txtPhoneNumber3').val();
	var phoneNumbers = "("+phoneNumber1 + ")"+ phoneNumber2 +"-"+ phoneNumber3;
	var ls = localStorage.getItem("userID");
	
	$.getJSON( "php/php_queries.php", { action: "addBasicInfo", userID: ls, city: $('#txtCity').val(), state: $('#state').val(), zip: $('#txtZipCode').val(), phoneNumber: phoneNumbers, videoLink: $('#txtLink').val()} );
}
function setLocal()
{
		$.getJSON( "php/php_queries.php", { action: "setCookie", email: $('#txtEmail').val(), pw:$('#txtPw').val()} )
		 .done(function( json ) {
			 setLocalStorage(json);
	});
	
}
function setLocalStorage(json)
{	//Jay will update!
	  if(window.localStorage)
	  {
	  localStorage.setItem("userID", json.Result.userID );
			 var ls = localStorage.getItem("userID");
			
			window.location = "basicInfo2.html";
	  }
	
}
//////login//////
function loginTest()
{            
	$.getJSON( "php/php_queries.php", { action: "loginUser", email: $('#txtLoginUsername').val(), pw:$('#txtLoginPassword').val()} )
		 .done(function( json ) {
	  finalUserTest(json);
	});
}

function finalUserTest(json)
{
	$('#emptyLogin').hide();
	$('#invalidLogin').show();

    if( json.Result == false )
    {	cosnole.log('hi');
       $('#invalidLogin').show();	
    }
    else
    {
		setLocalOldUser();
        
	
    }
}	
function setLocalOldUser()
{
	
		$.getJSON( "php/php_queries.php", { action: "setCookie", email: $('#txtLoginUsername').val(), pw:$('#txtLoginPassword').val()} )
		 .done(function( json ) {
			 setLocalStorageOldUser(json);
	});
	
}
function  setLocalStorageOldUser(json)
{	//Jay will update!
	  if(window.localStorage)
	  {
	  localStorage.setItem("userID", json.Result.userID );
			 var ls = localStorage.getItem("userID");
			
			
	  }
	  var adminCheck = json.Result.isAdmin;
		console.log(adminCheck);
	  
	  if ( adminCheck == true)
	  {
		    window.location = "adminPage.html";
	  }
	  else
	  {
		  window.location = "myresume.html";
	  }
	
}
function pullStates(){
	
	$.getJSON( "php/php_queries.php", { action:"getStates" } )
		.done(function( json ) {
			fillInStates(json);
		});
}

function fillInStates(json){
	str = "";
	
	str += "<select id=state name=state>";
	
	for (i=0;i<json.Result.length; i++)
	{
		str += "<option value='" + json.Result[i].stateAbbr + "'>" + json.Result[i].stateAbbr + "</option>";
	}
	str += "</select>";
	
	$('#showStates').append(str);
}

function pullDates(){
		$.getJSON( "php/php_queries.php", { action:"getMonths" } )
		.done(function( json ) {
			console.log("months1");
			fillInMonths(json);
		});
		$.getJSON( "php/php_queries.php", { action:"getYears" } )
		.done(function( json ) {
                    console.log("years1");
			fillInYears(json);
		});
}

function fillInMonths(json){
	/*fill in months drop down list*/
        console.log("months2");
	for (x=0;x<json.Result.length; x++)
	{
		console.log(x);
	}
}

function fillInYears(json){
	/*fill in years drop down list*/
        console.log("years2");
	for (y=0;y<json.Result.length; y++)
	{
		console.log(y);
	}
}
function checkEmail()
{
	
		$.getJSON( "php/php_queries.php", { action: "checkEmail", email: $('#txtEmail').val()} )
		 .done(function( json ) {
			
	  secondEmailStage(json);
	});
	


}
///////////////////////////functioon to test new users email vs old users////////////////////////////////////////
function secondEmailStage(json)
{
	
		
			
            if(json.Result === false)
			{
				
				insertLanding();
					setTimeout(function () {
						setLocal();
					}, 100);
				
			}
			else
			{
				alert("Email is already in use!");
				
			}
	
	
}
////////////////////////////// school page functions///////////////////////////////////////////////////
function addSingleSchool()
{
		 var ls = localStorage.getItem("userID");
	$.getJSON( "php/php_queries.php", { action:"addEducation", userID: ls, school: $('#txtSchoolName').val(), degree: $('#txtDegree').val(), startMonth: $('#txtStartMonth').val(), startYear: $('#txtStartYear').val(), endMonth: $('#txtEndMonth').val(), endYear: $('#txtEndYear').val(), GPA: $('#txtGPA').val() } );
	
}
function listSchools()
{
	var ls = localStorage.getItem("userID");
	$.getJSON( "php/php_queries.php", { action:"listEducation", userID: ls})
	.done(function(json){
		listSchoolsSecondStage(json);
		});
		
}

function listSchoolsSecondStage(json)
{
	var str = "";
		for (i=0; i<json.Result.length; i++) {
			str += "<tr>";
			str += "<td>" + json.Result[i].school + "</td>";
			str += "<td>" + json.Result[i].degree + "</td>";
			str += "</tr>";
		
		}
		$('#schoolsDiv').html(str);
}
////////////////////////////////// employer page functions//////////////////////////////////////
function addSingleEmployer()
{
		 var ls = localStorage.getItem("userID");
	$.getJSON( "php/php_queries.php", { action:"addEmployer", userID: ls, employerName: $('#txtEmpName').val(), position: $('#txtPosition').val(), startMonth: $('#txtStartMonth').val(), startYear: $('#txtStartYear').val(), endMonth: $('#txtEndMonth').val(), endYear: $('#txtEndYear').val(), empLink: $('#txtEmpLink').val(), responsibilities: $('#txtResp').val() } );
	
}
function listEmployers()
{
	//console.log("listEmployers");
	var ls = localStorage.getItem("userID");
	$.getJSON( "php/php_queries.php", { action:"listEmployer", userID: ls})
	.done(function(json){
		listEmployersSecondStage(json);
		});
}
function listEmployersSecondStage(json)
{
		//console.log("STARTlistEmployersSecondStage");
		var str = "";
		for (i=0; i<json.Result.length; i++) {
			str += "<tr>";
			str += "<td>" + json.Result[i].employerName + "</td>";
			str += "<td>" + json.Result[i].position + "</td>";
			str += "</tr>";
		
		}
		$('#companiesDiv').html(str);
		//console.log("LAST");
}


$(document).ready(function(){
	$('#emptyLogin').hide();
	$('#invalidLogin').hide();
	$("#btnLogin").click(function()
	{
		$('#emptyLogin').hide();
		$('#invalidLogin').hide();
		if($('#txtLoginUsername').val() != ''){
			$('#emptyLogin').hide();			
			loginTest();
		} else {
			console.log('hi');
			$('#emptyLogin').show();	
		}
		
		
	});
/**********************************************/	
	$("#btnRegister").click(function()
	{
		checkEmail();
		/*insertLanding();

		setTimeout(function () {
			setLocal();
		}, 100);*/
			
		
		
		//window.location = "basicInfo2.html";
		
	});	
	
	$("#btnNext-Edu").click(function()
	{
		/* PHP insert basic info */
		addBasicInfo();
				setTimeout(function () {
					window.location = "education.html";
				
					}, 100);
		
	});	
	$("#btnAddSchool").click(function()
	{
		addSingleSchool();
		setTimeout(function () {
					listSchools();
					}, 100);
	});	
	$("#btnNext-Emp").click(function()
	{
		/* PHP insert education */
		
					window.location = "employer.html";
				
		
	});	
		$("#btnAddEmployer").click(function()
	{
		addSingleEmployer();
		setTimeout(function () {
					listEmployers();
					}, 100);
	});	
	$("#btnFinish").click(function()
	{
	
		window.location = "myresume.html";
	});
	
	
/************************************************/			
}); 


