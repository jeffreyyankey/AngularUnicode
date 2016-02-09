<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//Setup variables 
$servername = "localhost";
$username = "thepenin_indyemp";
$password = "lRgieoceG69l";
$dbname = "thepenin_indyempire";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) 
{
    die("Connection failed: " . $conn->connect_error);
}

$result = $conn->query("SELECT Ascii, Decicode, Hexcode FROM ArabicSatts");

$output = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($output != "") 
	{
		$output .= ",";
	}
	
    $output .= '{"Ascii":"'  . $rs["Ascii"] . '",';
	$output .= '"Decicode":"'  . $rs["Decicode"] . '",';
	$output .= '"Hexcode":"'  . $rs["Hexcode"] . '",';
	$output .= '"Language":"'  . $rs["Language"] . '"}';
	
	}
	
$output ='{"records":['.$output.']}';
$conn->close();

echo($output);

?>