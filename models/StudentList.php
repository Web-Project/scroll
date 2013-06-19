<?php

	require_once("../config.php");	
		
		$SearchQuery = "SELECT * FROM studrecords ORDER BY Stud_ID";
		
		$execq = mysql_query($SearchQuery);
		$array_result = array();

		while($data = mysql_fetch_array($execq)){
			$array_result[] = $data;
		}
		
		$blpersonal_list = array( 'results' => $array_result);

		echo json_encode($blpersonal_list);

?>
