<?php

	$database = "druidinc_scroll";
	$server = "localhost";
	$db_user = "druidinc_scroll";
	$db_pass = "scroll2013!!";
	$link = mysql_connect($server, $db_user, $db_pass) or die('Error: cannot connect. ' . mysql_error());
	mysql_select_db($database, $link)or die('Error: cannot select. ' . mysql_error());

?>
