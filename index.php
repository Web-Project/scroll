<?php
 session_start();
 if(isset($_SESSION['user'])){
    echo "<script language='javascript'>window.location = 'desktop.php'</script>";
 }
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>

<!--META-->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Login Form</title>

<!--STYLESHEETS-->
<link href="css/style.css" rel="stylesheet" type="text/css" />

<!--SCRIPTS-->
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js"></script>
<!--Slider-in icons-->
<script type="text/javascript">
$(document).ready(function() {
	$(".username").focus(function() {
		$(".user-icon").css("left","-48px");
	});
	$(".username").blur(function() {
		$(".user-icon").css("left","0px");
	});
	
	$(".password").focus(function() {
		$(".pass-icon").css("left","-48px");
	});
	$(".password").blur(function() {
		$(".pass-icon").css("left","0px");
	});
});
</script>

</head>
<body>

<!--WRAPPER-->
<div id="wrapper">

	<!--SLIDE-IN ICONS-->
    <div class="user-icon"></div>
    <div class="pass-icon"></div>
    <!--END SLIDE-IN ICONS-->

<!--LOGIN FORM-->
<form name="login-form" class="login-form" action="index.php" method="post">
   
	<!--HEADER-->
    <div class="header">
	
    <!--TITLE--><h1>Login</h1><!--END TITLE-->
    <!--DESCRIPTION--><h3><span>UCLM Online Thesis Repository</span></h3><!--END DESCRIPTION-->
    </div>
    <!--END HEADER-->
	
	<!--CONTENT-->
    <div class="content">
	<!--USERNAME--><input name="username" type="text" class="input username" value="Username" onfocus="this.value=''" /><!--END USERNAME-->
    <!--PASSWORD--><input name="password" type="password" class="input password" value="Password" onfocus="this.value=''" /><!--END PASSWORD-->
    </div>
    <!--END CONTENT-->
    
    <!--FOOTER-->
    <div class="footer">
    <!--LOGIN BUTTON--><input type="submit" name="submit" value="Login" class="button"/><!--END LOGIN BUTTON-->
    </div>
	<div id="progress" style="width:298px;border:0px solid #ccc;"></div>
	<div id="message"></div>
	
    <!--END FOOTER-->

</form>
<!--END LOGIN FORM-->

</div>
<!--END WRAPPER-->
<!--GRADIENT--><div class="gradient"></div><!--END GRADIENT-->

</body>
</html>

<?php

	include ("Config.php");
	 // including config.php in our file
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
		$username = $_POST["username"]; //Storing username in $username variable.
		$password = $_POST["password"]; //Storing password in $password variable.
		$match = "Select * from users where username = '" . $_POST['username'] . "'
		and password = '" . $_POST['password'] . "';";
		$qry = mysql_query($match);
		$num_rows = mysql_num_rows($qry);
		

		if ($num_rows <= 0) {
			echo "<script language='javascript'> document.getElementById('message').innerHTML = '<p align=center><font color=red>Account does not exist!</font></p>'; </script>";
		}
		else {
			// Total processes
			$total = 5;
			 
			// Loop through process
			for($i=1; $i<=$total; $i++){
				// Calculate the percentation
				$percent = intval($i/$total * 100)."%";
			 
				// Javascript for updating the progress bar and information
				echo '<script language="javascript">
				document.getElementById("progress").innerHTML="<div style=\"width:'.$percent.';background-image:url(images/pbar-ani.gif);\">&nbsp;</div>";
				</script>';
			 
				// This is for the buffer achieve the minimum size in order to flush data
				echo str_repeat(' ',1024*64);
			 
				// Send output to browser immediately
				flush();
			 
				// Sleep one second so we can see the delay
				time_nanosleep(0,400000000);
			}
			$_SESSION['user'] = $_POST["username"];
			  echo "<script language='javascript'>window.location = 'desktop.php'</script>";
			// It is the page where you want to redirect user after login.
		}
	}

?>
