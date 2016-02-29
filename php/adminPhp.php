<?php
include ('database.php');
if (isset($_GET['action']))
	{
        $action = $_GET['action'];
    } else {
        $action = "getUsers";
    }
	if (isset($_GET['userID'])) {
        $userID = $_GET['userID'];
    }
	if (isset($_GET['email'])) {
        $email = $_GET['email'];
    }
	if (isset($_GET['pw'])) {
        $pw = $_GET['pw'];
    }
	if (isset($_GET['firstName'])) {
        $firstName = $_GET['firstName'];
    }
	if (isset($_GET['lastName'])) {
        $lastName = $_GET['lastName'];
    }
	if (isset($_GET['city'])) {
        $city = $_GET['city'];
    }
	if (isset($_GET['state'])) {
        $state = $_GET['state'];
    }
	if (isset($_GET['zip'])) {
        $zip = $_GET['zip'];
    }
	if (isset($_GET['phoneNumber'])) {
        $phoneNumber = $_GET['phoneNumber'];
    }
	if (isset($_GET['videoLink'])) {
        $videoLink = $_GET['videoLink'];
    }
	if (isset($_GET['info'])) {
        $info = $_GET['info'];
    }
	if (isset($_GET['link'])) {
        $link = $_GET['link'];
    }
	if (isset($_GET['companyName'])) {
        $companyName = $_GET['companyName'];
    }
	if (isset($_GET['employer'])) {
        $employerName = $_GET['employerName'];
    }
	if (isset($_GET['position'])) {
        $position = $_GET['position'];
    }
	if (isset($_GET['startMonth'])) {
        $startMonth = $_GET['startMonth'];
    }
	if (isset($_GET['startYear'])) {
        $startYear = $_GET['startYear'];
    }
	if (isset($_GET['endMonth'])) {
        $endMonth = $_GET['endMonth'];
    }
	if (isset($_GET['endYear'])) {
        $endYear = $_GET['endYear'];
    }
	if (isset($_GET['responsibilities'])) {
        $responsibilities = $_GET['responsibilities'];
    }
	if (isset($_GET['name'])) {
        $name = $_GET['name'];
    }
	if (isset($_GET['school'])) {
        $school = $_GET['school'];
    }
	if (isset($_GET['degree'])) {
        $degree = $_GET['degree'];
    }
	if (isset($_GET['GPA'])) {
        $GPA = $_GET['GPA'];
    }
	if (isset($_GET['edLink'])) {
        $edLink = $_GET['edLink'];
    }
	if (isset($_GET['empLink'])) {
        $empLink = $_GET['empLink'];
    }
if ($action == "listNew")
{
		$query = "SELECT * FROM user WHERE isNew  = '1'";
	
		$statement = $db->prepare ($query);
    $success = $statement->execute();
    $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode(array('Result' => $rows));
}
if ($action == "listReported")
{
		$query = "SELECT * FROM user WHERE isReported  = '1'";
	
		$statement = $db->prepare ($query);
    $success = $statement->execute();
    $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode(array('Result' => $rows));
}
if ($action == "checkAdmin")
{
		$query = "SELECT * FROM user WHERE userID = :userID";
	
	$statement = $db->prepare ($query);	
		$statement->bindValue(":userID", $userID);
		$statement->execute();
		$rows = $statement->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode(array('Result' => $rows));
	
}
?>