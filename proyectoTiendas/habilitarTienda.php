<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");


$method = $_SERVER['REQUEST_METHOD'];
    include "coneccion.php";
    $mysqli = conectarDB();
    
    session_start();    
    $mysqli->set_charset('utf8');

    $id = $_POST['id'];
    $cambio = $_POST['cambio'];


    $sql = "UPDATE tiendas SET habilitado = '$cambio' WHERE id = '$id';";
  
    if ($method == 'POST'){
      $result = mysqli_query($mysqli,$sql);
      echo json_encode($result);
    }
    
      $mysqli->close();
?>