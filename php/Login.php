<?php
	session_start();
	include ("../Config.php");
	 // including config.php in our file

	$username = $_POST["username"]; //Storing username in $username variable.
	$password = $_POST["password"]; //Storing password in $password variable.
	$match = "Select * from Users where username = '" . $_POST['username'] . "'
	and password = '" . $_POST['password'] . "';";
	$qry = mysql_query($match);
	$num_rows = mysql_num_rows($qry);

	if ($num_rows <= 0) {
		echo "<script language= 'javascript'>document.getElementByID('message').append(<p>Hello</p>)</script>";
		exit;
	}
	else {
		$_SESSION['user'] = $_POST["username"];
		header("Location: ../desktop.php");

		// It is the page where you want to redirect user after login.

	}

?>