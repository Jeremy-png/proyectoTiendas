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

	$firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $correo = $_POST ['correo'];
    $contrasena = $_POST ['contrasena'];
    $id_tipousuario = $_POST ['id_tipousuario'];
    $id = $_POST ['id'];

    $sql = "UPDATE `usuarios` SET `firstName` = '$firstName', `lastName` = '$lastName', `correo` = '$correo', `contrasena` = '$contrasena', `id_tipousuario` = '$id_tipousuario' WHERE `usuarios`.`id` = '$id';";
  
    echo $sql;
    if ($method == 'POST'){
    $result = mysqli_query($mysqli,$sql);
    }
    
      $mysqli->close();
?>