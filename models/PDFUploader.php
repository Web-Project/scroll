<?php

	require_once("../config.php");	
	include('PdfToText.php');
	header('Content-Type: application/json');
	$retValue = null;
	$TmpDir = '../PDF/' . $_POST['title'];
	$allowedExts = array("pdf");

 

	$error = "";
	$retVal = array(
		"success" => "",
		"msg" => ""
	);	
	
	$numOfFiles = count($_FILES["photo-path"]["name"]);
	$numOfEmptyFiles = 0;

	if (is_dir($TmpDir)) {
		$error.= "Folder " . $_POST['title'] . " already exist<br />";
	}
	else {
		for ($index = 0; $index < $numOfFiles; $index++) {
			if ($_FILES["photo-path"]["size"][$index] <= 0) $numOfEmptyFiles++;
		}

		// check if there are no files to be uploaded

		if ($numOfFiles == $numOfEmptyFiles) $error.= "No files selected!";
		else {
		if($numOfEmptyFiles >0) $error.= "Supply All Fields!";
		else{
				mkdir('../PDF/' . $_POST['title'], 0777);
				for ($index = 0; $index < $numOfFiles; $index++) {
					try {	
						$FileUp = explode(".", $_FILES["photo-path"]["name"][$index]);			
						$extension = end($FileUp);
						/*$error .= "Type: " . $_FILES["photo-path"]["type"][$index];
						$error .= "Extension: " . $extension;*/
						if ((($_FILES["photo-path"]["type"][$index] == "application/pdf") || ($_FILES["photo-path"]["type"][$index] == "application/x-pdf")) && in_array($extension, $allowedExts)) {
							if ($_FILES["photo-path"]["error"][$index] > 0) {
								$error.= "Return Code: " . $_FILES["photo-path"]["error"][$index] . " for file " . $_FILES["photo-path"]["name"][$index] . "<br />";
							}
							else {
								if (file_exists($TmpDir . "/" . $_FILES["photo-path"]["name"][$index])) {
									$error.= "File " . $_FILES["photo-path"]["name"][$index] . " already exist<br />";
								}
								else {
									move_uploaded_file($_FILES["photo-path"]["tmp_name"][$index], $TmpDir . "/" . $_FILES["photo-path"]["name"][$index]);
								}
							}
						}
						else {
							if ($_FILES["photo-path"]["size"][$index] > 0) $error.= "Invalid file: " . $_FILES["photo-path"]["name"][$index] . "<br />";
						}
					}
					catch(Exception $err) {
						$error.= $err->getMessage();
					}
				}
			}
		}
	}

	if (!empty($error)) {
		$retVal["success"] = false;
		$retVal["msg"] = $error;
	}
	else {
		$retVal["success"] = true;
		$retVal["msg"] = "File/s uploaded successfully.";
		
		$bTitle = $_POST['title'];	
		$bPub = $_POST['bdate'];
		
		
		$a = new PDF2Text();
		$a->setFilename('../PDF/' .$_POST['title']. '/'.$_FILES["photo-path"]["name"][0].''); 
		$a->decodePDF();
	    $a->output();	
		$c = $a->output();	
		
		$SearchQuery = "INSERT INTO bookrecords(title,Byear_month,abstract) VALUES ('" . $bTitle . "','" . $bPub . "','" .$c." ')";
		mysql_query($SearchQuery);

	}

	echo json_encode($retVal);

?>