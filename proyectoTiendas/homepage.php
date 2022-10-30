<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/application/x-www-form-urlencoded");


$method = $_SERVER['REQUEST_METHOD'];
    include "coneccion.php";
    $mysqli = conectarDB();
    
    session_start();    
    $mysqli->set_charset('utf8');

    $sql = "SELECT * FROM homepage; ";


    if ($method == 'GET'){
      $result = mysqli_query($mysqli,$sql);
      $resultados = array();
      while($fila = mysqli_fetch_assoc($result)){
          $resultados[] = $fila;
      }
      echo json_encode($resultados);
    }
      

    
    if ($method == "POST") {
      $JSONData = file_get_contents("php://input");
      $dataObject = json_decode($JSONData);
      $title = $dataObject-> title;
      $body = $dataObject-> body;

      $sql_update = "UPDATE homepage SET titulo ='$title', contenido ='$body' where id = '1';";


      $result = mysqli_query($mysqli,$sql_update);
    }
    
      $mysqli->close();
?>