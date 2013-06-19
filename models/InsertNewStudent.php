<?php

	require_once("../config.php");	
	
	    $StudID = $_REQUEST['StudID'];	
		$SLast = $_REQUEST['SLName'];
		$SFirst = $_REQUEST['SFName'];
		$SMi = $_REQUEST['SMI'];
		$SLevel = $_REQUEST['SLevel'];
		
		$SearchQuery = "INSERT INTO studrecords(Stud_ID,S_Fname,S_Lname,S_MI,S_Level) VALUES (" .$StudID.",'".$SLast."','".$SFirst."','".$SMi."',".$SLevel.") ";
		
		mysql_query($SearchQuery);
		
		$retvalue = array();
		
		if(mysql_affected_rows() > 0)		
			$retvalue = array("success" => true);
		else
			$retvalue = array("success" => false);
			
		echo json_encode($retvalue);
?>
