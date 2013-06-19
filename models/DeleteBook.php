<?php

	$deleteBook = $_REQUEST['dirName'];
	$retvalue = array();
	
	rrmdir('../PDF/' . $deleteBook . '');	
	
	function rrmdir($dir) {
	   if (is_dir($dir)) {
		 $objects = scandir($dir);
		 foreach ($objects as $object) {
		   if ($object != "." && $object != "..") {
			 if (filetype($dir."/".$object) == "dir") rmdir($dir."/".$object); else unlink($dir."/".$object);
		   }
		 }
		 reset($objects);
		 rmdir($dir);
		 $retvalue = array("success" => true);
	   }
	 }
 
	echo json_encode($retvalue);

?>