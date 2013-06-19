<?php

	require_once("../config.php");	
	
		$SearchQuery = "SELECT distinct Byear_month FROM bookRecords order by Byear_month";
		
		mysql_query($SearchQuery);
		$execq = mysql_query($SearchQuery);
		$array_result = array();
		
		while($data = mysql_fetch_array($execq)){
			$array_result[] = $data;
		}		
		$feeds = array( 'results' => $array_result);
		
		echo json_encode($feeds);
?>
