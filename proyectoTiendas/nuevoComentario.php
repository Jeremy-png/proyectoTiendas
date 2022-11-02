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

	  $body = $dataObject-> body;
    $parentId = $dataObject-> parentId;
    $userId = $dataObject-> userId;
    $tienda = $dataObject-> tienda;
    $idProducto = $dataObject-> producto;    //$fecha = $dataObject-> $createdAt;

    if($parentId==''){
      $sql = "INSERT INTO `comentarios_pendientes` (comentario, id_usuario, id_producto, tienda, fecha) VALUES ('$body', '$userId', '$idProducto', '$tienda', now());";
    }else{
      $sql = "INSERT INTO `comentarios_pendientes` (comentario_padre, comentario, id_usuario, id_producto, tienda, fecha) VALUES ('$parentId', '$body', '$userId', '$idProducto', '$tienda', now());";
    }

   
  
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