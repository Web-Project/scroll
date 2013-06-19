<?php

	require_once("../config.php");	
	
	    $StudID = $_REQUEST['StudID'];	
		$SLast = $_REQUEST['SLName'];
		$SFirst = $_REQUEST['SFName'];
		$SMi = $_REQUEST['SMI'];
		$SLevel = $_REQUEST['SLevel'];	
		
		$SearchQuery = "UPDATE studrecords SET S_Fname = '".$SFirst."' , S_Lname = '".$SLast."', S_MI = '".$SMi."' ,S_Level =".$SLevel."  WHERE Stud_ID = ".$StudID."";
		
		mysql_query($SearchQuery);
		
		$retvalue = array();
		
		if(mysql_affected_rows() > 0)		
			$retvalue = array("success" => true);
		else
			$retvalue = array("success" => false);
			
		echo json_encode($retvalue);
?>
