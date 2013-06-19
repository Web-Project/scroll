<?php

	require_once("../config.php");	
	
	    $StudID = $_REQUEST['StudID'];	
		
		$SearchQuery = "DELETE FROM studrecords WHERE Stud_ID = ".$StudID."";
		
		mysql_query($SearchQuery);
		
		$retvalue = array();
		
		if(mysql_affected_rows() > 0)		
			$retvalue = array("success" => true);
		else
			$retvalue = array("success" => false);
			
		echo json_encode($retvalue);
?>
