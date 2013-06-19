<?php

	require_once("../config.php");	
		
		$files = scandir('../PDF/',1);
		$find = 'IN (';
		
	    for($count=0;$count<count($files)-2;$count++){		  
		   $find .= "'".$files[$count]."'";
		   if($count!=count($files)-3)
		     $find .= ",";
		   else
		     $find .= ")";
		}
		
							
		$SearchQuery = "SELECT * FROM bookrecords WHERE title " . $find . " ORDER BY book_ID";
		$deleteQuery = "DELETE FROM bookrecords WHERE title NOT " . $find . "";
		
		mysql_query($deleteQuery);
		$execq = mysql_query($SearchQuery);
		$array_result = array();

		while($data = mysql_fetch_array($execq)){
			$array_result[] = $data;
		}
		
		$blpersonal_list = array( 'results' => $array_result);

		echo json_encode($blpersonal_list);

?>
