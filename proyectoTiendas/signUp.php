<?php
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents("php://input"));

$method = $_SERVER['REQUEST_METHOD'];
    include "coneccion.php";
    $mysqli = conectarDB();

	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);    
    session_start();    
    $mysqli->set_charset('utf8');

	$firstName = $dataObject-> firstName;
    $lastName = $dataObject-> lastName;
    $correo = $dataObject-> correo;
    $contrasena = $dataObject-> contrasena;

    $sql = "INSERT INTO `usuarios`  VALUES ('1', '$firstName', '$lastName', '$correo', '$contrasena', '3');";
  
    echo $sql;
    if ($method == 'POST'){
    $result = mysqli_query($mysqli,$sql);
    }
    
   /* if ($method == 'POST') {
        echo json_encode($result);
      } else {
        echo mysqli_affected_rows($sql);
      }*/
      $mysqli->close();
?>