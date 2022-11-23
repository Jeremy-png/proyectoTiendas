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

	  $titulo = $dataObject-> titulo;
    $cuerpo = $dataObject-> cuerpo;
    $link = $dataObject-> link;
    $id = $dataObject-> id;
   

    $sql = "UPDATE `home_box` set `titulo`= '$titulo', `cuerpo` = '$cuerpo' , `link` = '$link' where id = '$id';";
  
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