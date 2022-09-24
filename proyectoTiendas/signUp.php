<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");
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

    $sql = "INSERT INTO `usuarios`  VALUES ('5', '$firstName', '$lastName', '$correo', '$contrasena', '3');";
    //$sql = "INSERT INTO `usuarios` (`firstName`, `lastName`, `correo`, `contrasena`, `id_tipousuario`) VALUES ('$firstName', '$lastName', '$correo', '$contrasena', '3');";
  
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