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

	$nombre = $dataObject-> nombre;
    $longitud = $dataObject-> longitud;
    $latitud = $dataObject-> latitud;
    $descripcion = $dataObject-> descripcion;
    $link = $dataObject-> link;
    $telefono = $dataObject-> telefono;
    $logotipo = $dataObject-> logotipo;
    $id_usuario = $dataObject-> id_usuario;


    $sql = "INSERT INTO `tiendas` (nombre, longitud, latitud, link, telefono, descripcion, foto_logo, habilitado, id_usuario) VALUES ('$nombre', '$longitud', '$latitud', '$link', '$telefono', '$descripcion', '$logotipo','0', '$id_usuario');";
  
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