<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");
$data = json_decode(file_get_contents("php://input"));

$method = $_SERVER['REQUEST_METHOD'];
    include "coneccion.php";
    $mysqli = conectarDB();

	/*$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);*/    
    session_start();    
    $mysqli->set_charset('utf8');

    $id = $_POST ['id'];

    $sql = "DELETE FROM `usuarios` WHERE `usuarios`.`id` = '$id' ;";
  
    echo $sql;
    if ($method == 'POST'){
    $result = mysqli_query($mysqli,$sql);
    }
    
      $mysqli->close();
?>