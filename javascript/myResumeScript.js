/*MyResumeScript page is the editable page where the account holder can make changes to the page*/

function pullStatesAndDates(){}

function toggle(num){
	if(num == 1){
		$("#editMePicture").toggle();
	}else if(num == 2){
		$("#basicEditWrap").toggle();
	}else if(num == 3){
		$("#editVideo").toggle();
	}else if(num == 4){
		$("#editCover").toggle();
	}else if(num == 5){
		$("#editEdu").css("top", "0px");
		eduClearBoxes();
		$("#editEdu").toggle();
		
	}else if(num == 6){
		$("#editEmp").css("top", "0px");
		clearEmpBoxes();
		$("#editEmp").toggle();
	}else if(num == 7){
		$("#linkGen").toggle();
	}
}
////////// load page/////////////////////////////
////////////////load Basic Info/////////////////////////////////////////////////

function fillBasic(json){
	var fName = json.Result[0].firstName;
	$("#txtFirstName").val(fName);
	var lName = json.Result[0].lastName;
	$("#txtLastName").val(lName);
	var email = json.Result[0].email;
	$("#txtEmail").val(email);
	var city = json.Result[0].city;
	$("#txtCity").val(city);
	var state = json.Result[0].state;
	$("#state").val(state);
	var zip = json.Result[0].zip;
	$("#txtZipCode").val(zip);
	var phoneNum = json.Result[0].phoneNumber;
	var phone1 = phoneNum.slice(1,4);
	var phone2 = phoneNum.slice(5,8);
	var phone3 = phoneNum.slice(9,13);
	$("#txtPhoneNumber1").val(phone1);
	$("#txtPhoneNumber2").val(phone2);
	$("#txtPhoneNumber3").val(phone3);
}
//Load Education///////////////////////////////////////////////////////////////
function loadEducation(eduId){
	$.getJSON( "php/php_queries.php", { action:"fillEducation", eduID: eduId } )
	.done(function(json){
		fillEducation(json);
		$("#btnEditSchool").show();
		//$("#btnEditSchool").enable();
		$("#btnAddSchool").hide();
		//$("#btnAddSchool").disable();
		
		});
	
	
}
function fillEducation(json){
	var schoolName = json.Result[0].school;
	$("#txtSchoolName").val(schoolName);
	var degreeProgram = json.Result[0].degree;
	$("#txtDegree").val(degreeProgram);
	var startEdMonth = json.Result[0].startDateMonth;
	$("#txtEdStartMonth").val(startEdMonth);
	var startEdYear = json.Result[0].startDateYear;
	$("#txtEdStartYear").val(startEdYear);
	var endEdMonth = json.Result[0].endDateMonth;
	$("#txtEdEndMonth").val(endEdMonth);
	var endEdYear = json.Result[0].endDateYear;
	$("#txtEdEndYear").val(endEdYear);
	var gpa = json.Result[0].GPA;
	$("#txtGPA").val(gpa);
	var eduId = json.Result[0].eduID;
	localStorage.setItem("eduId", eduId);
}

function eduClearBoxes(){

	$("#txtSchoolName").val("");
	$("#txtDegree").val("");
	$("#txtEdStartMonth").val("January");
	$("#txtEdStartYear").val("2010");
	$("#txtEdEndMonth").val("January");
	$("#txtEdEndYear").val("2010");
	$("#txtGPA").val("");
	$("#btnEditSchool").hide();
	//$("#btnEditSchool").disable();
	$("#btnAddSchool").show();
	//$("#btnAddSchool").enable();
	localStorage.setItem("eduId", 0);
	
}
//Load Employer/////////////////////////////////////////////////////////////////////
function loadEmployer(empId){
	$.getJSON( "php/php_queries.php", { action:"fillEmployer", empID: empId } )
	.done(function(json){
		fillEmployer(json);
				$("#btnEditEmployer").show();
		//$("#btnEditSchool").enable();
		$("#btnAddEmployer").hide();
		//$("#btnAddSchool").disable();
		
		});
	
	
}

function fillEmployer(json){
	var employerName = json.Result[0].employerName;
	$("#txtEmpName").val(employerName);
	var position = json.Result[0].position;
	$("#txtPosition").val(position);
	var startEmpMonth = json.Result[0].startDateMonth;
	$(".txtEmpStartMonth").val(startEmpMonth);
	var startEmpYear = json.Result[0].startDateYear;
	$(".txtEmpStartYear").val(startEmpYear);
	var endEmpMonth = json.Result[0].endDateMonth;
	$(".txtEmpEndMonth").val(endEmpMonth);
	var endEmpYear = json.Result[0].endDateYear;
	$(".txtEmpEndYear").val(endEmpYear);
	var empLin = json.Result[0].empLink;
	$("#txtEmpLink").val(empLin);
	var resp = json.Result[0].responsibilities;
	$("#txtResp").val(resp);
	
}

function clearEmpBoxes(){

$("#txtEmpName").val("");
	
	$("#txtPosition").val("");
	
	$(".txtEmpStartMonth").val("January");
	
	$(".txtEmpStartYear").val("2010");
	
	$(".txtEmpEndMonth").val("January");

	$(".txtEmpEndYear").val("2010");

	$("#txtEmpLink").val("");

	$("#txtResp").val("");
	$("#btnEditEmployer").hide();
	//$("#btnEditSchool").disable();
	$("#btnAddEmployer").show();
	//$("#btnAddSchool").enable();
}

function loadVideo(){
	var ls = localStorage.getItem("userID");
	//ls = 113;
	$.getJSON( "php/php_queries.php", { action:"fillUser", userID: ls } )
	.done(function(json){
		fillVideo(json);
		});
	
	
}
function fillVideo(json){
	var videoLin = 'https://youtu.be/' + json.Result[0].videoLink;
	$("#txtLink").val(videoLin);
	var vidFrame = '<iframe width="450" height="253" src="https://www.youtube.com/embed/' + json.Result[0].videoLink + '?rel=0" frameborder="0" allowfullscreen></iframe>'
	$("#vidEmbed").append(vidFrame);

}

function updateVid(){
	var updateLinkBefore = $("#txtLink").val();
	if(updateLinkBefore.indexOf("https://youtu.be/") >= 0){
		var updateLinkAfter = updateLinkBefore.slice(17,28);
			if(updateLinkAfter.length == 11){
				console.log(updateLinkAfter);
				sendVid(updateLinkAfter);
			}
			else{
				alert("empty 1 link");
			}
		
	}
	else if(updateLinkBefore.indexOf("http://youtu.be/") >= 0){
		var updateLinkAfter = updateLinkBefore.slice(16,27);
		if(updateLinkAfter.length == 11){
				console.log(updateLinkAfter);
				sendVid(updateLinkAfter);
			}
			else{
				alert("empty2 link");
			}
	}
	else if(updateLinkBefore.indexOf("https://www.youtube.com/watch?v=") >= 0){
		var updateLinkAfter = updateLinkBefore.slice(32,43);
		if(updateLinkAfter.length == 11){
				console.log(updateLinkAfter);
				sendVid(updateLinkAfter);
			}
			else{
				alert("empty3 link");
			}
	}
	else if(updateLinkBefore.indexOf("http://www.youtube.com/watch?v=") >= 0){
		var updateLinkAfter = updateLinkBefore.slice(31,42);
		if(updateLinkAfter.length == 11){
				console.log(updateLinkAfter);
				sendVid(updateLinkAfter);
			}
			else{
				alert("empty 4link");
			}
	}
	else{
		alert("INVALID LINK!!")
	}
	
}

function updateCover(){
	/* Write the code to make this work. updatedCover is the string parameter with the new cover letter text*/
	var ls = localStorage.getItem("userID");
	var updatedCover = $("#txtCoverLetter").val();
	$.getJSON( "php/php_queries.php", { action:"updateCover", userID: ls, coverLetter: updatedCover } );
	
}

function updateEducation(){
	/* Write the code to make this work.*/
	var eduId = localStorage.getItem("eduId");
	$.getJSON( "php/php_queries.php", { action:"updateEducation", eduID: eduId, school: $('#txtSchoolName').val(), degree: $('#txtDegree').val(), startDateMonth: $('#txtEdStartMonth').val(), startDateYear: $('#txtEdStartYear').val(),endDateMonth: $('#txtEdEndMonth').val(), endDateYear: $('#txtEdEndYear').val(), GPA: $('#txtGPA').val()  } )
	.done(function(json){
		
		});
	
}

function addSingleSchool()
{
	var ls = localStorage.getItem("userID");
	//ls = 113;
	$.getJSON( "php/php_queries.php", { action:"addEducation", userID: ls, school: $('#txtSchoolName').val(), degree: $('#txtDegree').val(), startMonth: $('#txtStartMonth').val(), startYear: $('#txtStartYear').val(), endMonth: $('#txtEndMonth').val(), endYear: $('#txtEndYear').val(), GPA: $('#txtGPA').val() } );
	
}

function listSchools()
{
	var ls = localStorage.getItem("userID");
	//ls = 113;
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
			str += "<td><input id='btnEditEdu_" + json.Result[i].eduID + "' type='button' value='Edit' onclick='loadEducation(" + json.Result[i].eduID + ")'></td>";
			str += "<td><input id='btnDelEdu_" + json.Result[i].eduID + "' type='button' value='Delete' onclick='delEducation(" + json.Result[i].eduID + ")'></td>";
			
			str += "</tr>";
		
		}
		$('#schoolsDiv').html(str);
}

function delEducation(eduId){
	
	$.getJSON( "php/php_queries.php", { action:"deleteEducation", eduID: eduId})
	.done(function(json){
		
		});
		
	window.location.reload();
}

/*function updateEmployer(){
	var ls = localStorage.getItem("userID");
	$.getJSON( "php/php_queries.php", { action:"addEmployer", userID: ls, employerName: $('#txtEmpName').val(), position: $('#txtPosition').val(), startMonth: $('#txtStartMonth').val(), startYear: $('#txtStartYear').val(), endMonth: $('#txtEndMonth').val(), endYear: $('#txtEndYear').val(), empLink: $('#txtEmpLink').val(), responsibilities: $('#txtResp').val() } );
	
}*/

function addSingleEmployer()
{
	var ls = localStorage.getItem("userID");
	console.log("hello");
	$.getJSON( "php/php_queries.php", { action:"addEmployer", userID: ls, employerName: $('#txtEmpName').val(), position: $('#txtPosition').val(), startMonth: $('#txtStartMonth').val(), startYear: $('#txtStartYear').val(), endMonth: $('#txtEndMonth').val(), endYear: $('#txtEndYear').val(), empLink: $('#txtEmpLink').val(), responsibilities: $('#txtResp').val() } );
	
}

function listEmployers()
{
	//console.log("listEmployers");
	var ls = localStorage.getItem("userID");
	//ls = 113;
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
			str += "<td><input id='btnEditEmp_" + json.Result[i].empID + "' type='button' value='Edit' onclick='loadEmployer(" + json.Result[i].empID + ")'></td>";
			str += "<td><input id='btnDelEmp_" + json.Result[i].empID + "' type='button' value='Delete' onclick='delEmployer(" + json.Result[i].empID + ")'></td>";
			str += "</tr>";
		
		}
		$('#companiesDiv').html(str);
		//console.log("LAST");
}

function delEmployer(empId){
	
	$.getJSON( "php/php_queries.php", { action:"deleteEmployer", empID: empId})
	.done(function(json){
		
		});
		
	window.location.reload();
}

function sendVid(updatedLink){
	var ls = localStorage.getItem("userID");
	//ls = 113;
	$.getJSON( "php/php_queries.php", { action:"updateVideo", userID: ls, videoLink: updatedLink } )
	.done(function(json){
		window.location.reload();
		});
	
}



//Load Cover Letter/////////////////////////////////////////////////////////////////////
function loadCover(){
	var ls = localStorage.getItem("userID");
	//ls = 113;
	$.getJSON( "php/php_queries.php", { action:"fillCover", userID: ls } )
	.done(function(json){
		fillCover(json);
		});
	
	
}
function fillCover(json){
	var coverLett = json.Result[0].coverLetter;
	$("#txtCoverLetter").val(coverLett);
	$("#coverLetterText").append(coverLett);
}

function loadEmp(){
	var ls = localStorage.getItem("userID");
	//ls = 113;
	$.getJSON( "php/php_queries.php", { action:"listEmployer", userID: ls } )
	.done(function(json){
		fillEmp(json);
		});
	
	
}
function fillEmp(json){
	var empInfo = '<h4>Work Experience</h4>';
	for(i=0; i<json.Result.length; i++){
				empInfo += '<a href="' + json.Result[i].empLink + '"><h5>' + json.Result[i].employerName + '</h5></a>' +
				'<p>' + json.Result[i].position + '</p>' +
				'<ul>' +
					'<li>' + json.Result[i].responsibilities + '</li>' +
				'</ul>' +
				'<p>Start date: ' + json.Result[i].startDateMonth + ', ' + json.Result[i].startDateYear + '</p>' +
				'<p>End date: ' + json.Result[i].endDateMonth + ', ' + json.Result[i].endDateYear + '</p>';
		}
	$("#meEmp").append(empInfo);
}

function loadEdu(){
	var ls = localStorage.getItem("userID");
	//ls = 113;
	$.getJSON( "php/php_queries.php", { action:"listEducation", userID: ls } )
	.done(function(json){
		fillEdu(json);
		});
	
	
}
function fillEdu(json){
	var eduInfo = '<h4>Education</h4>';
	for(i=0; i<json.Result.length; i++){
				eduInfo += '<h5>' + json.Result[i].school + '</h5>' +
				'<p>' + json.Result[i].degree + '</p>' +
				'<p>Start date: ' + json.Result[i].startDateMonth + ', ' + json.Result[i].startDateYear + '</p>' +
				'<p>End date: ' + json.Result[i].endDateMonth + ', ' + json.Result[i].endDateYear + '</p>' +
				'<p>GPA: ' + json.Result[i].GPA + '</p>';
		}
	$("#meEdu").append(eduInfo);
}
function loadBasic(){
	var ls = localStorage.getItem("userID");
	//ls = 113;
		$.getJSON( "php/php_queries.php", { action:"fillUser", userID: ls})
	.done(function(json){
		fillBasic(json);
		fillBasic2(json);
		});
	
	
}
function fillBasic2(json){
	var basicInfo = "<h3 id='meName'>" + json.Result[0].firstName + " " + json.Result[0].lastName + "</h3>" +
	"<p>" + json.Result[0].phoneNumber + "</p>" + 
	"<p>" + json.Result[0].email + "</p>" +
	"<p>" + json.Result[0].city + " " + json.Result[0].state +", " + json.Result[0].zip + "</p>";
	$("#meBasic").append(basicInfo);
}
function generateLink()
{
	console.log('hi');
	var linkCode = "";
	var choices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	
	for(i=0;i<6;i++){
		linkCode += choices.charAt(Math.floor(Math.random()*choices.length));
		}	
		checkLink(linkCode);
	
}
function checkLink(linkCode)
{
		$.getJSON( "php/php_queries.php", { action:"checkLink", linkCode: linkCode})
	.done(function(json){
		
			checkLink2(json, linkCode);
		});
}
function checkLink2(json, linkCode)
{
	if(json.Result == true)
	{
		generateLink();
	}
	else
	{
		insertLink(linkCode);
	}
}
function insertLink(linkCode)
{
	var ls = localStorage.getItem("userID");
	var compName = $('#txtCompanyName').val();
		$.getJSON( "php/php_queries.php", { action:"insertLink", userID: ls, linkCode: linkCode, compName: compName})
//change when site changes
		var usableLink = "<input type = 'text' value = 'http://ict.neit.edu/000484346/public_html/capstone/resume.html?"+linkCode+ "'/>";
		$('#newLink').html(usableLink);
		
}

$(document).ready(function(){
	
	$(".editWrap").draggable({ scroll: false, containment: "document" });

	//loadEducation();
	loadCover();
	loadVideo();
	loadBasic();
	loadEmp();
	loadEdu();
	listEmployers();
	listSchools();
	
	
	$(".btnGenerateLink").click(function(){
		generateLink();
			
		
	});
	$("#btnEditVideo").click(function(){
		updateVid();
			setTimeout(function () {
					window.location.reload();
					}, 100);
		
	});
	
	$("#btnEditCover").click(function(){
		updateCover();
			setTimeout(function () {
				window.location.reload();	
					}, 100);
		
	});
	
	$("#btnAddSchool").click(function(){
		updateEducation();
			setTimeout(function () {
					window.location.reload();
					}, 100);
		
	});
	
	$("btnEditEmployer").click(function(){
		updateEmployer();
			setTimeout(function () {
					window.location.reload();
					}, 100);
		
		});
		$("btnGenerate").click(function(){
		generateLink();
			setTimeout(function () {
					fillLink(); 
					}, 100);
		
		});
	$("btnAddEmployer").click(function(){
		addSingleEmployer();
			setTimeout(function () {
				window.location.reload();	
					}, 100);
		
	})
});
